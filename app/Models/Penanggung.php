<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Penanggung extends Model
{
    protected $table = 'penanggung';

    protected $fillable = [
        'nama',
        'alamat',
        'no_telepon',
        'no_fax',
        'pph',
        'ppn'
    ];

    public function pendaftarans()
    {
        return $this->hasMany(Pendaftaran::class);
    }
}
