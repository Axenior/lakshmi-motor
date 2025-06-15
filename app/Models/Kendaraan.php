<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Kendaraan extends Model
{
    protected $table = 'kendaraan';

    protected $guarded = [];

    public function pendaftaran()
    {
        return $this->hasOne(Pendaftaran::class);
    }

    public function tipe()
    {
        return $this->belongsTo(Tipe::class);
    }
}
