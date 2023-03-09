<?php

namespace App\Http\Controllers\Api\Auth;

use App\Helpers\Utility;
use App\Http\Controllers\Api\Admin\BaseController;
use App\Http\Requests\Auth\LoginRequest;
use App\Services\AdminService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends BaseController
{
    /**
     * @param LoginRequest $request
     * @param AdminService $admin_service
     * @param string $guard
     * @return JsonResponse
     * @throws \Illuminate\Validation\ValidationException
     */
    public function create(LoginRequest $request, AdminService $admin_service, string $guard): JsonResponse
    {
        $request->authenticate();
        $request->session()->regenerate();

        $user = auth($guard)->user();

        return self::formatResponse([
            'encrypted_id' => $admin_service->encryptId($user->id),
            $guard => $user,
        ]);
        // return redirect()->intended(RouteServiceProvider::HOME);
    }

    /**
     * @param Request $request
     * @param string $guard
     * @return JsonResponse
     */
    public function destroy(Request $request, string $guard): JsonResponse
    {
        Auth::guard($guard)->logout();

        if (!Utility::hasActiveGuard()) {
            $request->session()->invalidate();
            $request->session()->regenerateToken();
        }

        return self::formatResponse();
    }
}
