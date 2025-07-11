<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            PenanggungSeeder::class,
            JasaSeeder::class,
            MerkSeeder::class,
            TipeSeeder::class,
            SparepartSeeder::class,
            // PelangganSeeder::class,
            // KendaraanSeeder::class,
            PendaftaranSeeder::class
        ]);
    }
}
