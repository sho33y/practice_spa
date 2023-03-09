<?php

namespace App\Traits;

use App\Models\Member;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Crypt;

trait UserCrypt
{
    /**
     * @param string $id
     * @return string
     */
    public function encryptId(string $id): string
    {
        return Crypt::encryptString($id);
    }

    /**
     * @param string $id
     * @return string
     */
    public function decryptId(string $id): string
    {
        return Crypt::decryptString($id);
    }

    /**
     * @param string $id
     * @return Model|User
     */
    public function getByEncryptedId(string $id): Model|User
    {
        $user = User::query()
            ->where('id', $this->decryptId($id))
            ->firstOrFail();

        return $user->castByType();
    }
}
