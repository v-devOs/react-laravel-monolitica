<?php

namespace App\Http\Controllers;

use App\Models\Actor;
use Illuminate\Http\Request;
use PhpParser\Node\Stmt\TryCatch;

class ActorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $actors = Actor::paginate(20);
        return response()->json($actors);
    }    
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'first_name' => ['required', 'string', 'min:2', 'max:45'],
                'last_name' => ['required', 'string', 'min:2', 'max:45']
            ]);

            $actor = Actor::create($validated);
            
            return response()->json([
                'message' => 'Actor creado exitosamente',
                'data' => $actor
            ], 201);
            
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'message' => 'Error de validación',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al crear el actor',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function getById($actorId)
    {
        $actor = Actor::find($actorId);

        if($actor)
            return response()->json([
                'ok'=> true,
                'data' => $actor
        ], 200);

        return response()->json([
            'ok' => false,
            'message' => 'No se encontro actor' 
        ], 400);
    }   
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Actor $actor)
    {
        $validated = $request->validate([
            'first_name' => ['required', 'string', 'min:2', 'max:45'],
            'last_name' => ['required', 'string', 'min:2', 'max:45']
        ]);

        $actor->update($validated);

        return response()->json($actor);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Actor $actor)
    {
        try {
            $actor->delete();

            return response()->json([
                'ok' => true,
                'message' => 'Actor eliminado correctamente'
            ], 200);
            
        } catch (\Exception $e) {
            return response()->json([
                'ok' => false,
                'message' => 'Error al eliminar el actor',
                'error' => $e->getMessage()  // ✅ Incluye el error real
            ], 500);  // ✅ Código correcto para error del servidor
        }
    }
}
