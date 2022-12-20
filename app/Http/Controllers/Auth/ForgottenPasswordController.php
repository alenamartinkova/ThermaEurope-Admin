<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\SendsPasswordResetEmails;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ForgottenPasswordController extends Controller
{
    use SendsPasswordResetEmails;

    /**
     * @param  Request  $request
     * @return Response
     */
    public function showLinkRequestForm(Request $request): Response
    {
        /** @var bool $sent */
        $sent = $request->session()->get('sent', false);

        return Inertia::render('ForgottenPassword', ['sent' => $sent]);
    }

    /**
     * @param  Request  $request
     * @param  string  $response
     * @return JsonResponse|RedirectResponse
     */
    protected function sendResetLinkResponse(Request $request, string $response): JsonResponse|RedirectResponse
    {
        $email = '';

        if (is_string($request->get('email'))) {
            $email = $request->get('email');
        }

        return $request->wantsJson()
            ? new JsonResponse(['message' => trans($response)], 200)
            : back()->with('message', trans($response, ['email' => $email]));
    }
}