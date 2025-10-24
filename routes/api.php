<?php

use App\Http\Controllers\FilmController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ActorController;

Route::apiResource('actors', ActorController::class);
Route::apiResource('films',FilmController::class);