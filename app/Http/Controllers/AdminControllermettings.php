<?php

namespace App\Http\Controllers;

use App\Models\Meeting;
use App\Models\MeetingReview;
use App\Models\WithdrawalRequest;
use App\Services\MeetingService;
use App\Services\WithdrawalService;
use Illuminate\Http\Request;

class AdminControllermettings extends Controller
{
    protected $meetingService;
    protected $withdrawalService;

    public function __construct(MeetingService $meetingService, WithdrawalService $withdrawalService)
    {
        $this->meetingService = $meetingService;
        $this->withdrawalService = $withdrawalService;
    }

    public function getWithdrawals()
    {
        $withdrawals = WithdrawalRequest::with(['user'])
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $withdrawals
        ]);
    }

    public function getComplaints()
    {
        $complaints = MeetingReview::with(['meeting.matchmaker', 'client'])
            ->where('status', 'complained')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $complaints
        ]);
    }

    public function approveWithdrawal(WithdrawalRequest $withdrawal)
    {
        try {
            $this->withdrawalService->approveWithdrawal($withdrawal);

            return response()->json([
                'success' => true,
                'message' => 'Withdrawal approved successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 400);
        }
    }

    public function rejectWithdrawal(WithdrawalRequest $withdrawal)
    {
        try {
            $this->withdrawalService->rejectWithdrawal($withdrawal);

            return response()->json([
                'success' => true,
                'message' => 'Withdrawal rejected successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 400);
        }
    }

    public function resolveComplaint(MeetingReview $review)
    {
        $review->update([
            'status' => 'resolved'
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Complaint resolved successfully'
        ]);
    }

    public function refundMeeting(Meeting $meeting)
    {
        try {
            $this->meetingService->refundMeeting($meeting);

            return response()->json([
                'success' => true,
                'message' => 'Meeting refunded successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 400);
        }
    }
}