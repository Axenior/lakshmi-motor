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

    $kendaraanData = [
      [
        'no_rangka' => 'MHKSZNE1XKJ4T7632',
        'no_polisi' => 'BG 4353 YA',
        'no_mesin' => 'MSN001',
        'tahun' => 2020,
        'jenis' => 'Mobil Penumpang',
        'warna' => 'Hitam',
        'tipe_id' => 1,
      ],
      [
        'no_rangka' => 'JH4DA9350LS321985',
        'no_polisi' => 'BG 5678 OB',
        'no_mesin' => 'MSN002',
        'tahun' => 2019,
        'jenis' => 'Mini Bus',
        'warna' => 'Putih',
        'tipe_id' => 2,
      ],
      [
        'no_rangka' => '3FAHP0HA7AR123948',
        'no_polisi' => 'BG 2468 CH',
        'no_mesin' => 'MSN003',
        'tahun' => 2021,
        'jenis' => 'Sedan Sport',
        'warna' => 'Merah',
        'tipe_id' => 3,
      ],
      [
        'no_rangka' => '1HGCM82633A657492',
        'no_polisi' => 'BG 1357 DT',
        'no_mesin' => 'MSN004',
        'tahun' => 2018,
        'jenis' => 'Hatchback',
        'warna' => 'Biru',
        'tipe_id' => 4,
      ],
      [
        'no_rangka' => 'JTDKN3DU4A1238523',
        'no_polisi' => 'BG 4719 XE',
        'no_mesin' => 'MSN005',
        'tahun' => 2022,
        'jenis' => 'Mobil Keluarga',
        'warna' => 'Silver',
        'tipe_id' => 5,
      ],
      [
        'no_rangka' => 'KMHDU46D78U256417',
        'no_polisi' => 'BG 5240 FQ',
        'no_mesin' => 'MSN006',
        'tahun' => 2023,
        'jenis' => 'Crossover',
        'warna' => 'Hitam',
        'tipe_id' => 6,
      ],
      [
        'no_rangka' => '1N4AL11D75C109241',
        'no_polisi' => 'BG 3378 GR',
        'no_mesin' => 'MSN007',
        'tahun' => 2020,
        'jenis' => 'Mobil Keluarga',
        'warna' => 'Putih',
        'tipe_id' => 7,
      ],
      [
        'no_rangka' => '2T1BU4EE9DC123789',
        'no_polisi' => 'BG 6269 HF',
        'no_mesin' => 'MSN008',
        'tahun' => 2021,
        'jenis' => 'SUV',
        'warna' => 'Merah Maroon',
        'tipe_id' => 8,
      ],
      [
        'no_rangka' => '1FADP3F22EL451037',
        'no_polisi' => 'BG 3412 IA',
        'no_mesin' => 'MSN009',
        'tahun' => 2023,
        'jenis' => 'Mobil Penumpang',
        'warna' => 'Abu-Abu',
        'tipe_id' => 9,
      ],
      [
        'no_rangka' => 'WDBRF40J93F341266',
        'no_polisi' => 'BG 3426 JA',
        'no_mesin' => 'MSN010',
        'tahun' => 2022,
        'jenis' => 'Van',
        'warna' => 'Hijau',
        'tipe_id' => 10,
      ],
    ];

    $pekerjaanList = [
      'Perbaikan bodi penyok',
      'Pengecatan ulang pintu belakang',
      'Pengelasan bagian bawah bodi',
      'Perbaikan fender depan kanan',
      'Cat ulang bumper belakang',
      'Perataan dan cat kap mesin',
      'Pengecatan full body',
      'Pengecatan panel pintu',
      'Penggantian panel bodi rusak',
      'Body repair & detailing',
    ];

    // Total data yang akan di-seed
    $total = min(count($pelangganData), count($kendaraanData));

    for ($i = 0; $i < $total; $i++) {
      $pelanggan = $pelangganData[$i];
      $kendaraan = $kendaraanData[$i];

      $penanggungId = rand(1, 6); // 1 = Pribadi, lainnya bisa Asuransi

      Pendaftaran::create([
        'no_register' => 'REG-' . Str::upper(Str::random(6)),
        'no_polis' => $penanggungId === 1 ? null : 'POL-' . ($i + 1) . Str::upper(Str::random(3)),
        'tanggal_pendaftaran' => Carbon::now()->subDays($total - $i), // dari lama ke baru
        'keterangan' => $pekerjaanList[array_rand($pekerjaanList)],
        'nama' => $pelanggan['nama'],
        'alamat' => $pelanggan['alamat'],
        'no_telepon' => $pelanggan['no_telepon'],
        'no_rangka' => $kendaraan['no_rangka'],
        'no_polisi' => $kendaraan['no_polisi'],
        'no_mesin' => $kendaraan['no_mesin'],
        'tahun' => $kendaraan['tahun'],
        'jenis' => $kendaraan['jenis'],
        'warna' => $kendaraan['warna'],
        'tipe_id' => $kendaraan['tipe_id'],
        'penanggung_id' => $penanggungId,
        'km_masuk' => rand(1000, 5000),
        'user_id' => 2,
      ]);
    }
  }
}
