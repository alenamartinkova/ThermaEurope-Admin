<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Currency
 *
 * @property int $id
 * @property string $name
 * @property string $symbol
 * @property string $code
 * @property float $price
 * @property string $suffix
 * @property string $prefix
 * @property string|null $exchange_rate
 * @property int $admin_default
 * @property int $is_active
 * @property int $is_deleted
 */
class Currency extends Model
{
    // table name
    protected $table = 'currency';

    public function scopeActive($query)
    {
        return $query->where('is_active', 0);
    }

    public function scopeDeleted($query)
    {
        return $query->where('is_deleted', 0);
    }
}
