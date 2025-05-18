<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FileKerusakan extends Model
{
  protected $table = 'file_kerusakan';

  protected $guarded = [];

  public function pendaftaran()
  {
    return $this->belongsTo(Pendaftaran::class);
  }
}
