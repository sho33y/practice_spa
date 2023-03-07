<?php
namespace App\Services;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Crypt;

class UserService
{
    /**
     * @param User $user
     * @return string
     */
    public function encryptId(User $user): string
    {
        return Crypt::encryptString($user->id);
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
        return User::query()
            ->where('id', $this->decryptId($id))
            ->firstOrFail();
    }
}
