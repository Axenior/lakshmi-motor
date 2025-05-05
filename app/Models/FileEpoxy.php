<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FileEpoxy extends Model
{
  protected $table = 'file_epoxy';

  protected $fillable = [
    'path',
    'hash',
    'pendaftaran_id'
  ];

  public function estimasi()
  {
    return $this->belongsTo(Estimasi::class);
  }
}
