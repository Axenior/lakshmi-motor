<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class File extends Model
{
  protected $table = 'file';

  protected $guarded = [];

  public function estimasi()
  {
    return $this->belongsTo(Pendaftaran::class);
  }
}
