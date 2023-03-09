<?php

namespace App\Http\Controllers\Api\Member\Auth;

use App\Http\Controllers\Api\Member\BaseController;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class RegisterController extends BaseController
{
    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function __invoke(Request $request): JsonResponse
    {
        $data = $request->all();
        $data['password'] = Hash::make($data['password']);
        $data['type'] = 'member';
        return self::formatResponse(['user' => User::create($data)]);
    }
}
