<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Penanggung;

class PenanggungSeeder extends Seeder
{
  public function run(): void
  {
    Penanggung::insert([
      ['nama' => 'Pribadi', 'alamat' => '', 'no_telepon' => '', 'no_fax' => '', 'pph' => 0, 'ppn' => 0],
      ['nama' => 'PT. Sejahtera Makmur', 'alamat' => 'Jl. Merdeka No. 123, Jakarta', 'no_telepon' => '081234567890', 'no_fax' => '0211234567', 'pph' => 10, 'ppn' => 11],
      ['nama' => 'CV. Berkah Jaya', 'alamat' => 'Jl. Sudirman No. 45, Bandung', 'no_telepon' => '082345678901', 'no_fax' => '0222345678', 'pph' => 15, 'ppn' => 10],
      ['nama' => 'UD. Sentosa Abadi', 'alamat' => 'Jl. Diponegoro No. 67, Surabaya', 'no_telepon' => '083456789012', 'no_fax' => '0313456789', 'pph' => 5, 'ppn' => 12],
      ['nama' => 'PT. Maju Terus', 'alamat' => 'Jl. Gatot Subroto No. 89, Medan', 'no_telepon' => '084567890123', 'no_fax' => '0614567890', 'pph' => 7, 'ppn' => 11],
      ['nama' => 'CV. Sukses Bersama', 'alamat' => 'Jl. Ahmad Yani No. 12, Yogyakarta', 'no_telepon' => '085678901234', 'no_fax' => '0274567891', 'pph' => 12, 'ppn' => 9],
    ]);
  }
}
