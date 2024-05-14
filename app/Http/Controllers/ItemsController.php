<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class ItemsController extends Controller
{
    //
    public function OutboundsGet(Request $request, $range) {
        if (!auth()->check()) {
            return response()->json([
                "success" => false,
                "message" =>"Belum Login",
            ]);
        }

        $query = DB::table('transactions')
        ->select('transactions.*', 'items.nama', 'items.stok', "items.kategori")
        ->join('items', 'transactions.id_brg', '=', 'items.id')
        ->where('transactions.email', auth()->user()->email);


        if ($range !== "all") {
            $query->take(intval($range));
        }

        $result = $query->get();

        return response()->json([
            "success"=>true,
            "value" => $result,
        ]);
    }

    public function InboundsGet(Request $request, $range) {
        if (!auth()->check()) {
            return response()->json([
                "success" => false,
                "message" =>"Belum Login",
            ]);
        }
        $query = DB::table('belanja')
            ->select('belanja.*', 'items.nama', 'items.stok', 'items.kategori')
            ->join('items', 'belanja.kode', '=', 'items.id')
            ->where('belanja.email', auth()->user()->email);

        if ($range !== "all") {
            $query->take(intval($range));
        }

        $result = $query->get();

        return response()->json([
            "success"=>true,
            "value" => $result,
        ]);
    }

    public function itemsGet(Request $request, $page, $entry, $category, $sort, $by, $query) {
        if (!auth()->check()) {
            return   response()->json([
                "success" => false,
                "value" => null,
                "message" => "Please login first!",
            ]);
        }

        $page = (isset($page) ? $page : 0);
        $entry =(isset($entry) ? $entry : 10);
        $category = (isset($category) ? $category : "null");
        $sort = (isset($sort) ? $sort : 9);
        $by = (isset($by) ? $by : "asc");
        $query = (isset($query) ? $query : "asc");
        $message = "Tidak null";

        $offset = (intval($page) - 1) * intval($entry);
        $column = Schema::getColumnListing("items");
        $orderBy=  $column[intval($sort)];

        $items = DB::table('items')->where("email", auth()->user()->email);

        if ($query != "*") {
            $items = $items
                    ->where('nama', 'like', '%' . $query . '%')
                    ->orWhere('desk', 'like', '%' . $query . '%');
        }

        if ($category != "null") {
            $items = $items->where("kategori", intval($category));
        }

        $total = $items->count();

        if ($entry != "all") $items = $items->skip($offset)->take($entry);

        $items = $items->orderBy($orderBy, $by)->get();

        return response()->json([
            "success" => true,
            "value" => $items,
            "category" => DB::table('kategori')->where("email", auth()->user()->email)->get(),
            "entry" => $entry,
            "page" => $page,
            "message" => $message,
            "column" => $column,
            "total" => $total
        ]);
    }


}
