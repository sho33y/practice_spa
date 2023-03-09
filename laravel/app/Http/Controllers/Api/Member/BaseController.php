<?php

namespace App\Http\Controllers\Api\Member;

use App\Http\Controllers\Api\BaseController as ApiBaseController;
use App\Services\MemberService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BaseController extends ApiBaseController
{
    /**
     * @param Request $request
     * @param string $encrypted_id
     * @param MemberService $member_service
     * @return JsonResponse
     */
    public function getMemberByEncryptedId(Request $request, string $encrypted_id, MemberService $member_service): JsonResponse
    {
        return self::formatResponse(['member' => $member_service->getByEncryptedId($encrypted_id)]);
    }
}
