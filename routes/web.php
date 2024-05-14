<?php

use App\Http\Controllers\AppController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ItemsController;
use Illuminate\Support\Facades\Route;



Route::get('/', [AppController::class, 'dashboard'])->name('index');

Route::get('/register', [AppController::class, 'register'])->name('register');

Route::get('/login', [AppController::class, 'login'])->name('login');
Route::get('/login?redirect={url?}', [AppController::class, 'login'])->name('login-redirect');


Route::get('/dashboard', [AppController::class, 'dashboard'])->name('dashboard');

Route::get('/items', [AppController::class, 'items'])->name('items');
Route::get('items?page={page}&entry={entry}&category={category}&sort={sort}&by={by}&query={query}', [AppController::class, 'items'])->name('items-o');
Route::get('/items/daftar-kategori', [AppController::class, 'daftarKategori'])->name('daftar-kategori');

Route::get('/inbound', [AppController::class, 'inbound'])->name('inbound');

Route::get('/outbound', [AppController::class, 'outbound'])->name('outbound');

Route::get('/users', [AppController::class, 'users'])->name('users');

Route::get('/settings', [AppController::class, 'settings'])->name('settings');


Route::post('auth/login', [AuthController::class, 'login'])->name('login-attempt');
Route::post('auth/register', [AuthController::class, 'register'])->name('register-attempt');
Route::post('auth/logout', [AuthController::class, 'logout'])->name('logout-attempt');
Route::post('auth/attempted-login', [AuthController::class, 'isSucceedLogin'])->name('checkIfSucceedLogin');


Route::post("items/transaction/get-outbounds/{range}", [ItemsController::class, "OutboundsGet"])->name("get-outbounds");
Route::post("items/transaction/get-inbounds/{range}", [ItemsController::class, "InboundsGet"])->name("get-inbounds");
Route::post("items/get/{category}/{entry}/{page}/{sort}/{by}/{query}", [ItemsController::class, "itemsGet"])->name("get-items");
