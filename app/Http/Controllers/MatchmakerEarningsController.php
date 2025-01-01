<?php

namespace App\Http\Controllers;

use App\Services\WithdrawalService;
use Illuminate\Http\Request;
use App\Models\UserEarning;

class MatchmakerEarningsController extends Controller
{
    protected $withdrawalService;

    public function __construct(WithdrawalService $withdrawalService)
    {
        $this->withdrawalService = $withdrawalService;
    }

    public function getEarnings()
    {
        $user = auth()->user();
        
        $availableBalance = $this->withdrawalService->getAvailableBalance($user);
        
        $totalEarned = UserEarning::where('user_id', $user->id)
            ->where('type', 'matchmaker_commission')
            ->sum('amount');
            
        $pendingEarnings = UserEarning::where('user_id', $user->id)
            ->where('type', 'matchmaker_commission')
            ->where('status', 'pending')
            ->sum('amount');

        $recentEarnings = UserEarning::with(['meeting'])
            ->where('user_id', $user->id)
            ->where('type', 'matchmaker_commission')
            ->orderBy('created_at', 'desc')
            ->limit(10)
            ->get();

        return response()->json([
            'success' => true,
            'data' => [
                'availableBalance' => $availableBalance,
                'totalEarned' => $totalEarned,
                'pendingEarnings' => $pendingEarnings,
                'recentEarnings' => $recentEarnings
            ]
        ]);
    }

    public function requestWithdrawal(Request $request)
    {
        $request->validate([
            'amount' => 'required|numeric|min:1',
            'payment_email' => 'required|email'
        ]);

        try {
            $withdrawal = $this->withdrawalService->createWithdrawalRequest(
                auth()->user(),
                $request->amount,
                $request->payment_email
            );

            return response()->json([
                'success' => true,
                'data' => $withdrawal
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 400);
        }
    }
}