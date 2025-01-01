<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class WelcomePackageMail extends Mailable
{
    use Queueable, SerializesModels;

    public $user;
    public $packageType;
    public $discountCode;

    public function __construct($user, $packageType)
    {
        $this->user = $user;
        $this->packageType = $packageType;
        // Only include discount code for gold and platinum packages
        $this->discountCode = in_array($packageType, ['gold', 'platinum']) ? 'FIRSTMEETINGFREE' : null;
    }

    public function build()
    {
        return $this->markdown('emails.welcome-package')
                    ->subject('Welcome to Your ' . ucfirst($this->packageType) . ' Package!');
    }
}