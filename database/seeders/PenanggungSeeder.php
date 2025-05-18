<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Penanggung;

class PenanggungSeeder extends Seeder
{
  public function run(): void
  {
    Penanggung::insert([
      ['nama' => 'Pribadi', 'alamat' => '', 'no_telepon' => '', 'no_fax' => ''],
      ['nama' => 'PT. Sejahtera Makmur', 'alamat' => 'Jl. Merdeka No. 123, Jakarta', 'no_telepon' => '081234567890', 'no_fax' => '0211234567'],
      ['nama' => 'CV. Berkah Jaya', 'alamat' => 'Jl. Sudirman No. 45, Bandung', 'no_telepon' => '082345678901', 'no_fax' => '0222345678'],
      ['nama' => 'UD. Sentosa Abadi', 'alamat' => 'Jl. Diponegoro No. 67, Surabaya', 'no_telepon' => '083456789012', 'no_fax' => '0313456789'],
      ['nama' => 'PT. Maju Terus', 'alamat' => 'Jl. Gatot Subroto No. 89, Medan', 'no_telepon' => '084567890123', 'no_fax' => '0614567890'],
      ['nama' => 'CV. Sukses Bersama', 'alamat' => 'Jl. Ahmad Yani No. 12, Yogyakarta', 'no_telepon' => '085678901234', 'no_fax' => '0274567891'],
    ]);
  }
}
