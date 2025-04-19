<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Jasa;

class JasaSeeder extends Seeder
{
  public function run(): void
  {
    $namaJasaList = [
      'Perbaikan Baret Ringan',
      'Perbaikan Panel Penyok',
      'Pengecatan Ulang Full Body',
      'Cat Ulang Panel (per panel)',
      'Perbaikan Bumper',
      'Perbaikan Pintu Mobil',
      'Pengecatan Ulang Kap Mesin',
      'Body Repair & Cat Komplit',
      'Pengelasan Body Mobil',
      'Perbaikan Fender',
    ];

    for ($penanggungId = 1; $penanggungId <= 6; $penanggungId++) {
      foreach ($namaJasaList as $namaJasa) {
        $harga = rand(40, 200) * 5000;
        Jasa::create([
          'nama' => $namaJasa,
          'harga' => $harga,
          'penanggung_id' => $penanggungId,
        ]);
      }
    }
  }
}
