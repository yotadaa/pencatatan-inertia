<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class AppController extends Controller
{
    //

    public function __construct() {
        if (auth()->check()){
            $this->kategori = DB::table('kategori')->where("email", auth()->user()->email)->get();
            $this->items = DB::table('items')->where("email", auth()->user()->email)->get();

        }
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
        $props = [
            "kategori" => DB::table('kategori')->where("email", auth()->user()->email)->get(),
            "items"=> DB::table('items')->where("email", auth()->user()->email)->get(),
            "menu"=> 0,
        ];
        return Inertia::render('App', [
            'isAuth' => auth()->check(),
            "mode" => true,
            "props" => $props,
        ]);
    }

    public function items() {
        if (!auth()->check()) {
            return Redirect::route('login');
        }
        $props = [
            "menu" => 1,
            "kategori" => $this->kategori,
            "items"=> $this->items,
        ];
        return Inertia::render('App', [
            'isAuth' => auth()->check(),
            "mode" => true,
            "props" => $props,
        ]);
    }

    public function inbound() {
        if (!auth()->check()) {
            return Redirect::route('login');
        }
        $props = [
            "menu" => 2,
        ];
        return Inertia::render('App', [
            'isAuth' => auth()->check(),
            "mode" => true,
            "props" => $props,
        ]);
    }
    public function outbound() {
        if (!auth()->check()) {
            return Redirect::route('login');
        }
        $props = [
            "menu" => 3,
        ];
        return Inertia::render('App', [
            'isAuth' => auth()->check(),
            "mode" => true,
            "props" => $props,
        ]);
    }

    public function users() {
        if (!auth()->check()) {
            return Redirect::route('login');
        }
        $props = [
            "menu" => 4,
        ];
        return Inertia::render('App', [
            'isAuth' => auth()->check(),
            "mode" => true,
            "props" => $props,
        ]);
    }

    public function settings() {
        if (!auth()->check()) {
            return Redirect::route('login');
        }
        $props = [
            "menu" => 5,
        ];
        return Inertia::render('App', [
            'isAuth' => auth()->check(),
            "mode" => true,
            "props" => $props,
        ]);
    }
}
