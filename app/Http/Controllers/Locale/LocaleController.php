<?php

namespace App\Http\Controllers\Locale;

use App\Http\Controllers\Controller;
use App\Services\Locale\LocaleService;
use UnexpectedValueException;

class LocaleController extends Controller
{
    /**
     * @param  string  $langCode
     * @return void
     */
    public function setLanguage(string $langCode): void
    {
        if (! LocaleService::isLocaleValid($langCode)) {
            throw new UnexpectedValueException('Given value is not valid code of active locale.');
        }

        Session()->put(LocaleService::SESSION_LOCALE_KEY, $langCode);
    }
}