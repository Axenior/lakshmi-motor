<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pendaftaran extends Model
{
    protected $table = 'pendaftaran';

    protected $fillable = [
        'no_register',
        'no_polis',
        'no_rangka',
        'km_masuk',
        'tanggal_pendaftaran',
        'kelengkapan_tambahan',
        'keterangan',
        'foto_stnk',
        'foto_kerusakan',
        'foto_surat_pengantar',
        'foto_gesek_rangka',
        'pelanggan_id',
        'kendaraan_id',
        'penanggung_id'
    ];

    public function pelanggan()
    {
        return $this->belongsTo(Pelanggan::class);
    }

    public function penanggung()
    {
        return $this->belongsTo(Penanggung::class);
    }

    public function kendaraan()
    {
        return $this->belongsTo(Kendaraan::class);
    }

    public function foto_kerusakans()
    {
        return $this->hasMany(FotoKerusakan::class, 'pendaftaran_id');
    }

    public function foto_stnks()
    {
        return $this->hasMany(FotoSTNK::class, 'pendaftaran_id');
    }

    public function foto_gesek_rangkas()
    {
        return $this->hasMany(FotoGesekRangka::class, 'pendaftaran_id');
    }

    public function foto_surat_pengantars()
    {
        return $this->hasMany(FotoSuratPengantar::class, 'pendaftaran_id');
    }
}
