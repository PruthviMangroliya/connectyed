<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Meeting extends Model
{
    use HasFactory;

    protected $fillable = [
        'matchmaker_id',
        'client_id',
        'google_meet_password',
        'google_meet_id',
        'google_meet_link',
        'meeting_response',
        'start_time',
        'duration',
        'status',
        'scheduled_by',
        'amount',
        'matchmaker_earnings',
        'client_credit',
        'admin_earnings'
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'matchmaker_earnings' => 'decimal:2',
        'client_credit' => 'decimal:2',
        'admin_earnings' => 'decimal:2',
        'start_time' => 'datetime'
    ];

    public function clients()
    {
        return $this->belongsToMany(User::class, 'meeting_client', 'meeting_id', 'client_id');
    }

    public function matchmaker()
    {
        return $this->belongsTo(User::class, 'matchmaker_id');
    }

    public function scheduledBy()
    {
        return $this->belongsTo(User::class, 'scheduled_by');
    }

    public function review()
    {
        return $this->hasOne(MeetingReview::class);
    }

    public function earnings()
    {
        return $this->hasMany(UserEarning::class);
    }

    public function isPendingReview()
    {
        return $this->status === 'completed' && 
               $this->start_time->addHours(24)->isFuture() && 
               !$this->review()->exists();
    }

    public function canBeReviewed()
    {
        return $this->status === 'completed' && 
               $this->start_time->addHours(24)->isFuture();
    }
}