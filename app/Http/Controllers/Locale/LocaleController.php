<?php

namespace App\Http\Controllers\Locale;

use App\Http\Controllers\Controller;
use App\Services\Locale\LocaleService;
use UnexpectedValueException;

class LocaleController extends Controller
{
    private LocaleService $localeService;

    /**
     * @param  LocaleService  $localeService
     */
    public function __construct(LocaleService $localeService)
    {
        $this->localeService = $localeService;
    }

    /**
     * @param  string  $langCode
     * @return void
     */
    public function setLanguage(string $langCode): void
    {
        if (! $this->localeService->isLocaleValid($langCode)) {
            throw new UnexpectedValueException('Given value is not valid code of active locale.');
        }

        Session()->put(LocaleService::SESSION_LOCALE_KEY, $langCode);
    }
}
