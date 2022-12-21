<?php

namespace App\Http\Controllers;

use App\Services\CurrencyService;
use App\Services\LanguageService;
use Inertia\Inertia;
use Inertia\Response;

class AccountController extends Controller
{
    /** @var LanguageService */
    private LanguageService $languageService;

    /**
     * @param LanguageService $languageService
     */
    public function __construct(
        LanguageService $languageService
    ) {
        $this->languageService = $languageService;
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
}
