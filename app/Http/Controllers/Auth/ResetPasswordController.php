<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\ResetsPasswords;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ResetPasswordController extends Controller
{
    use ResetsPasswords;

    protected string $redirectTo;

    public function __construct()
    {
        $this->redirectTo = route('password.changed');
    }

    public function showResetForm(Request $request): Response
    {
        $token = '';

        if ($request->route() !== null) {
            $token = $request->route()->parameter('token');
        }

        return Inertia::render('NewPassword', ['token' => $token, 'email' => $request->email]);
    }

    public function passwordChanged(): Response
    {
        return Inertia::render('PasswordChanged');
    }
}
