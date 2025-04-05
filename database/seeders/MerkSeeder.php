<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Merk;

class MerkSeeder extends Seeder
{
  public function run(): void
  {
    Merk::insert([
      ['nama' => 'Toyota'],
      ['nama' => 'Honda'],
      ['nama' => 'Suzuki'],
      ['nama' => 'Mitsubishi'],
      ['nama' => 'Nissan'],
    ]);
  }
}
