<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTodoRequest;
use App\Http\Requests\UpdateTodoRequest;
use App\Http\Resources\TodoResource;
use App\Models\Todo;
use App\Models\User;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class TodoController extends Controller
{
    public function index(): JsonResponse
    {
        try {
            $todos = Todo::all();
            return response()->json([
                'success' => true,
                'data' => TodoResource::collection($todos)
            ], 200);
        } catch (\Exception $e) {
            return $this->errorResponse($e);
        }
    }

    public function store(StoreTodoRequest $request): JsonResponse
    {
        try {
            $todo = Todo::create($request->validated());
            return response()->json([
                'success' => true,
                'data' => new TodoResource($todo)
            ], 201);
        } catch (\Exception $e) {
            return $this->errorResponse($e);
        }
    }

    public function update(UpdateTodoRequest $request, string $id): JsonResponse
    {
        try {
            $todo = Todo::findOrFail($id);
            $validatedData = $request->validated();
            $todo->update($validatedData);

            return response()->json([
                'success' => true,
                'data' => new TodoResource($todo)
            ], 200);
        } catch (ModelNotFoundException $e) {
            return $this->errorResponse($e, 404);
        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return $this->errorResponse($e);
        }
    }


    public function destroy(string $id): JsonResponse
    {
        try {
            $todo = Todo::findOrFail($id);
            $todo->delete();

            return response()->json([
                'success' => true,
                'message' => 'Todo deleted successfully'
            ]);
        } catch (\Exception $e) {
            return $this->errorResponse($e);
        }
    }

    private function errorResponse(\Throwable $e): JsonResponse
    {
        return response()->json([
            'success' => false,
            'message' => $e->getMessage()
        ], 500);
    }
}
