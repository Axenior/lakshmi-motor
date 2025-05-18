<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Jasa extends Model
{
  protected $table = 'jasa';

  protected $guarded = [];

  public function penanggung()
  {
    return $this->belongsTo(Penanggung::class);
  }
}
