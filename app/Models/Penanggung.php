<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Penanggung extends Model
{
    protected $table = 'penanggung';

    protected $guarded = [];

    public function pendaftarans()
    {
        return $this->hasMany(Pendaftaran::class);
    }
}
