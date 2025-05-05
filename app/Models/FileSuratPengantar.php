<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FileSuratPengantar extends Model
{
  protected $table = 'file_surat_pengantar';

  protected $fillable = [
    'path',
    'hash',
    'pendaftaran_id'
  ];

  public function pendaftaran()
  {
    return $this->belongsTo(Pendaftaran::class);
  }
}
