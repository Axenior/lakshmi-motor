<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Kelengkapan extends Model
{
    protected $guarded = [];

    public function pendaftarans()
    {
        return $this->belongsToMany(Pendaftaran::class);
    }
}
