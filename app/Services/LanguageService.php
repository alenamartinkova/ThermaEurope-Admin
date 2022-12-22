<?php

namespace App\Services;

use App\Models\Language;
use App\Repositories\LanguageRepository;
use Illuminate\Database\Eloquent\Collection;

class LanguageService
{
    /** @var LanguageRepository */
    private LanguageRepository $languageRepository;

    /**
     * @param  LanguageRepository  $languageRepository
     */
    public function __construct(
        LanguageRepository $languageRepository
    ) {
        $this->languageRepository = $languageRepository;
    }

    /**
     * @return Collection<int, Language>
     */
    public function getAllLanguages(): Collection
    {
        return $this->languageRepository->getLanguages()->get();
    }
}
