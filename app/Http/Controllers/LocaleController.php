<?php

namespace App\Http\Controllers;

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
        $locales = LocaleService::getActiveLocaleNames();
        if (! array_key_exists($langCode, $locales)) {
            throw new UnexpectedValueException('Given value is not valid code of active locale.');
        }

        Session()->put(LocaleService::SESSION_LOCALE_KEY, $langCode);
    }
}
