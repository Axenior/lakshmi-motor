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

    // public function pelanggan()
    // {
    //     return $this->belongsTo(Pelanggan::class);
    // }

    public function penanggung()
    {
        return $this->belongsTo(Penanggung::class);
    }

    // public function kendaraan()
    // {
    //     return $this->belongsTo(Kendaraan::class);
    // }

    public function estimasi()
    {
        return $this->hasOne(Estimasi::class);
    }

    public function tipe()
    {
        return $this->belongsTo(Tipe::class);
    }

    public function file_kerusakans()
    {
        return $this->hasMany(File::class)->where('jenis', 'kerusakan');
    }

    public function file_stnks()
    {
        return $this->hasMany(File::class)->where('jenis', 'stnk');
    }

    public function file_gesek_rangkas()
    {
        return $this->hasMany(File::class)->where('jenis', 'gesek_rangka');
    }

    public function file_surat_pengantars()
    {
        return $this->hasMany(File::class)->where('jenis', 'surat_pengantar');
    }

    public function file_spks()
    {
        return $this->hasMany(File::class)->where('jenis', 'spk');
    }

    public function file_epoxys()
    {
        return $this->hasMany(File::class)->where('jenis', 'epoxy');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
