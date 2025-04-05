<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FotoSTNK extends Model
{
  protected $table = 'foto_stnk';

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
