<?php

use App\Http\Controllers\TodoController;
use Illuminate\Support\Facades\Route;

Route::get('/test', function () {
    return response()->json(['message' => 'API is working!']);
});
Route::get('/todos', [TodoController::class, 'index']);
Route::post('/todos/store', [TodoController::class, 'store']);
Route::put('/todos/update/{id}', [TodoController::class, 'update']);
Route::delete('/todos/delete/{id}', [TodoController::class, 'destroy']);