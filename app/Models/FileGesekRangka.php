<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FileGesekRangka extends Model
{
  protected $table = 'file_gesek_rangka';

  protected $guarded = [];

  public function pendaftaran()
  {
    return $this->belongsTo(Pendaftaran::class);
  }
}
