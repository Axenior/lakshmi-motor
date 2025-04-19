<?php

namespace App\Http\Controllers;

use App\Models\FotoGesekRangka;
use App\Models\FotoKerusakan;
use App\Models\FotoSTNK;
use App\Models\FotoSuratPengantar;
use App\Models\Kendaraan;
use App\Models\Pelanggan;
use App\Models\Penanggung;
use App\Models\Pendaftaran;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class PendaftaranController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $pendaftaran = Pendaftaran::with(
            'pelanggan',
            'penanggung',
            'kendaraan',
            'foto_kerusakans',
            'foto_stnks',
            'foto_gesek_rangkas',
            'foto_surat_pengantars',
        )->paginate(25);
        // $pendaftaran->load([
        //     'pelanggan',
        //     'kendaraan.tipe.merk',
        //     'foto_kerusakans',
        //     'foto_stnks',
        //     'foto_gesek_rangkas',
        //     'foto_surat_pengantars',
        // ]);
        return Inertia::render('Pendaftaran/Index', [
            'nama' => "Pendaftaran",
            'pendaftaran' => $pendaftaran
        ]);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $nextId = DB::table('pendaftaran')->max('id') + 1;
        $penanggung = Penanggung::all();
        return Inertia::render('Pendaftaran/Create', [
            'nextId' => $nextId,
            'penanggung' => $penanggung,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate(
            [
                'no_pendaftaran' => 'required|string',
                'no_telepon' => 'required|string',
                'nama' => 'required|string|max:100',
                'alamat' => 'required|string|max:255',
                'tanggal_pendaftaran' => 'required|date',
                'km_masuk' => 'integer|min:0',
                'no_register' => 'required',
                'penanggung' => 'required',
                'no_polis' => 'required_unless:penanggung,1,null|max:50',
                'no_polisi' => 'required|string',
                'plate_prefix' => 'required',
                'plate_number' => 'required',
                'plate_suffix' => 'required',
                'no_rangka' => 'required|string',
                'no_mesin' => 'required|string|max:50',
                'merk' => 'required|integer',
                'tipe' => [
                    'required',
                    'integer',
                    Rule::exists('tipe', 'id')->where(function ($query) use ($request) {
                        $query->where('merk_id', $request->merk);
                    }),
                ],
                'tahun' => 'required|integer|max:' . date('Y'),
                'jenis' => 'required|string|max:50',
                'warna' => 'required|string|max:30',
            ]
        );

        DB::beginTransaction();
        try {
            // Cek apakah pelanggan dengan nomor telepon sudah ada
            $pelanggan = Pelanggan::where('no_telepon', $request->no_telepon)->first();

            if (!$pelanggan) {
                // Jika belum ada, buat pelanggan baru
                $pelanggan = Pelanggan::create([
                    'nama' => $request->nama,
                    'alamat' => $request->alamat,
                    'no_telepon' => $request->no_telepon,
                ]);
            } else {
                // Jika sudah ada, update data pelanggan
                $pelanggan->update([
                    'nama' => $request->nama,
                    'alamat' => $request->alamat,
                ]);
            }

            // Cek apakah kendaraan dengan nomor polisi sudah ada
            $kendaraan = Kendaraan::where('no_rangka', $request->no_rangka)->first();
            if (!$kendaraan) {
                // Jika belum ada, buat kendaraan baru
                $kendaraan = Kendaraan::create([
                    'no_rangka' => $request->no_rangka,
                    'no_polisi' => $request->no_polisi,
                    'no_mesin' => $request->no_mesin,
                    // 'merk' => $request->merk,
                    'tipe_id' => $request->tipe,
                    'tahun' => $request->tahun,
                    'jenis' => $request->jenis,
                    'warna' => $request->warna,
                ]);
            } else {
                // Jika sudah ada, update data kendaraan
                $kendaraan->update([
                    'no_polisi' => $request->no_polisi,
                    'no_mesin' => $request->no_mesin,
                    // 'merk' => $request->merk,
                    'tipe_id' => $request->tipe,
                    'tahun' => $request->tahun,
                    'jenis' => $request->jenis,
                    'warna' => $request->warna,
                ]);
            }

            // Simpan data pendaftaran
            $pendaftaran = Pendaftaran::create([
                'no_register' => $request->no_register,
                'no_polis' => $request->no_polis,

                'km_masuk' => $request->km_masuk,
                'tanggal_pendaftaran' => $request->tanggal_pendaftaran,
                'keterangan' => $request->keterangan,
                'pelanggan_id' => $pelanggan->id,
                'kendaraan_id' => $kendaraan->id,
                'penanggung_id' => $request->penanggung,
                'keterangan' => $request->keterangan
            ]);

            $this->syncUploadedFiles($request, 'foto_kerusakan', FotoKerusakan::class, 'pendaftaran_id', $pendaftaran->id, 'FK', 'foto-kerusakan');
            $this->syncUploadedFiles($request, 'foto_stnk', FotoSTNK::class, 'pendaftaran_id', $pendaftaran->id, 'STNK', 'foto-stnk');
            $this->syncUploadedFiles($request, 'foto_gesek_rangka', FotoGesekRangka::class, 'pendaftaran_id', $pendaftaran->id, 'FGR', 'foto-gesek-rangka');
            $this->syncUploadedFiles($request, 'foto_surat_pengantar', FotoSuratPengantar::class, 'pendaftaran_id', $pendaftaran->id, 'FSP', 'foto-surat-pengantar');

            DB::commit();
            return redirect(route('pendaftaran.index', absolute: false));
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['pendaftaran' => 'Gagal menyimpan data: ' . $e->getMessage()])
                ->withInput();
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Pendaftaran $pendaftaran)
    {
        $pendaftaran->load([
            'pelanggan',
            'kendaraan.tipe.merk',
            // 'kendaraan.merk',
            'foto_kerusakans',
            'foto_stnks',
            'foto_gesek_rangkas',
            'foto_surat_pengantars',
        ]);
        $penanggung = Penanggung::all();
        return Inertia::render('Pendaftaran/Show', [
            'pendaftaran' => $pendaftaran,
            'penanggung' => $penanggung,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Pendaftaran $pendaftaran)
    {
        $pendaftaran->load([
            'pelanggan',
            'kendaraan.tipe.merk',
            // 'kendaraan.merk',
            'foto_kerusakans',
            'foto_stnks',
            'foto_gesek_rangkas',
            'foto_surat_pengantars',
        ]);
        $penanggung = Penanggung::all();
        return Inertia::render('Pendaftaran/Edit', [
            'pendaftaran' => $pendaftaran,
            'penanggung' => $penanggung,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */

    public function update(Request $request, Pendaftaran $pendaftaran)
    {
        $request->validate(
            [
                'no_pendaftaran' => 'required|string',
                'no_telepon' => 'required|string',
                'nama' => 'required|string|max:100',
                'alamat' => 'required|string|max:255',
                'tanggal_pendaftaran' => 'required|date',
                'km_masuk' => 'integer|min:0',
                'no_polisi' => 'required|string',
                'no_register' => 'required',
                'penanggung' => 'required',
                'no_polis' => 'required_unless:penanggung,1,null|max:50',
                'plate_prefix' => 'required',
                'plate_number' => 'required',
                'plate_suffix' => 'required',
                'no_rangka' => 'required|string',
                'no_mesin' => 'required|string|max:50',
                'merk' => 'required|integer',
                'tipe' => [
                    'required',
                    'integer',
                    Rule::exists('tipe', 'id')->where(function ($query) use ($request) {
                        $query->where('merk_id', $request->merk);
                    }),
                ],
                'tahun' => 'required|integer|max:' . date('Y'),
                'jenis' => 'required|string|max:50',
                'warna' => 'required|string|max:30',
            ]
        );


        DB::beginTransaction();
        try {
            // Update Pelanggan
            $pelanggan = Pelanggan::find($pendaftaran->pelanggan_id);
            if ($pelanggan) {
                $pelanggan->update([
                    'nama' => $request->nama,
                    'alamat' => $request->alamat,
                    'no_telepon' => $request->no_telepon,
                ]);
            } else {
                $pelanggan = Pelanggan::create([
                    'nama' => $request->nama,
                    'alamat' => $request->alamat,
                    'no_telepon' => $request->no_telepon,
                ]);
                $pendaftaran->pelanggan_id = $pelanggan->id;
            }

            // Update Kendaraan
            $kendaraan = Kendaraan::where('no_rangka', $request->no_rangka)->first();
            if ($kendaraan) {
                $kendaraan->update([
                    'no_polisi' => $request->no_polisi,
                    'no_mesin' => $request->no_mesin,
                    'tipe_id' => $request->tipe,
                    'tahun' => $request->tahun,
                    'jenis' => $request->jenis,
                    'warna' => $request->warna,
                ]);
            } else {
                $kendaraan = Kendaraan::create([
                    'no_rangka' => $request->no_rangka,
                    'no_polisi' => $request->no_polisi,
                    'no_mesin'  => $request->no_mesin,
                    'tipe_id' => $request->tipe,
                    'tahun' => $request->tahun,
                    'jenis' => $request->jenis,
                    'warna' => $request->warna,
                ]);
                $pendaftaran->kendaraan_id = $kendaraan->id;
            }

            // Update data pendaftaran
            $pendaftaran->update([
                'no_register' => $request->no_register,
                'no_polis' => $request->no_polis,
                'km_masuk' => $request->km_masuk,
                'tanggal_pendaftaran' => $request->tanggal_pendaftaran,
                'keterangan' => $request->keterangan,
                'penanggung_id' => $request->penanggung,
            ]);

            $this->syncUploadedFiles($request, 'foto_kerusakan', FotoKerusakan::class, 'pendaftaran_id', $pendaftaran->id, 'FK', 'foto-kerusakan');
            $this->syncUploadedFiles($request, 'foto_stnk', FotoSTNK::class, 'pendaftaran_id', $pendaftaran->id, 'STNK', 'foto-stnk');
            $this->syncUploadedFiles($request, 'foto_gesek_rangka', FotoGesekRangka::class, 'pendaftaran_id', $pendaftaran->id, 'FGR', 'foto-gesek-rangka');
            $this->syncUploadedFiles($request, 'foto_surat_pengantar', FotoSuratPengantar::class, 'pendaftaran_id', $pendaftaran->id, 'FSP', 'foto-surat-pengantar');

            DB::commit();
            return redirect(route('pendaftaran.index', false));
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['pendaftaran' => 'Gagal menyimpan data: ' . $e->getMessage()])
                ->withInput();
        }
    }




    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pendaftaran $pendaftaran)
    {
        //
    }

    private function syncUploadedFiles(Request $request, $fieldName, $modelClass, $foreignKey, $foreignId, $prefix, $folderName)
    {
        // Array untuk menyimpan hash file yang dipertahankan (file yang dikirimkan)
        $fileHashExisting = [];

        // Jika tidak ada file yang dikirimkan, hapus seluruh file terkait
        if (!$request->hasFile($fieldName)) {
            $modelClass::where($foreignKey, $foreignId)->get()->each(function ($record) {
                Storage::disk('public')->delete($record->path);
                $record->delete();
            });
        } else {
            $files = $request->file($fieldName);

            foreach ($files as $file) {
                $fileHash = md5_file($file->getRealPath());
                // Cek apakah file dengan hash tersebut sudah ada untuk record ini
                $existing = $modelClass::where('hash', $fileHash)
                    ->where($foreignKey, $foreignId)
                    ->first();

                if ($existing) {
                    // Jika sudah ada, pertahankan dengan menyimpan hash-nya
                    $fileHashExisting[] = $fileHash;
                    continue;
                }

                // Buat nama file unik menggunakan prefix, nomor pendaftaran, timestamp, dan string acak
                $extension = $file->getClientOriginalExtension();
                $fileName = "{$prefix}-{$request->no_pendaftaran}-"
                    . now()->format('YmdHis')
                    . '-' . Str::random(8)
                    . ".{$extension}";
                // Simpan file ke storage, misalnya di folder sesuai prefix (dalam disk 'public')
                $path = $file->storeAs("uploads/" . $folderName, $fileName, 'public');

                // Buat record baru di database
                $modelClass::create([
                    $foreignKey => $foreignId,
                    'path'      => $path,
                    'hash'      => $fileHash,
                ]);

                // Tambahkan hash file baru ke array untuk pertahanan
                $fileHashExisting[] = $fileHash;
            }
        }

        // Ambil seluruh record file yang sudah tersimpan untuk record induk
        $allRecords = $modelClass::where($foreignKey, $foreignId)->get();

        // Hapus record (dan file fisik) yang hash-nya tidak ada di $fileHashExisting
        foreach ($allRecords as $record) {
            if (!in_array($record->hash, $fileHashExisting)) {
                Storage::disk('public')->delete($record->path);
                $record->delete();
            }
        }
    }
}
