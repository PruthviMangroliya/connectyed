<?php

namespace App\Http\Controllers;

use App\Models\Meeting;
use App\Services\MeetingService;
use App\Services\WithdrawalService;
use Illuminate\Http\Request;

class ClientMeetingController extends Controller
{
    protected $meetingService;
    protected $withdrawalService;

    public function __construct(MeetingService $meetingService, WithdrawalService $withdrawalService)
    {
        $this->meetingService = $meetingService;
        $this->withdrawalService = $withdrawalService;
    }

    public function index()
    {
        $meetings = Meeting::with(['matchmaker', 'review'])
            ->whereHas('clients', function ($query) {
                $query->where('users.id', auth()->id());
            })
            ->orderBy('start_time', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $meetings
        ]);
    }

    public function reviewMeeting(Request $request, Meeting $meeting)
    {
        $request->validate([
            'status' => 'required|in:satisfied,complained',
            'complaint_text' => 'required_if:status,complained'
        ]);

        try {
            $review = $this->meetingService->reviewMeeting(
                $meeting,
                auth()->id(),
                $request->status,
                $request->complaint_text
            );

            return response()->json([
                'success' => true,
                'data' => $review
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 400);
        }
    }

    public function getEarnings()
    {
        $availableBalance = $this->withdrawalService->getAvailableBalance(auth()->user());
        $earningsHistory = $this->withdrawalService->getUserEarningsHistory(auth()->user());

        return response()->json([
            'success' => true,
            'data' => [
                'availableBalance' => $availableBalance,
                'earningsHistory' => $earningsHistory
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