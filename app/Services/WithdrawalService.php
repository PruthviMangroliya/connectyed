<?php

namespace App\Services;

use App\Models\User;
use App\Models\UserEarning;
use App\Models\WithdrawalRequest;
use Illuminate\Support\Facades\DB;

class WithdrawalService
{
    public function getAvailableBalance(User $user)
    {
        return UserEarning::where('user_id', $user->id)
            ->where('status', 'available')
            ->sum('amount');
    }

    public function createWithdrawalRequest(User $user, $amount, $paymentEmail)
    {
        $availableBalance = $this->getAvailableBalance($user);

        if ($amount > $availableBalance) {
            throw new \Exception('Requested amount exceeds available balance');
        }

        return DB::transaction(function () use ($user, $amount, $paymentEmail) {
            // Create withdrawal request
            $withdrawal = WithdrawalRequest::create([
                'user_id' => $user->id,
                'amount' => $amount,
                'payment_email' => $paymentEmail,
                'status' => 'pending'
            ]);

            // Mark earnings as pending withdrawal
            UserEarning::where('user_id', $user->id)
                ->where('status', 'available')
                ->orderBy('created_at')
                ->limit($amount)
                ->update(['status' => 'pending_withdrawal']);

            return $withdrawal;
        });
    }

    public function approveWithdrawal(WithdrawalRequest $withdrawal)
    {
        return DB::transaction(function () use ($withdrawal) {
            // Update withdrawal request
            $withdrawal->update([
                'status' => 'approved',
                'processed_at' => now()
            ]);

            // Update earnings status
            UserEarning::where('user_id', $withdrawal->user_id)
                ->where('status', 'pending_withdrawal')
                ->limit($withdrawal->amount)
                ->update(['status' => 'withdrawn']);

            return $withdrawal;
        });
    }

    public function rejectWithdrawal(WithdrawalRequest $withdrawal)
    {
        return DB::transaction(function () use ($withdrawal) {
            // Update withdrawal request
            $withdrawal->update([
                'status' => 'rejected',
                'processed_at' => now()
            ]);

            // Return earnings to available status
            UserEarning::where('user_id', $withdrawal->user_id)
                ->where('status', 'pending_withdrawal')
                ->limit($withdrawal->amount)
                ->update(['status' => 'available']);

            return $withdrawal;
        });
    }

    public function getUserEarningsHistory(User $user)
    {
        return UserEarning::with(['meeting'])
            ->where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->get();
    }
}