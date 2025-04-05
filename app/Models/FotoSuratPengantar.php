<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FotoSuratPengantar extends Model
{
  protected $table = 'foto_surat_pengantar';

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
