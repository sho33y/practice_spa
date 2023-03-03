<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
class BaseController extends Controller
{
    /**
     * 規定の形にレスポンスをフォーマットする
     *
     * @param  array  $data
     * @param  string $message
     * @param  int $status
     *
     * @return JsonResponse
     */
    public static function formatResponse(array $data = [], string $message = 'OK', int $status = 200): JsonResponse
    {
        $data['message'] = $message;

        return response()->json($data, $status);
    }
}
