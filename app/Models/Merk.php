<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Merk extends Model
{
    protected $table = 'merk';

    protected $guarded = [];

    // public function kendaraans()
    // {
    //     return $this->hasMany(Kendaraan::class);
    // }

    public function tipes()
    {
        return $this->hasMany(Tipe::class);
    }
}
