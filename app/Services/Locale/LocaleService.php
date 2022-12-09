<?php

namespace App\Services\Locale;

use App\Http\Middleware\Dto\LocaleDto;
use Illuminate\Support\Collection;

class LocaleService
{
    const SESSION_LOCALE_KEY = 'locale';

    /**
     * @var Collection<string, LocaleDto>
     */
    private Collection $activeLocales;

    public function __construct()
    {
        $this->activeLocales = collect([
            'en' => new LocaleDto('locale.english', '/images/layout/uk-flag.svg'),
            'cs' => new LocaleDto('locale.czech', '/images/layout/cz-flag.svg'),
        ]);
    }

    /**
     * @return Collection<string, LocaleDto>
     */
    public function getActiveLocales(): Collection
    {
        return $this->activeLocales;
    }

    /**
     * @param  string  $locale
     * @return bool
     */
    public function isLocaleValid(string $locale): bool
    {
        return $this->getActiveLocales()->offsetExists($locale);
    }
}
