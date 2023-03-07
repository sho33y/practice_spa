<?php

namespace App\Http\Controllers\Api\Member\Auth;

use App\Http\Controllers\Api\Member\BaseController;
use App\Http\Requests\Member\Auth\LoginRequest;
use App\Services\UserService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends BaseController
{
    /**
     * @param LoginRequest $request
     * @return \Illuminate\Http\JsonResponse
     * @throws \Illuminate\Validation\ValidationException
     */
    public function create(LoginRequest $request, UserService $user_service): JsonResponse
    {
        $request->authenticate();
        $request->session()->regenerate();

        $member = auth()->user();

        return self::formatResponse([
            'encrypted_user_id' => $user_service->encryptId($member),
            'user' => $member,
        ]);
        // return redirect()->intended(RouteServiceProvider::HOME);
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function destroy(Request $request): JsonResponse
    {
        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return self::formatResponse();
    }
}
