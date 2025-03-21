<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use App\Models\User;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $todos = Todo::all();
        // dd($todos);
        return response()->json($todos);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // dd($request->all());
        $request->validate(['title' => 'required|string|max:255']);
        $todo = Todo::create(['title' => $request->title]);
        return response()->json($todo);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // dd($request->all(), $id);
        $todo = Todo::findOrFail($id);
        // dd($todo);
        $todo->update($request->all());
        return response()->json($todo);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // dd($id);
        $todo = Todo::findOrFail($id);
        $todo->delete();
        return response()->json(['message' => 'Todo deleted']);
    }
}
