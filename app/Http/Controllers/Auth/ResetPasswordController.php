<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\ResetsPasswords;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;
use Inertia\Response;

class ResetPasswordController extends Controller
{
    use ResetsPasswords;

    const PASSWORD_MIN_LENGTH = 10;

    protected string $redirectTo;

    public function __construct()
    {
        $this->redirectTo = route('password.changed');
    }

    /**
     * @return array<string, array<int, Password|string>|string>
     */
    protected function rules(): array
    {
        return [
            'token' => 'required',
            'email' => 'required|email',
            'password' => [
                'required',
                'confirmed',
                Password::min(self::PASSWORD_MIN_LENGTH)->mixedCase()->letters()->numbers(),
            ],
        ];
    }

    /**
     * @param  Request  $request
     * @return Response
     */
    public function showResetForm(Request $request): Response
    {
        $token = '';

        if ($request->route() !== null) {
            $token = $request->route()->parameter('token');
        }

        return Inertia::render('NewPassword', ['token' => $token, 'email' => $request->email]);
    }

    /**
     * @return Response
     */
    public function passwordChanged(): Response
    {
        return Inertia::render('PasswordChanged');
    }
}
