<?php

use App\Http\Controllers\AppController;
use Illuminate\Support\Facades\Route;


Route::resource('/', AppController::class);
