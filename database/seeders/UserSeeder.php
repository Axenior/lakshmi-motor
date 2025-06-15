<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
  public function run(): void
  {
    User::create([
      'name' => 'Matius',
      'email' => 'admin@gmail.com',
      'password' => 'admin123',
      'role' => 'admin',
    ]);
    User::create([
      'name' => 'Bryan',
      'email' => 'user1@gmail.com',
      'password' => 'user1123',
      'role' => 'user',
    ]);
  }
}
