<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Pendaftaran;
use App\Models\Pelanggan;
use App\Models\Kendaraan;
use Illuminate\Support\Str;
use Carbon\Carbon;

class PendaftaranSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    $pelangganList = Pelanggan::all();
    $kendaraanList = Kendaraan::all();

    $pekerjaanList = [
      'Ganti oli dan filter',
      'Body repair pintu kiri',
      'Servis rem belakang',
      'Pengecekan AC dan radiator',
      'Tune up mesin',
      'Perbaikan bodi belakang',
      'Penggantian kaca depan',
      'Perbaikan sistem kelistrikan',
      'Cat ulang bumper depan',
      'Servis kaki-kaki dan shockbreaker',
    ];

    foreach ($pelangganList as $index => $pelanggan) {
      $kendaraan = $kendaraanList[$index] ?? null;

      if ($kendaraan) {
        $penanggungId = rand(1, 6); // 1 = Pribadi, lainnya bisa Asuransi

        Pendaftaran::create([
          'no_register' => 'REG-' . Str::upper(Str::random(6)),
          'no_polis' => $penanggungId === 1 ? null : 'POL-' . ($index + 1) . Str::upper(Str::random(3)),
          'tanggal_pendaftaran' => Carbon::now()->subDays(rand(1, 30)),
          'keterangan' => $pekerjaanList[array_rand($pekerjaanList)],
          'pelanggan_id' => $pelanggan->id,
          'kendaraan_id' => $kendaraan->id,
          'penanggung_id' => $penanggungId,
          'km_masuk' => rand(1000, 5000),
          'user_id' => 2,
        ]);
      }
    }
  }
}
