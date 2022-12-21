<?php

namespace App\Repositories;

use App\Models\Language;
use Illuminate\Database\Eloquent\Builder;
use Prettus\Repository\Eloquent\BaseRepository;

/**
 * Class CurrencyRepository.
 */
class LanguageRepository extends BaseRepository
{
    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model(): string
    {
        return Language::class;
    }

    /**
     * @return Builder
     */
    public function getLanguages(): Builder
    {
        return $this->model->Active()->Deleted();
    }

    /**
     * @param  string  $code
     * @return Builder
     */
    public function getLanguageByCode(string $code): Builder
    {
        return $this->getLanguages()->where('code', $code);
    }
}
