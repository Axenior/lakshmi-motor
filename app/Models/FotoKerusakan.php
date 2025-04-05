<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FotoKerusakan extends Model
{
  protected $table = 'foto_kerusakan';

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
