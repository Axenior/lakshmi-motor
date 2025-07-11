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
      ['nama' => 'Pintu Depan Kiri',        'kode' => 'BD001', 'harga' => 1500000, 'satuan' => 'Pc'],
      ['nama' => 'Pintu Depan Kanan',       'kode' => 'BD002', 'harga' => 1500000, 'satuan' => 'Pc'],
      ['nama' => 'Kap Mesin',               'kode' => 'BD003', 'harga' => 2500000, 'satuan' => 'Pc'],
      ['nama' => 'Bumper Depan',            'kode' => 'BD004', 'harga' => 2200000, 'satuan' => 'Pc'],
      ['nama' => 'Bumper Belakang',         'kode' => 'BD005', 'harga' => 2000000, 'satuan' => 'Pc'],
      ['nama' => 'Spakbor Depan Kiri',      'kode' => 'BD006', 'harga' => 1200000, 'satuan' => 'Pc'],
      ['nama' => 'Spakbor Depan Kanan',     'kode' => 'BD007', 'harga' => 1200000, 'satuan' => 'Pc'],
      ['nama' => 'Panel Belakang Kiri',     'kode' => 'BD008', 'harga' => 1800000, 'satuan' => 'Pc'],
      ['nama' => 'Panel Belakang Kanan',    'kode' => 'BD009', 'harga' => 1800000, 'satuan' => 'Pc'],
      ['nama' => 'Roof Panel',              'kode' => 'BD010', 'harga' => 3000000, 'satuan' => 'Pc'],
      ['nama' => 'Grill Depan',             'kode' => 'BD011', 'harga' => 950000,  'satuan' => 'Pc'],
      ['nama' => 'Kap Bagasi',              'kode' => 'BD012', 'harga' => 2100000, 'satuan' => 'Pc'],
      ['nama' => 'Handle Pintu',            'kode' => 'BD013', 'harga' => 350000,  'satuan' => 'Set'],
      ['nama' => 'Cowl Top Panel',          'kode' => 'BD014', 'harga' => 800000,  'satuan' => 'Pc'],
      ['nama' => 'Apron Assy',              'kode' => 'BD015', 'harga' => 1700000, 'satuan' => 'Pc'],
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
