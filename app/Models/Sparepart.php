<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Sparepart extends Model
{
  protected $table = 'sparepart';

  protected $fillable = [
    'kode',
    'nama',
    'satuan',
    'harga',
    'tipe_id'
  ];

  public function tipe()
  {
    return $this->belongsTo(Tipe::class);
  }
}
