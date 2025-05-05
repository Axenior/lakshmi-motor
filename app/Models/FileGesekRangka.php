<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FileGesekRangka extends Model
{
  protected $table = 'file_gesek_rangka';

  protected $fillable = [
    'path',
    'hash',
    'estimasi_id'
  ];

  public function pendaftaran()
  {
    return $this->belongsTo(Pendaftaran::class);
  }
}
