<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Sparepart;
use App\Models\Tipe;
use Illuminate\Support\Str;

class SparepartSeeder extends Seeder
{
  public function run(): void
  {
    $spareparts = [
      ['nama' => 'Kampas Rem', 'kode' => '51603', 'harga' => 75000, 'satuan' => 'Pc'],
      ['nama' => 'Filter Oli', 'kode' => '15400', 'harga' => 50000, 'satuan' => 'Pc'],
      ['nama' => 'Busi', 'kode' => '98079', 'harga' => 45000, 'satuan' => 'Pc'],
      ['nama' => 'Oli Mesin', 'kode' => '08798', 'harga' => 120000, 'satuan' => 'Set'],
      ['nama' => 'Lampu Depan', 'kode' => '35120', 'harga' => 300000, 'satuan' => 'Set'],
      ['nama' => 'Radiator', 'kode' => '17700', 'harga' => 850000, 'satuan' => 'Set'],
      ['nama' => 'Karet Wiper', 'kode' => '76620', 'harga' => 100000, 'satuan' => 'Set'],
      ['nama' => 'Knalpot', 'kode' => '18307', 'harga' => 600000, 'satuan' => 'Set'],
      ['nama' => 'Kampas Kopling', 'kode' => '30100', 'harga' => 200000, 'satuan' => 'Set'],
      ['nama' => 'Fan Belt', 'kode' => '38920', 'harga' => 95000,  'satuan' => 'Pc'],
    ];

    $tipeList = Tipe::all()->values();

    foreach ($tipeList as $tipeIndex => $tipe) {
      $modelCode = strtoupper(Str::slug($tipe->nama, ''));
      $modelCode = substr($modelCode, 0, 3);

      foreach ($spareparts as $partIndex => $part) {
        $kode = "{$part['kode']}-{$modelCode}-" . str_pad($partIndex + 1, 3, '0', STR_PAD_LEFT);
        $harga = $part['harga'] + ($tipeIndex * 5000); // harga unik per tipe

        Sparepart::create([
          'kode' => $kode,
          'nama' => $part['nama'],
          'harga' => $harga,
          'satuan' => $part['satuan'],
          'tipe_id' => $tipe->id,
        ]);
      }
    }
  }
}
