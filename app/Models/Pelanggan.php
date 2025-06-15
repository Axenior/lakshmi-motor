<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pelanggan extends Model
{
    protected $table = 'pelanggan';

    protected $guarded = [];

    public function pendaftaran()
    {
        return $this->hasOne(Pendaftaran::class);
    }
}
