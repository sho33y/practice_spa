<?php
namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Builder;

class Admin extends User
{
    protected $table = 'users';

    protected static function boot()
    {
        parent::boot();
        static::addGlobalScope('admin', function (Builder $builder) {
            $builder->where('type', 'admin');
        });
    }
}
