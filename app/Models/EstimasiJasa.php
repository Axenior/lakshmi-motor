<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EstimasiJasa extends Model
{
  protected $table = 'estimasi_jasa';

  protected $guarded = [];

  public function estimasi()
  {
    return $this->belongsTo(Estimasi::class);
  }

  public function jasa()
  {
    return $this->belongsTo(Jasa::class);
  }
}
