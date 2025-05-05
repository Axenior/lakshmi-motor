<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FileSTNK extends Model
{
  protected $table = 'file_stnk';

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
