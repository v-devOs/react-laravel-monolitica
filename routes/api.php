<?php

use App\Http\Controllers\FilmController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ActorController;

// ------------------->Actors paths<---------------------------------------

Route::get('actors/{id}', [ActorController::class,'getById']);
Route::apiResource('actors', ActorController::class);



Route::apiResource('films',FilmController::class);