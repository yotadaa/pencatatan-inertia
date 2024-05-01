<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Items;

class ItemsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Items::factory()->count(30)->create();
        DB::table('items')->insert([
            'foto' => '/assets/img/product-3.jpg',
            'nama' => 'Garuda Pilus',
            'desk' => 'Cemilan pilus dari garuda',
            'kategori' => 0,
            'stok' => 14,
            'harga_awal' => 850,
            'harga_jual' => 1000,
            'email' => 'tes@gmail.com',
            'kode' => '1'
        ]);
        DB::table('items')->insert([
            'foto' => '/assets/img/product-3.jpg',
            'nama' => 'Masako Sapi 8.5g',
            'desk' => 'Bumbu Masakan perisa sapi',
            'kategori' => 3,
            'stok' => 24,
            'harga_awal' => 400,
            'harga_jual' => 500,
            'email' => 'tes@gmail.com',
            'kode' => '2'
        ]);
        DB::table('items')->insert([
            'foto' => '/assets/img/product-3.jpg',
            'nama' => 'Teh Gelas Big',
            'desk' => 'Minuman teh kemasan gelas ukuran besar',
            'kategori' => 1,
            'stok' => 30,
            'harga_awal' => 1650,
            'harga_jual' => 2000,
            'email' => 'tes@gmail.com',
            'kode' => '3'
        ]);
        DB::table('items')->insert([
            'foto' => '/assets/img/product-3.jpg',
            'nama' => 'GG Surya Pro 16',
            'desk' => 'Rokok dari gudang garam dengan kemasan merah',
            'kategori' => 2,
            'stok' => 10,
            'harga_awal' => 29000,
            'harga_jual' => 31000,
            'email' => 'tes@gmail.com',
            'kode' => '4'
        ]);
    }
}
