@component('mail::message')
# Welcome to Your {{ ucfirst($packageType) }} Package!

Dear {{ $user->name }},

Thank you for choosing our {{ ucfirst($packageType) }} Package! We're excited to have you join us.

@if($discountCode)
## Your Free First Meeting Code

As a {{ ucfirst($packageType) }} package member, you get your first meeting completely FREE! 
Use this code when scheduling your first meeting:

@component('mail::panel')
## {{ $discountCode }}
@endcomponent

Simply enter this code when scheduling your meeting to get it for free.
@endif

## Your Package Benefits:
@if($packageType === 'platinum')
* Access to Premium 1-on-1 Dates
* Up to 9 matching criteria
* Premium Matchmaker Services
* One FREE meeting (use code above)
@elseif($packageType === 'gold')
* Access to Curated 1-on-1 Dates
* Up to 6 matching criteria
* Premium Matchmaker Services
* One FREE meeting (use code above)
@else
* Access to 1-on-1 Blind Dates
* Up to 4 matching criteria
* Basic Matchmaker Services
@endif

Ready to get started? Here's what to do next:

1. Complete your profile
2. Set your matching criteria
@if($discountCode)
3. Schedule your FREE first meeting using your discount code
@else
3. Schedule your first meeting
@endif

If you have any questions, our support team is here to help!

Best regards,
{{ config('app.name') }} Team
@endcomponent