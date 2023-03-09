<?php

namespace App\Helpers;

class Utility
{
    /**
     * @return array
     */
    public static function getGuardNames(): array
    {
        $guards = config('auth.guards');
        unset($guards['sanctum']);

        return array_keys($guards);
    }

    /**
     * マルチ認証のうち1つでもログインしているか判定する
     *
     * @return bool
     */
    public static function hasActiveGuard(): bool
    {
        $has_active_guard = false;

        foreach (self::getGuardNames() as $guard) {
            if (auth($guard)->check()) {
                $has_active_guard = true;
                break;
            }
        }

        return $has_active_guard;
    }
}
