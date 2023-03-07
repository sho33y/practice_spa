<?php

use App\Http\Controllers\Api\Member\Auth\LoginController;
use App\Http\Controllers\Api\Member\Auth\RegisterController;
use App\Http\Controllers\Api\Member\BaseController as MemberBaseController;
use App\Http\Controllers\Api\TaskController;
use App\Services\UserService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('guest')->group(function () {
    Route::post('/member/register', RegisterController::class);
    Route::post('/member/login', [LoginController::class, 'create']);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/member/{encrypted_id}', [MemberBaseController::class, 'getMemberByEncryptedId']);
    Route::post('/member/logout', [LoginController::class, 'destroy']);
});

Route::prefix('tasks')->group(function () {
    Route::get('/', [TaskController::class, 'index'])->name('tasks');
    Route::post('create', [TaskController::class, 'create']);
    Route::get('{id}', [TaskController::class, 'detail']);
    Route::patch('{id}', [TaskController::class, 'edit']);
    Route::delete('{id}', [TaskController::class, 'delete']);
});
