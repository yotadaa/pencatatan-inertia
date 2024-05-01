<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class AppController extends Controller
{
    //
    public function index() {
        return Inertia::render('App', ['isAuth' => true]);
    }

    public function register() {
        return Inertia::render('App', ['isAuth' => false]);
    }

    public function login() {
        return Inertia::render('App', ['isAuth' => false, "mode" => false]);
    }

    public function dashboard() {
        return Inertia::render('App', ['isAuth' => true, "mode" => true]);
    }

    public function items() {
        return Inertia::render('App', ['isAuth' => true, "mode" => true]);
    }

    public function inbound() {
        return Inertia::render('App', ['isAuth' => true, "mode" => true]);
    }
    public function outbound() {
        return Inertia::render('App', ['isAuth' => true, "mode" => true]);
    }

    public function users() {
        return Inertia::render('App', ['isAuth' => true, "mode" => true]);
    }

    public function settings() {
        return Inertia::render('App', ['isAuth' => true, "mode" => true]);
    }
}
