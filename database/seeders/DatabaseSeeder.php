<?php

namespace Database\Seeders;

use App\Models\Kelengkapan;
use App\Models\Merk;
use App\Models\Penanggung;
use App\Models\Tipe;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::create([
            'name' => 'matius',
            'email' => 'matius@gmail.com',
            'password' => 'admin123'
        ]);

        Penanggung::insert([
            [
                'nama' => 'Pribadi',
                'alamat' => '',
                'no_telepon' => '',
                'no_fax' => '',
                'pph' => 0,
                'ppn' => 0,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nama' => 'PT. Sejahtera Makmur',
                'alamat' => 'Jl. Merdeka No. 123, Jakarta',
                'no_telepon' => '081234567890',
                'no_fax' => '0211234567',
                'pph' => 10,
                'ppn' => 11,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nama' => 'CV. Berkah Jaya',
                'alamat' => 'Jl. Sudirman No. 45, Bandung',
                'no_telepon' => '082345678901',
                'no_fax' => '0222345678',
                'pph' => 15,
                'ppn' => 10,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nama' => 'UD. Sentosa Abadi',
                'alamat' => 'Jl. Diponegoro No. 67, Surabaya',
                'no_telepon' => '083456789012',
                'no_fax' => '0313456789',
                'pph' => 5,
                'ppn' => 12,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nama' => 'PT. Maju Terus',
                'alamat' => 'Jl. Gatot Subroto No. 89, Medan',
                'no_telepon' => '084567890123',
                'no_fax' => '0614567890',
                'pph' => 7,
                'ppn' => 11,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nama' => 'CV. Sukses Bersama',
                'alamat' => 'Jl. Ahmad Yani No. 12, Yogyakarta',
                'no_telepon' => '085678901234',
                'no_fax' => '0274567891',
                'pph' => 12,
                'ppn' => 9,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        Merk::insert([
            ['nama' => 'Toyota'],
            ['nama' => 'Honda'],
            ['nama' => 'Suzuki'],
            ['nama' => 'Mitsubishi'],
            ['nama' => 'Nissan'],
        ]);

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
