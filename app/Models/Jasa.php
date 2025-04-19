<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Jasa extends Model
{
  protected $table = 'jasa';

  protected $fillable = [
    'nama',
    'harga',
    'penanggung_id'
  ];

  public function penanggung()
  {
    return $this->belongsTo(Penanggung::class);
  }
}
