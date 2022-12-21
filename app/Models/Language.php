<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Language
 *
 * @property int $id
 * @property string $name
 * @property string $code
 * @property string $original_name
 * @property string $icon
 * @property int $is_deleted
 * @property int $is_active
 * @property int $is_default
 * @property string $code_with_hyphen
 */
class Language extends Model
{
    // table name
    protected $table = 'languages';

    public function scopeDeleted($query)
    {
        return $query->where('is_deleted', 0);
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', 0);
    }
}
