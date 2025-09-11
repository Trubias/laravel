<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApiController;

Route::post('/register', [ApiController::class, 'register']);
Route::get('/profiles', [ApiController::class, 'profiles']);