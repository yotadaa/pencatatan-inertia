<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class AuthController extends Controller
{

    public function isSucceedLogin() {
        return response()->json(["success" => session()->get('loginFailed')]);
    }

    public function login(Request $request) {
        $creds = $request->input('credential');

        if (Auth::attempt($creds)) {
            $request->session()->regenerate();
            return response()->json(["success" => true, "message" => "Percobaan Login berhasil"]);

        } else {
            return response()->json(["success" => false, "message" => "Percobaan Login Gagal", "creds" => $creds]);
        }
    }

    public function logout() {
        Auth::logout();
        return redirect()->route('login');
    }
}
