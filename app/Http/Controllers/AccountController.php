<?php

namespace App\Http\Controllers;

use App\Exceptions\NotAuthenticatedException;
use App\Http\Requests\LanguageUpdateRequest;
use App\Services\LanguageService;
use App\Services\UserService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Redirect;

class AccountController extends Controller
{
    /** @var LanguageService */
    private LanguageService $languageService;

    /** @var UserService */
    private UserService $userService;

    /**
     * @param  LanguageService  $languageService
     * @param  UserService  $userService
     */
    public function __construct(
        LanguageService $languageService,
        UserService $userService
    ) {
        $this->languageService = $languageService;
        $this->userService = $userService;
    }

    /**
     * @return Response
     */
    public function preferences(): Response
    {
        $data['languages'] = $this->languageService->getAllLanguages();

        return Inertia::render('Preferences', $data);
    }

    /**
     * @return Response
     */
    public function personalInformation(): Response
    {
        return Inertia::render('PersonalInformation');
    }

    /**
     * @return Response
     */
    public function security(): Response
    {
        return Inertia::render('Security');
    }

    /**
     * @param  LanguageUpdateRequest  $request
     * @return RedirectResponse
     *
     * @throws NotAuthenticatedException
     */
    public function updateAccountLanguage(LanguageUpdateRequest $request): RedirectResponse
    {
        $data = $request->getData();

        $this->userService->updateMyCommunicationLanguage($data['communication_lang']);

        return Redirect::back();
    }
}
