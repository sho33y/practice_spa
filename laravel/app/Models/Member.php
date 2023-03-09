<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Builder;

class Member extends User
{
    protected $table = 'users';

    protected static function boot()
    {
        parent::boot();
        static::addGlobalScope('member', function (Builder $builder) {
            $builder->where('type', 'member');
        });
    }
}
