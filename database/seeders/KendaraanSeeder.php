<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Kendaraan;

class KendaraanSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    $kendaraanData = [
      [
        'no_rangka' => 'RNG1234567890A',
        'no_polisi' => 'BG 1234 AA',
        'no_mesin' => 'MSN001',
        'tahun' => 2020,
        'jenis' => 'SUV',
        'warna' => 'Hitam',
        'tipe_id' => 1,
      ],
      [
        'no_rangka' => 'RNG1234567890B',
        'no_polisi' => 'BG 5678 BB',
        'no_mesin' => 'MSN002',
        'tahun' => 2019,
        'jenis' => 'Sedan',
        'warna' => 'Putih',
        'tipe_id' => 2,
      ],
      [
        'no_rangka' => 'RNG1234567890C',
        'no_polisi' => 'BG 2468 CC',
        'no_mesin' => 'MSN003',
        'tahun' => 2021,
        'jenis' => 'Hatchback',
        'warna' => 'Merah',
        'tipe_id' => 3,
      ],
      [
        'no_rangka' => 'RNG1234567890D',
        'no_polisi' => 'BG 1357 DD',
        'no_mesin' => 'MSN004',
        'tahun' => 2018,
        'jenis' => 'MPV',
        'warna' => 'Biru',
        'tipe_id' => 4,
      ],
      [
        'no_rangka' => 'RNG1234567890E',
        'no_polisi' => 'BG 9999 EE',
        'no_mesin' => 'MSN005',
        'tahun' => 2022,
        'jenis' => 'SUV',
        'warna' => 'Silver',
        'tipe_id' => 5,
      ],
      [
        'no_rangka' => 'RNG1234567890F',
        'no_polisi' => 'BG 8888 FF',
        'no_mesin' => 'MSN006',
        'tahun' => 2023,
        'jenis' => 'Sedan',
        'warna' => 'Hitam',
        'tipe_id' => 6,
      ],
      [
        'no_rangka' => 'RNG1234567890G',
        'no_polisi' => 'BG 7777 GG',
        'no_mesin' => 'MSN007',
        'tahun' => 2020,
        'jenis' => 'Pickup',
        'warna' => 'Putih',
        'tipe_id' => 7,
      ],
      [
        'no_rangka' => 'RNG1234567890H',
        'no_polisi' => 'BG 6666 HH',
        'no_mesin' => 'MSN008',
        'tahun' => 2021,
        'jenis' => 'SUV',
        'warna' => 'Merah Maroon',
        'tipe_id' => 8,
      ],
      [
        'no_rangka' => 'RNG1234567890I',
        'no_polisi' => 'BG 5555 II',
        'no_mesin' => 'MSN009',
        'tahun' => 2023,
        'jenis' => 'Mobil Penumpang',
        'warna' => 'Abu-Abu',
        'tipe_id' => 9,
      ],
      [
        'no_rangka' => 'RNG1234567890J',
        'no_polisi' => 'BG 4444 JJ',
        'no_mesin' => 'MSN010',
        'tahun' => 2022,
        'jenis' => 'Van',
        'warna' => 'Hijau',
        'tipe_id' => 10,
      ],
    ];

    foreach ($kendaraanData as $data) {
      Kendaraan::create($data);
    }
  }
}
