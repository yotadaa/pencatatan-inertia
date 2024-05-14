<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
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

    public function register(Request $request) {
        $creds = $request->input("credential");
        $existingUser = User::where('email', $creds["email"])->first();
        if ($existingUser) {
            return response()->json(['success' => false, 'message' => 'Email sudah terdaftar!']);
        }

        $data = [
            'name' => $creds["name"],
            'email' => $creds["email"],
            'password' => Hash::make($creds["password"]),
            'foto_profile' => '/assets/img/users/user_default.png',
            'role' => 'super',
            'root' => $creds["email"]
        ];

        $user = User::create($data);

        if ($user) {
            // $this->login($request);
            return response()->json(['success' => true]);
        }
        else return response()->json(['success' => false, 'message' => 'Gagal membuat akun']);
    }

    public function logout() {
        Auth::logout();
        return redirect()->route('login-redirect',['url' => 'null']);
    }
}
