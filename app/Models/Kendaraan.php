<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Kendaraan extends Model
{
    protected $table = 'kendaraan';

    protected $guarded = [];

    public function pendaftarans()
    {
        return $this->hasMany(Pendaftaran::class);
    }

    public function tipe()
    {
        return $this->belongsTo(Tipe::class);
    }
}
