<?php

namespace App\Services;

use App\Models\Meeting;
use App\Models\MeetingReview;
use App\Models\UserEarning;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class MeetingService
{
    public function reviewMeeting(Meeting $meeting, $clientId, $status, $complaintText = null)
    {
        if (!$meeting->canBeReviewed()) {
            throw new \Exception('Meeting cannot be reviewed at this time');
        }

        return DB::transaction(function () use ($meeting, $clientId, $status, $complaintText) {
            // Create the review
            $review = MeetingReview::create([
                'meeting_id' => $meeting->id,
                'client_id' => $clientId,
                'status' => $status,
                'complaint_text' => $complaintText,
                'reviewed_at' => now()
            ]);

            if ($status === 'satisfied') {
                $this->processMeetingEarnings($meeting);
            }

            return $review;
        });
    }

    protected function processMeetingEarnings(Meeting $meeting)
    {
        // Calculate earnings
        $matchmakerEarnings = $meeting->amount * 0.30; // 30% for matchmaker
        $clientBonus = $meeting->amount * 0.10; // 10% bonus for other client
        $adminEarnings = $meeting->amount - $matchmakerEarnings - $clientBonus;

        // Update meeting amounts
        $meeting->update([
            'matchmaker_earnings' => $matchmakerEarnings,
            'client_credit' => $clientBonus,
            'admin_earnings' => $adminEarnings
        ]);

        // Create matchmaker earning record
        UserEarning::create([
            'user_id' => $meeting->matchmaker_id,
            'meeting_id' => $meeting->id,
            'amount' => $matchmakerEarnings,
            'type' => 'matchmaker_commission',
            'status' => 'available'
        ]);

        // Create client bonus record - give it to the client who didn't pay
        $payingClientId = $meeting->clients()->where('users.id', '!=', $meeting->scheduled_by)->first()->id;
        $bonusClientId = $meeting->clients()->where('users.id', '=', $meeting->scheduled_by)->first()->id;

        UserEarning::create([
            'user_id' => $bonusClientId,
            'meeting_id' => $meeting->id,
            'amount' => $clientBonus,
            'type' => 'client_bonus',
            'status' => 'available'
        ]);
    }

    public function processExpiredReviews()
    {
        $expiredMeetings = Meeting::where('status', 'completed')
            ->whereDoesntHave('review')
            ->where('start_time', '<=', now()->subHours(24))
            ->get();

        foreach ($expiredMeetings as $meeting) {
            $this->reviewMeeting($meeting, $meeting->scheduled_by, 'satisfied');
        }
    }

    public function refundMeeting(Meeting $meeting)
    {
        return DB::transaction(function () use ($meeting) {
            // Delete any existing earnings
            UserEarning::where('meeting_id', $meeting->id)->delete();

            // Update meeting status
            $meeting->update([
                'status' => 'refunded',
                'matchmaker_earnings' => 0,
                'client_credit' => 0,
                'admin_earnings' => 0
            ]);

            // Update review status if exists
            if ($meeting->review) {
                $meeting->review->update(['status' => 'refunded']);
            }

            return $meeting;
        });
    }
}