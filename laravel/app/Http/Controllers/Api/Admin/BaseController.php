<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Api\BaseController as ApiBaseController;
use App\Services\AdminService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BaseController extends ApiBaseController
{
    /**
     * @param Request $request
     * @param string $encrypted_id
     * @param AdminService $admin_service
     * @return JsonResponse
     */
    public function getAdminByEncryptedId(Request $request, string $encrypted_id, AdminService $admin_service): JsonResponse
    {
        return self::formatResponse(['admin' => $admin_service->getByEncryptedId($encrypted_id)]);
    }
}
