<?php

use App\Http\Controllers\Auth\ForgottenPasswordController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\ResetPasswordController;
use App\Http\Controllers\LocaleController;
use App\Http\Controllers\ReservationController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::group([], function () {
    // Change system locale
    Route::get('locale/{language}', [LocaleController::class, 'setLanguage'])->name('setLanguage');
});

Route::middleware(['guest'])->group(function () {
    // Routes for login
    Route::get('/login', [LoginController::class, 'showLoginForm'])->name('login');
    Route::post('/login', [LoginController::class, 'login'])->name('login');

    // Forgotten Password
    Route::get('/forgotten-password', [ForgottenPasswordController::class, 'showLinkRequestForm'])->name('password.request');
    Route::get('new-password/{token?}', [ResetPasswordController::class, 'showResetForm'])->name('password.reset');
    Route::post('/forgotten-password', [ForgottenPasswordController::class, 'sendResetLinkEmail'])->name('password.email');
    Route::post('password/reset', [ResetPasswordController::class, 'reset'])->name('password.update');
});

Route::middleware(['auth'])->group(function () {
    Route::get('password-changed', [ResetPasswordController::class, 'passwordChanged'])->name('password.changed');
    Route::get('/logout', [LoginController::class, 'logout'])->name('logout');

    Route::get('/', function () {
        return Inertia::render('Index');
    })->name('home');

    // Reservations
    Route::get('/reservation', [ReservationController::class, 'index'])->name('reservation.index');
});
