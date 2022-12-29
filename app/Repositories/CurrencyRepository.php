<?php

namespace App\Repositories;

use App\Models\Currency;
use Illuminate\Database\Eloquent\Builder;
use Prettus\Repository\Eloquent\BaseRepository;

/**
 * Class CurrencyRepository.
 */
class CurrencyRepository extends BaseRepository
{
    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model(): string
    {
        return Currency::class;
    }

    /**
     * @return Builder
     */
    public function getCurrencies(): Builder
    {
        return $this->model->Active()->Deleted();
    }
}
