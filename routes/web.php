<?php

use App\Http\Controllers\ProfileController;

Route::get('/profiles', [ProfileController::class, 'index']);