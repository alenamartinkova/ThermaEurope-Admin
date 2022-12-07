<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class LoginController extends Controller
{
    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected string $redirectTo;

    public function __construct()
    {
        $this->middleware('guest')->except('logout');
        $this->redirectTo = route('home');
    }

    /**
     * @return Response
     */
    public function showLoginForm(): Response
    {
        return Inertia::render('Login');
    }

    /**
     * @param  Request  $request
     * @return void
     */
    protected function validateLogin(Request $request): void
    {
        $request->validate([
            $this->username() => 'required|email|string',
            'password' => 'required|string',
        ]);
    }
}
