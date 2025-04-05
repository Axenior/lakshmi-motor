<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Pelanggan;

class PelangganSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    $pelangganData = [
      ['nama' => 'Budi Santoso', 'alamat' => 'Jl. Melati No. 123', 'no_telepon' => '081234567890'],
      ['nama' => 'Siti Aminah', 'alamat' => 'Jl. Mawar No. 45', 'no_telepon' => '082345678901'],
      ['nama' => 'Andi Wijaya', 'alamat' => 'Jl. Anggrek No. 5', 'no_telepon' => '083123456789'],
      ['nama' => 'Rina Kurnia', 'alamat' => 'Jl. Dahlia No. 88', 'no_telepon' => '084234567890'],
      ['nama' => 'Dedi Gunawan', 'alamat' => 'Jl. Teratai No. 33', 'no_telepon' => '085345678901'],
      ['nama' => 'Fitri Rahmawati', 'alamat' => 'Jl. Kenanga No. 7', 'no_telepon' => '086456789012'],
      ['nama' => 'Agus Salim', 'alamat' => 'Jl. Cempaka No. 21', 'no_telepon' => '087567890123'],
      ['nama' => 'Lina Marlina', 'alamat' => 'Jl. Kamboja No. 10', 'no_telepon' => '088678901234'],
      ['nama' => 'Rudi Hartono', 'alamat' => 'Jl. Flamboyan No. 15', 'no_telepon' => '089789012345'],
      ['nama' => 'Nur Aisyah', 'alamat' => 'Jl. Sakura No. 2', 'no_telepon' => '081890123456'],
    ];

    foreach ($pelangganData as $data) {
      Pelanggan::create($data);
    }
  }
}
