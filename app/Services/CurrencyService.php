<?php

namespace App\Services;

use App\Models\Currency;
use App\Repositories\CurrencyRepository;
use Illuminate\Database\Eloquent\Collection;

class CurrencyService
{
    /** @var CurrencyRepository */
    private CurrencyRepository $currencyRepository;

    /**
     * @param  CurrencyRepository  $currencyRepository
     */
    public function __construct(CurrencyRepository $currencyRepository)
    {
        $this->currencyRepository = $currencyRepository;
    }

    /**
     * @return Collection<int, Currency>
     */
    public function getAllCurrencies(): Collection
    {
        return $this->currencyRepository->getCurrencies()->get();
    }
}
