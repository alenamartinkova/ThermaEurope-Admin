<?php

namespace App\Repositories;

use Illuminate\Database\Eloquent\Builder;
use Prettus\Repository\Eloquent\BaseRepository;
use App\Models\Currency;

/**
 * Class CurrencyRepository.
 *
 * @package namespace App\Repositories;
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
