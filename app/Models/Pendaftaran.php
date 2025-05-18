<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pendaftaran extends Model
{
    protected $table = 'pendaftaran';

    protected $guarded = [];
    // protected $fillable = [
    //     'no_register',
    //     'no_polis',
    //     'no_rangka',
    //     'km_masuk',
    //     'tanggal_pendaftaran',
    //     'kelengkapan_tambahan',
    //     'keterangan',
    //     'foto_stnk',
    //     'foto_kerusakan',
    //     'foto_surat_pengantar',
    //     'foto_gesek_rangka',
    //     'pelanggan_id',
    //     'kendaraan_id',
    //     'penanggung_id'
    // ];

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

    public function estimasi()
    {
        return $this->hasOne(Estimasi::class);
    }

    public function file_kerusakans()
    {
        return $this->hasMany(FileKerusakan::class, 'pendaftaran_id');
    }

    public function file_stnks()
    {
        return $this->hasMany(FileSTNK::class, 'pendaftaran_id');
    }

    public function file_gesek_rangkas()
    {
        return $this->hasMany(FileGesekRangka::class, 'pendaftaran_id');
    }

    public function file_surat_pengantars()
    {
        return $this->hasMany(FileSuratPengantar::class, 'pendaftaran_id');
    }

    public function file_spks()
    {
        return $this->hasMany(FileSPK::class, 'pendaftaran_id');
    }

    public function file_epoxys()
    {
        return $this->hasMany(FileEpoxy::class, 'pendaftaran_id');
    }
}
