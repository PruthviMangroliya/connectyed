<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MeetingReview extends Model
{
    use HasFactory;

    protected $fillable = [
        'meeting_id',
        'client_id',
        'status',
        'complaint_text',
        'reviewed_at'
    ];

    protected $casts = [
        'reviewed_at' => 'datetime'
    ];

    public function meeting()
    {
        return $this->belongsTo(Meeting::class);
    }

    public function client()
    {
        return $this->belongsTo(User::class, 'client_id');
    }
}