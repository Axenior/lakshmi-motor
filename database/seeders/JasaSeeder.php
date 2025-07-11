<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Jasa;

class JasaSeeder extends Seeder
{
  public function run(): void
  {
    $jasaList = [
      ['nama' => 'Perbaikan Lecet Ringan', 'harga' => 200000],
      ['nama' => 'Perbaikan Penyok Ringan', 'harga' => 250000],
      ['nama' => 'Perbaikan Penyok Sedang', 'harga' => 350000],
      ['nama' => 'Perbaikan Penyok Berat', 'harga' => 500000],
      ['nama' => 'Perbaikan Panel', 'harga' => 300000],
      ['nama' => 'Perbaikan Bumper', 'harga' => 350000],
      ['nama' => 'Perbaikan Spakbor', 'harga' => 280000],
      ['nama' => 'Perbaikan Kap Mesin', 'harga' => 400000],
      ['nama' => 'Perbaikan Bagasi', 'harga' => 350000],
      ['nama' => 'Perbaikan Atap Mobil', 'harga' => 500000],
      ['nama' => 'Pengecatan Panel', 'harga' => 300000],
      ['nama' => 'Pengecatan Full Body', 'harga' => 1200000],
      ['nama' => 'Pengecatan Kap Mesin', 'harga' => 400000],
      ['nama' => 'Pengecatan Bumper', 'harga' => 350000],
      ['nama' => 'Pengecatan Pintu', 'harga' => 320000],
      ['nama' => 'Poles Body Mobil', 'harga' => 250000],
      ['nama' => 'Perbaikan dan Poles', 'harga' => 350000],
      ['nama' => 'Cat Ulang dan Poles', 'harga' => 450000],
      ['nama' => 'Body Repair Ringan', 'harga' => 300000],
      ['nama' => 'Body Repair Sedang', 'harga' => 450000],
      ['nama' => 'Body Repair Berat', 'harga' => 600000],
      ['nama' => 'Perbaikan Panel Samping', 'harga' => 350000],
      ['nama' => 'Perbaikan dan Cat Ulang', 'harga' => 550000],
      ['nama' => 'Penggantian Panel Rusak', 'harga' => 700000],
      ['nama' => 'Pengelasan Body Ringan', 'harga' => 500000],
      ['nama' => 'Pengelasan Body Sedang', 'harga' => 650000],
      ['nama' => 'Penyambungan Panel', 'harga' => 600000],
      ['nama' => 'Perbaikan Rangka Ringan', 'harga' => 750000],
      ['nama' => 'Perbaikan Rangka Sedang', 'harga' => 950000],
      ['nama' => 'Perbaikan Rangka Berat', 'harga' => 1250000],
      ['nama' => 'Pengecatan Rangka', 'harga' => 400000],
      ['nama' => 'Perbaikan dan Pengecatan', 'harga' => 600000],
      ['nama' => 'Penyemprotan Anti Karat', 'harga' => 350000],
      ['nama' => 'Perbaikan Kerusakan Ringan', 'harga' => 250000],
      ['nama' => 'Body Repair & Cat Lengkap', 'harga' => 1500000],
    ];


    foreach ($jasaList as $jasa) {
      Jasa::create([
        'nama' => $jasa['nama'],
        'harga' => $jasa['harga'],
      ]);
    }
  }
}
