<?php
// app/Http/Controllers/Auth/ResetPasswordController.php
namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class ResetPasswordController extends Controller
{
    public function reset(Request $request)
    {
        Log::info('Password reset attempt received', [
            'email' => $request->email,
            'token_length' => strlen($request->token)
        ]);

        try {
            $request->validate([
                'token' => 'required',
                'email' => 'required|email',
                'password' => 'required|min:8|confirmed',
            ]);

            $status = Password::reset(
                $request->only('email', 'password', 'password_confirmation', 'token'),
                function ($user, $password) {
                    Log::info('Resetting password for user', ['user_id' => $user->id]);
                    $user->forceFill([
                        'password' => Hash::make($password),
                        'remember_token' => Str::random(60),
                    ])->save();
                }
            );

            Log::info('Password reset completed with status', ['status' => $status]);

            return $status === Password::PASSWORD_RESET
                ? response()->json(['message' => 'Password reset successfully'])
                : response()->json(['error' => trans($status)], 400);
        } catch (\Exception $e) {
            Log::error('Password reset failed', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            return response()->json(['error' => 'Failed to reset password'], 500);
        }
    }
}