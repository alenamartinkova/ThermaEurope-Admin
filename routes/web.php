<?php

use App\Http\Controllers\AccountController;
use App\Http\Controllers\Auth\LoginController;
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
    // Routes for login
    Route::get('/login', [LoginController::class, 'showLoginForm'])->name('login');
    Route::post('/login', [LoginController::class, 'login'])->name('login');

    // Route for logout
    Route::get('/logout', [LoginController::class, 'logout'])->name('logout');

    Route::get('locale/{language}', [LocaleController::class, 'setLanguage'])->name('setLanguage');
});

Route::middleware(['auth'])->group(function () {
    Route::get('/', function () {
        return Inertia::render('Index');
    })->name('home');

    // Reservations
    Route::get('/reservation', [ReservationController::class, 'index'])->name('reservation.index');

    // Account - Preferences
    Route::get('/preferences', [AccountController::class, 'preferences'])->name('account.preferences');
});
