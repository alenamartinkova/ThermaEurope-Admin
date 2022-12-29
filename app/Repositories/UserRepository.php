<?php

namespace App\Repositories;

use App\Models\User;
use Prettus\Repository\Eloquent\BaseRepository;

/**
 * Class UserRepository.
 */
class UserRepository extends BaseRepository
{
    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model(): string
    {
        return User::class;
    }
}
