<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ItemsController extends Controller
{
    //
    public function OutboundsGet(Request $request) {
        if (!auth()->check()) {
            return response()->json([
                "success" => false,
                "message" =>"Belum Login",
            ]);
        }
        $result =  DB::table('transactions')
        ->select('transactions.*', 'items.nama', 'items.stok', "items.kategori")  // Select specific columns
        ->join('items', 'transactions.id_brg', '=', 'items.id')
        ->where('transactions.email', auth()->user()->email)
        ->get();
        return response()->json([
            "success"=>true,
            "value" => $result,
        ]);
    }

    public function InboundsGet(Request $request) {
        if (!auth()->check()) {
            return response()->json([
                "success" => false,
                "message" =>"Belum Login",
            ]);
        }
        $result =  DB::table('belanja')
        ->select('belanja.*', 'items.nama', 'items.stok', "items.kategori")  // Select specific columns
        ->join('items', 'belanja.kode', '=', 'items.id')
        ->where('belanja.email', auth()->user()->email)
        ->get();
        return response()->json([
            "success"=>true,
            "value" => $result,
        ]);
    }


}
