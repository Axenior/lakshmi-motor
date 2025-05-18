<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tipe extends Model
{
    protected $table = 'tipe';

    protected $guarded = [];

    public function merk()
    {
        return $this->belongsTo(Merk::class);
    }

    public function spareparts()
    {
        return $this->hasMany(Sparepart::class);
    }
}
