<?php

namespace App\Models;

use App\Notifications\CustomVerifyEmail;
use App\Notifications\ResetPasswordNotification; // Ensure this notification exists
use Illuminate\Contracts\Auth\MustVerifyEmail;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use App\Models\Profile;
use App\Models\Specialties;
use App\Models\Availability;
use App\Models\Meeting;
use App\Models\MatchmakerClient;
use App\Models\Seeking;

class User extends Authenticatable implements JWTSubject, MustVerifyEmail
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'username',
        'email',
        'password',
        'role',
        // Added Google fields
        'google_access_token',
        'google_refresh_token',
        'google_token_expires_at',
        'package_purchased_at',
        'purchased_package',
        'criteria_limit',
        'matchmaker_id', // Added if necessary for matchmaker relationship
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        // Hide sensitive Google tokens
        'google_access_token',
        'google_refresh_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'google_token_expires_at' => 'datetime',
        'package_purchased_at' => 'datetime',
        'privacypolicy' => 'boolean',
        'termsofuse' => 'boolean',
        'ismatchmaker' => 'boolean',
        'criteria_limit' => 'integer',
        'matchmaker_id' => 'integer',
    ];

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key-value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }

    /**
     * Relationship with Profile
     */
    public function profile()
    {
        return $this->hasOne(Profile::class);
    }

    /**
     * Relationship with Seeking
     */
    public function seeking()
    {
        return $this->hasOne(Seeking::class);
    }

    /**
     * Relationship with Specialties
     */
    public function specialties()
    {
        return $this->hasOne(Specialties::class);
    }

    /**
     * Relationship with Availability
     */
    public function availability()
    {
        return $this->hasMany(Availability::class);
    }

    /**
     * User's matchmaker client relationship
     */
    public function matchmakerClient()
    {
        return $this->hasOne(MatchmakerClient::class, 'user_id');
    }

    /**
     * User's matchmaker
     */
    public function matchmaker()
    {
        return $this->belongsTo(User::class, 'matchmaker_id');
    }

    /**
     * Override the default email verification notification.
     */
    public function sendEmailVerificationNotification()
    {
        $this->notify(new CustomVerifyEmail);
    }

    /**
     * Override the default password reset notification.
     *
     * @param  string  $token
     * @return void
     */
public function sendPasswordResetNotification($token)
{
    $url = url(route('password.reset', [
        'token' => $token,
        'email' => $this->email
    ], false));
    
    $this->notify(new ResetPasswordNotification($url));
}
    /**
     * Determine if the user has verified their email.
     *
     * @return bool
     */
    public function hasVerifiedEmail()
    {
        return !is_null($this->email_verified_at);
    }

    /**
     * Mark the user's email as verified.
     *
     * @return bool
     */
    public function markEmailAsVerified()
    {
        if ($this->hasVerifiedEmail()) {
            return false;
        }

        $this->email_verified_at = now();
        return $this->save();
    }

    /**
     * A user can attend many meetings as a client.
     */
    public function meetingsAsClient()
    {
        return $this->belongsToMany(Meeting::class, 'meeting_client', 'client_id', 'meeting_id');
    }

    /**
     * A user (matchmaker) can host many meetings.
     */
    public function hostedMeetings()
    {
        return $this->hasMany(Meeting::class, 'matchmaker_id');
    }
}
