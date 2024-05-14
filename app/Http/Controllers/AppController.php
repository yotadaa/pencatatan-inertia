<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\URL;
use Inertia\Inertia;

class AppController extends Controller
{
    //

    public function __construct() {


         $this->currentURL = $_SERVER['REQUEST_URI'];

        if (auth()->check()){
            $this->kategori = DB::table('kategori')->where("email", auth()->user()->email)->get();
            $this->items = DB::table('items')->where("email", auth()->user()->email)->get();
        } else {
            $this->kategori = [];
            $this->items = [];
        }

    }

    private function checkRoute($url) {
        $routeExists = false;

        foreach (app('router')->getRoutes() as $route) {
            if ($route->matches(request()->create($url))) {
                $routeExists = true;
                break;
            }
        }

        return $routeExists;
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

    public function login(Request $request)
    {
        if (auth()->check()) {
            return Redirect::route('index');
        }

        $failed = session()->get('loginFailed');
        $message = session()->get('message');

        $url = isset($_GET['redirect']) ? $_GET['redirect'] : "null";
        $urlValid = $this->checkRoute($url);

        session()->put('loginFailed', false);
        session()->put('message', '');

        return Inertia::render('App', [
            'isAuth' => auth()->check(),
            'mode' => false,
            'failed' => $failed,
            'message' => $message,
            "url" => [
                "valid" => $urlValid,
                "url" => $url,
            ]
        ]);
    }
    public function dashboard(Request $request) {
        if (!auth()->check()) {
            return Redirect::route('login-redirect', ["url" => Route::current()->uri()]);
        }
        $props = [
            "kategori" => DB::table('kategori')->where("email", auth()->user()->email)->get(),
            "items"=> DB::table('items')->where("email", auth()->user()->email)->get(),
            "url" => $_SERVER['REQUEST_URI'],
            "menu"=> 0,
            "element"=> 0,
        ];
        return Inertia::render('App', [
            'isAuth' => auth()->check(),
            "mode" => true,
            "props" => $props,
        ]);
    }

    public function items(Request $request) {
        if (!auth()->check()) {
            return Redirect::route('login-redirect', [
                "url" =>  $request->fullUrl(),
            ]);
        }

        $page = $request->input('page');
        $entry = $request->input('entry');
        $category = $request->input('category');
        $sort = $request->input('sort');
        $by = $request->input('by');
        $query = $request->input('query');

        $page = isset($page) ? $page : 0;
        $entry = isset($entry) ? $entry : 10;
        $category = isset($category) ? $category : "null";
        $sort = isset($sort) ? $sort : 9;
        $by = isset($by) ? $by : "asc";
        $query = isset($query) ? $query : "";
        $total = DB::table('items')->where("email", auth()->user()->email)->count();
        $totalItems = $total;

        if ($entry == 'all') {
            $total = 1;
        } else {
            $total = ceil($total / intval($entry));
        }

        $props = [
            "menu"=> 1,
            "element"=> 1,
            "kategori" => $this->kategori,
            "page" => $page,
            "entry" => $entry,
            "category" => $category,
            "sort" => $sort,
            "by" => $by,
            "query" => $query,
            "url" => $_SERVER['REQUEST_URI'],
            "total" => $total,
            "totalItems" => $totalItems,
        ];

        return Inertia::render('App', [
            'isAuth' => auth()->check(),
            "mode" => true,
            "props" => $props,
        ]);
    }

    public function daftarKategori(Request $request) {
        if (!auth()->check()) {
            return Redirect::route('login-redirect', [
                "url" =>  $request->fullUrl(),
            ]);
        }

        $props = [
            "menu"=> 1,
            "element"=> 6,
        ];

        return Inertia::render('App', [
            'isAuth' => auth()->check(),
            "mode" => true,
            "props"=> $props,
        ]);
    }


    public function inbound(Request $request) {
        if (!auth()->check()) {
            return Redirect::route('login-redirect', [
                "url" =>  $request->fullUrl(),
            ]);
        }
        $props = [
            "menu"=> 2,
            "element"=> 2,
            "url" => $_SERVER['REQUEST_URI'],
        ];
        return Inertia::render('App', [
            'isAuth' => auth()->check(),
            "mode" => true,
            "props" => $props,
        ]);
    }
    public function outbound(Request $request) {
        if (!auth()->check()) {
            return Redirect::route('login-redirect', [
                "url" =>  $request->fullUrl(),
            ]);
        }
        $props = [
            "menu"=> 3,
            "element"=> 3,
            "url" => $_SERVER['REQUEST_URI'],
        ];
        return Inertia::render('App', [
            'isAuth' => auth()->check(),
            "mode" => true,
            "props" => $props,
        ]);
    }

    public function users(Request $request) {
        if (!auth()->check()) {
            return Redirect::route('login-redirect', [
                "url" =>  $request->fullUrl(),
            ]);
        }
        $props = [
            "menu"=> 4,
            "element"=> 4,
            "url" => $_SERVER['REQUEST_URI'],
        ];
        return Inertia::render('App', [
            'isAuth' => auth()->check(),
            "mode" => true,
            "props" => $props,
        ]);
    }

    public function settings(Request $request) {
        if (!auth()->check()) {
            return Redirect::route('login-redirect', [
                "url" =>  $request->fullUrl(),
            ]);
        }
        $props = [
            "menu"=> 5,
            "element"=>5,
            "url" => $_SERVER['REQUEST_URI'],
        ];
        return Inertia::render('App', [
            'isAuth' => auth()->check(),
            "mode" => true,
            "props" => $props,
        ]);
    }


}
