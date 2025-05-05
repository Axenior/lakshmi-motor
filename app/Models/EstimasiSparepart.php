<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EstimasiSparepart extends Model
{
  protected $table = 'estimasi_sparepart';

  protected $guarded = [];

  public function estimasi()
  {
    return $this->belongsTo(Estimasi::class);
  }

  public function sparepart()
  {
    return $this->belongsTo(Sparepart::class);
  }
}
