<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FileSTNK extends Model
{
  protected $table = 'file_stnk';

  protected $guarded = [];

  public function pendaftaran()
  {
    return $this->belongsTo(Pendaftaran::class);
  }
}
