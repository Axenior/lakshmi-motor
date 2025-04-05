<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Merk;
use App\Models\Tipe;

class TipeSeeder extends Seeder
{
  public function run(): void
  {
    $toyota = Merk::where('nama', 'Toyota')->first();
    $honda = Merk::where('nama', 'Honda')->first();
    $suzuki = Merk::where('nama', 'Suzuki')->first();
    $mitsubishi = Merk::where('nama', 'Mitsubishi')->first();
    $nissan = Merk::where('nama', 'Nissan')->first();

    Tipe::insert([
      ['nama' => 'Avanza', 'merk_id' => $toyota->id],
      ['nama' => 'Innova', 'merk_id' => $toyota->id],
      ['nama' => 'Civic', 'merk_id' => $honda->id],
      ['nama' => 'Jazz', 'merk_id' => $honda->id],
      ['nama' => 'Ertiga', 'merk_id' => $suzuki->id],
      ['nama' => 'XL7', 'merk_id' => $suzuki->id],
      ['nama' => 'Xpander', 'merk_id' => $mitsubishi->id],
      ['nama' => 'Pajero Sport', 'merk_id' => $mitsubishi->id],
      ['nama' => 'Livina', 'merk_id' => $nissan->id],
      ['nama' => 'Serena', 'merk_id' => $nissan->id],
    ]);
  }
}
