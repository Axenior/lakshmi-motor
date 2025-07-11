<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Estimasi extends Model
{
  protected $table = 'estimasi';

  protected $guarded = [];

  public function pendaftaran()
  {
    return $this->belongsTo(Pendaftaran::class);
  }

  public function estimasiJasas()
  {
    return $this->hasMany(EstimasiJasa::class);
  }

  public function estimasiSpareparts()
  {
    return $this->hasMany(EstimasiSparepart::class);
  }
}
