<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Stripe\StripeClient;

use App\Models\User;
use Illuminate\Support\Facades\DB;

class PaymentController extends Controller
{
    /**
     * Create a Stripe Checkout Session for the authenticated user.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
public function createCheckoutSession(Request $request)
{
    // Validate the incoming request data
    $request->validate([
        'product_type' => 'required|in:matchmaker_intro,silver_package,gold_package,platinum_package',
        'price_id' => 'required|string',
        'discount_code' => 'nullable|string',
    ]);

    // Retrieve the authenticated user
    $client = Auth::user();
    $isFirstPurchase = !$client->package_purchased_at;

    DB::beginTransaction();

    try {
        // Initialize Stripe client
        $stripe = new StripeClient(config('services.stripe.secret'));
        
        // Construct proper success and cancel URLs using the APP_URL
        $successUrl = config('app.url') . '/client/criteria?session_id={CHECKOUT_SESSION_ID}';
        $cancelUrl = config('app.url') . '/client/billing';

        // Prepare session data for Stripe Checkout
        $sessionData = [
            'payment_method_types' => ['card'],
            'line_items' => [[
                'price' => $request->price_id,
                'quantity' => 1,
            ]],
            'mode' => 'payment',
            'success_url' => $successUrl,
            'cancel_url' => $cancelUrl,
            'metadata' => [
                'client_id' => $client->id,
                'product_type' => $request->product_type,
                'is_first_purchase' => $isFirstPurchase
            ],
            'customer_email' => $client->email,
        ];

        // Handle discount code if provided
        if ($request->filled('discount_code')) {
            $couponCode = strtoupper($request->input('discount_code'));
            $couponMap = [
                'FIRSTMEETINGFREE' => 'promo_1Q8qCzFZef913bMWJHPaNRZb',
                'FIRSTSESSION35' => 'promo_1Q8qCHFZef913bMWDElUswlo',
            ];

            if (array_key_exists($couponCode, $couponMap)) {
                $sessionData['discounts'] = [[
                    'promotion_code' => $couponMap[$couponCode],
                ]];
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'Invalid coupon code.',
                ], 400);
            }
        }

        // Create the Stripe Checkout Session
        $session = $stripe->checkout->sessions->create($sessionData);

        $user = User::findOrFail($client->id);

        $package = str_replace('_package', '', $request->product_type);
        $updateData = [
            'purchased_package' => $package,
            'package_purchased_at' => $isFirstPurchase ? now() : $user->package_purchased_at
        ];
        
        $updated = $user->update($updateData);

        if (!$updated) {
            throw new \Exception("Failed to update user package");
        }

        DB::commit();

        // Log the creation of the session
        Log::info('Checkout session created', [
            'session_id' => $session->id,
            'client_id' => $client->id,
            'is_first_purchase' => $isFirstPurchase,
            'success_url' => $successUrl,
            'cancel_url' => $cancelUrl
        ]);

        // Return the Checkout URL to the frontend
        return response()->json([
            'success' => true,
            'checkout_url' => $session->url,
            'is_first_purchase' => $isFirstPurchase
        ]);

    } catch (\Exception $e) {
        DB::rollBack();
  
        // Log any errors that occur during session creation
        Log::error('Checkout session creation failed', [
            'error' => $e->getMessage(),
            'client_id' => $client->id,
            'trace' => $e->getTraceAsString()
        ]);

        // Return an error response to the frontend
        return response()->json([
            'success' => false,
            'message' => 'Error creating checkout session: ' . $e->getMessage(),
        ], 500);
    }
}    

    /**
     * Handle successful payment and inform the frontend accordingly.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  string  $product_type
     * @return \Illuminate\Http\JsonResponse
     */
    public function success(Request $request, $product_type)
    {
        DB::beginTransaction();
        try {
            // Retrieve the authenticated user
            $client = Auth::user();
            $client->refresh();  // Refresh user data from database
            
            $isFirstPurchase = $request->query('is_first_purchase') === '1';
            $redirectPath = $isFirstPurchase ? '/client/criteria' : '/client/billing';

            // Log the successful payment and redirection
            Log::info('Payment success, preparing redirect', [
                'user_id' => $client->id,
                'product_type' => $product_type,
                'is_first_purchase' => $isFirstPurchase,
                'redirect_path' => $redirectPath,
                'has_package' => !!$client->purchased_package
            ]);

            // Update user purchased package
            $user = User::find($client->id);
            $user->purchased_package = $client->purchased_package;
            $user->save();

            DB::commit();

            // Return JSON response with redirect URL and success message
            return response()->json([
                'success' => true,
                'redirect_url' => $redirectPath,
                'message' => 'Payment successful!'
            ]);
        } catch (\Exception $e) {
            // Log the error
            Log::error('Error in payment success handler', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            // Return JSON response with redirect URL and error message
            return response()->json([
                'success' => false,
                'redirect_url' => '/client/billing',
                'message' => 'Error processing payment success.'
            ]);
        }
    }

    /**
     * Handle canceled payment and inform the frontend accordingly.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function cancel()
    {
        // Log the cancellation
        Log::info('Payment was canceled, preparing redirect', [
            'redirect_url' => '/client/billing',
            'message' => 'Payment was canceled.'
        ]);

        // Return JSON response with redirect URL and error message
        return response()->json([
            'success' => false,
            'redirect_url' => '/client/billing',
            'message' => 'Payment was canceled.'
        ]);
    }
}
