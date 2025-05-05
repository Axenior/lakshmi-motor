<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FileKerusakan extends Model
{
  protected $table = 'file_kerusakan';

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
