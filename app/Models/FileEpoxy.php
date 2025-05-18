<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FileEpoxy extends Model
{
  protected $table = 'file_epoxy';

  protected $guarded = [];

  public function estimasi()
  {
    return $this->belongsTo(Estimasi::class);
  }
}
