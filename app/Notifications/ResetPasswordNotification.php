<?php
namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\HtmlString;

class ResetPasswordNotification extends Notification
{
    use Queueable;

    protected $token;

    public function __construct($token)
    {
        $this->token = $token;
    }

    public function via($notifiable): array
    {
        return ['mail'];
    }

    public function toMail($notifiable): MailMessage
    {
        $email = $notifiable->getEmailForPasswordReset();

        // Ensure $email is just the raw email (e.g., "phoniex199940@gmail.com")
        // without any extra query parameters. 
        // (This is just a safety measure in case something unexpected happened.)
        $email = strtok($email, '?');

        $baseUrl = rtrim(config('app.url'), '/');

        // If the token inadvertently contains a full URL (which it shouldn't by default), strip it.
        // Normally, Laravel stores just the token (like "2eb52a6a2163..."), not a full URL.
        // This is just to ensure we get a clean token.
        if (strpos($this->token, $baseUrl . '/password/reset/') === 0) {
            $cleanToken = substr($this->token, strlen($baseUrl . '/password/reset/'));
            // Remove any trailing query params if present
            $cleanToken = strtok($cleanToken, '?');
        } else {
            // The token should just be a simple string without URLs
            $cleanToken = strtok($this->token, '?');
        }

        // Construct the proper reset URL
        $resetUrl = $baseUrl . '/password/reset/' . $cleanToken . '?email=' . urlencode($email);

        Log::info('Password reset URL generated:', ['url' => $resetUrl]);

        return (new MailMessage)
            ->subject('Reset Your Password')
            ->greeting('Hello!')
            ->line('You are receiving this email because we received a password reset request for your account.')
            ->line(new HtmlString(
                'Click the button below to reset your password: <br><br>' .
                '<a href="' . $resetUrl . '" ' .
                'style="background-color: #4CAF50; color: white; padding: 10px 20px; ' .
                'text-align: center; text-decoration: none; display: inline-block; ' .
                'border-radius: 4px; margin: 10px 0;">' .
                'Reset Password</a>'
            ))
            ->line('If you did not request a password reset, no further action is required.')
            ->line('This password reset link will expire in ' . config('auth.passwords.users.expire') . ' minutes.')
            ->line(new HtmlString(
                'If you\'re having trouble clicking the "Reset Password" button, ' .
                'copy and paste the URL below into your web browser:<br>' .
                '<span style="color: #3498db;">' . $resetUrl . '</span>'
            ))
            ->salutation('The ' . config('app.name') . ' Team');
    }

    public function toArray($notifiable): array
    {
        return [];
    }
}
