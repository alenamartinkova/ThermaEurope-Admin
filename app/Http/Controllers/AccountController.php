<?php

namespace App\Http\Controllers;

use App\Services\CurrencyService;
use App\Services\LanguageService;
use Inertia\Inertia;
use Inertia\Response;

class AccountController extends Controller
{
    /** @var CurrencyService */
    private CurrencyService $currencyService;

    /** @var LanguageService */
    private LanguageService $languageService;

    /**
     * @param CurrencyService $currencyService
     * @param LanguageService $languageService
     */
    public function __construct(
        CurrencyService $currencyService,
        LanguageService $languageService
    ) {
        $this->currencyService = $currencyService;
        $this->languageService = $languageService;
    }

    /**
     * @return Response
     */
    public function preferences(): Response
    {
        $data['currencies'] = $this->currencyService->getAllCurrencies();
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
