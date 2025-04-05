<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Kendaraan extends Model
{
    protected $table = 'kendaraan';

    protected $fillable = [
        'no_rangka',
        'no_polisi',
        'no_mesin',
        'tipe_id',
        'tahun',
        'jenis',
        'warna'
    ];

    public function pendaftarans()
    {
        return $this->hasMany(Pendaftaran::class);
    }

    public function tipe()
    {
        return $this->belongsTo(Tipe::class);
    }
}
