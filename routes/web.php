<?php

use App\Http\Controllers\AppController;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;


Route::get('/', [AppController::class, 'index'])->name('index');

Route::get('/register', [AppController::class, 'register'])->name('register');
Route::get('/login', [AppController::class, 'login'])->name('login');
Route::get('/dashboard', [AppController::class, 'dashboard'])->name('dashboard');
Route::get('/items', [AppController::class, 'items'])->name('items');
Route::get('/inbound', [AppController::class, 'inbound'])->name('inbound');
Route::get('/outbound', [AppController::class, 'outbound'])->name('outbound');
Route::get('/users', [AppController::class, 'users'])->name('users');
Route::get('/settings', [AppController::class, 'settings'])->name('settings');

Route::post('auth/login', [AuthController::class, 'login'])->name('login-attempt');
Route::post('auth/logout', [AuthController::class, 'logout'])->name('logout-attempt');
Route::post('auth/attempted-login', [AuthController::class, 'isSucceedLogin'])->name('checkIfSucceedLogin');
