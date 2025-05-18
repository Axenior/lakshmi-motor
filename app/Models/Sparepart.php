<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Sparepart extends Model
{
  protected $table = 'sparepart';

  protected $guarded = [];

  public function tipe()
  {
    return $this->belongsTo(Tipe::class);
  }
}
