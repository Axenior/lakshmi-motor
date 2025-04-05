<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FotoGesekRangka extends Model
{
  protected $table = 'foto_gesek_rangka';

  protected $fillable = [
    'path',
    'hash',
    'pendaftaran_id'
  ];

  public function pendaftarans()
  {
    return $this->belongsTo(Pendaftaran::class);
  }
}
