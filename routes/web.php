<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\GoogleMeetController;
use App\Http\Controllers\Auth\ResetPasswordController;
use App\Http\Controllers\Auth\ForgotPasswordController;

Route::post('password/email', [ForgotPasswordController::class, 'sendResetLinkEmail'])
    ->name('password.email');

Route::get('password/reset/{token}', function () {
    return view('welcome'); // or whatever your main Vue entry point is
})->name('password.reset');

Route::post('password/reset', [ResetPasswordController::class, 'reset'])
    ->name('password.update');
    
// Ensure login route is defined
Route::get('/login', function () {
    return view('welcome'); // Adjust if your Vue app uses a different entry point
})->name('login');

// Google OAuth Routes
Route::middleware(['jwt.cookie', 'auth:api'])->group(function () {
    Route::get('/google/redirect', [GoogleMeetController::class, 'redirectToGoogle'])->name('google.redirect');
    Route::get('/google/callback', [GoogleMeetController::class, 'handleGoogleCallback'])->name('google.callback');
});


Route::middleware([\App\Http\Middleware\JwtCookieMiddleware::class, 'auth:api'])->group(function () {
    Route::get('/google/redirect', [GoogleMeetController::class, 'redirectToGoogle'])->name('google.redirect');
    Route::get('/google/callback', [GoogleMeetController::class, 'handleGoogleCallback'])->name('google.callback');
});



Route::get('{any}', function () {
     return view('welcome'); // Ensure this serves your Vue app's entry point
})->where('any', '.*');

