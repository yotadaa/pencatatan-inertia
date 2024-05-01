<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class AppController extends Controller
{
    //

    public function __construct() {
    }

    private function shouldLogin() {
        return !auth()->check();
    }

    public function index() {
        if (!auth()->check()) {
            return Redirect::route('login');
        }
        return Inertia::render('App', ['isAuth' =>auth()->check()]);
    }

    public function register() {
        if (auth()->check()) {
            return Redirect::route('index');
        }
        return Inertia::render('App', ['isAuth' => auth()->check()]);
    }

    public function login() {

        if (auth()->check()) {
            return Redirect::route('index');
        }

        $failed = session()->get('loginFailed');
        $message = session()->get('message');

        session()->put('loginFailed', false);
        session()->put('message', '');

        return Inertia::render('App', ['isAuth' => auth()->check(), "mode" => false, "failed"=> $failed, "message"=>$message]);
    }

    public function dashboard() {
        if (!auth()->check()) {
            return Redirect::route('login');
        }
        return Inertia::render('App', ['isAuth' =>auth()->check(), "mode" => true]);
    }

    public function items() {
        if (!auth()->check()) {
            return Redirect::route('login');
        }
        return Inertia::render('App', ['isAuth' =>auth()->check(), "mode" => true]);
    }

    public function inbound() {
        if (!auth()->check()) {
            return Redirect::route('login');
        }
        return Inertia::render('App', ['isAuth' =>auth()->check(), "mode" => true]);
    }
    public function outbound() {
        return Inertia::render('App', ['isAuth' =>auth()->check(), "mode" => true]);
    }

    public function users() {
        if (!auth()->check()) {
            return Redirect::route('login');
        }
        return Inertia::render('App', ['isAuth' =>auth()->check(), "mode" => true]);
    }

    public function settings() {
        if (!auth()->check()) {
            return Redirect::route('login');
        }
        return Inertia::render('App', ['isAuth' =>auth()->check(), "mode" => true]);
    }
}
