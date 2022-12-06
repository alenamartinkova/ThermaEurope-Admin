<?php

namespace App\Services\Locale;

class LocaleService
{
    const SESSION_LOCALE_KEY = 'locale';

    /**
     * @var array<string, string>
     */
    private static array $activeLocaleNames = [
        'en' => 'locale.english',
        'cs' => 'locale.czech',
    ];

    /**
     * @return array<string, string>
     */
    public static function getActiveLocaleNames(): array
    {
        return self::$activeLocaleNames;
    }

    /**
     * @param  string  $locale
     * @return bool
     */
    public static function isLocaleValid(string $locale): bool
    {
        return array_key_exists($locale, LocaleService::getActiveLocaleNames());
    }
}
