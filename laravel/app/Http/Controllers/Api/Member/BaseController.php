<?php

namespace App\Http\Controllers\Api\Member;

use App\Http\Controllers\Api\BaseController as ApiBaseController;
use App\Models\User;
use App\Services\UserService;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BaseController extends ApiBaseController
{
    /**
     * @param Request $request
     * @param string $encrypted_id
     * @param UserService $user_service
     * @return JsonResponse
     */
    public function getMemberByEncryptedId(Request $request, string $encrypted_id, UserService $user_service): JsonResponse
    {
        return self::formatResponse(['user' => $user_service->getByEncryptedId($encrypted_id)]);
    }
}
