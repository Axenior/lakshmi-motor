<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FileSPK extends Model
{
  protected $table = 'file_spk';

  protected $guarded = [];

  public function estimasi()
  {
    return $this->belongsTo(Estimasi::class);
  }
}
