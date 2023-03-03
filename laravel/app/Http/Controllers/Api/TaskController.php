<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Task;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\JsonResponse;

class TaskController extends BaseController
{
    /**
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        return self::formatResponse(['tasks' => Task::all()]);
    }

    /**
     * @param int $id
     * @return JsonResponse
     */
    public function detail(int $id): JsonResponse
    {
        return self::formatResponse(['task' => Task::query()->findOrFail($id)]);
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function create(Request $request): JsonResponse
    {
//        return self::formatResponse(['task' => Task::create($request->all())]);
        return self::formatResponse();
    }

    /**
     * @param Request $request
     * @param int $id
     * @return JsonResponse
     */
    public function edit(Request $request, int $id): JsonResponse
    {
        $task = Task::query()->findOrFail($id);
        return self::formatResponse(['task' => $task->update($request->all())]);
    }

    /**
     * @param int $id
     * @return JsonResponse
     */
    public function delete(int $id): JsonResponse
    {
        Task::query()->findOrFail($id)->delete();
        return self::formatResponse();
    }
}
