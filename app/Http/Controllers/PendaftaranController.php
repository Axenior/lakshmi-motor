<?php

namespace App\Http\Controllers;

use App\Models\Estimasi;
use App\Models\EstimasiJasa;
use App\Models\EstimasiSparepart;
use App\Models\File;
use App\Models\Kendaraan;
use App\Models\Pelanggan;
use App\Models\Penanggung;
use App\Models\Pendaftaran;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class PendaftaranController extends Controller
{

    public function index(Request $request)
    {
        $query = Pendaftaran::with([
            'penanggung',
            'file_kerusakans',
            'file_stnks',
            'file_gesek_rangkas',
            'file_surat_pengantars',
            'file_spks',
            'file_epoxys',
            'estimasi',
            'user'
        ]);

        if ($request->filled('startDate') && $request->filled('endDate')) {
            $start = Carbon::parse($request->startDate)->startOfDay();
            $end = Carbon::parse($request->endDate)->endOfDay();
            $query->whereBetween('tanggal_pendaftaran', [$start, $end]);
        }

        if ($request->filled('searchText')) {
            $searchBy = $request->searchBy ?? 'nama';
            $searchText = $request->searchText;

            if ($searchBy === 'nama') {
                $query->where('nama', 'like', "%{$searchText}%");
            } elseif ($searchBy === 'no_pendaftaran') {
                $query->where('no_pendaftaran', 'like', "%{$searchText}%");
            } elseif ($searchBy === 'penanggung_id') {
                $query->where('penanggung_id', 'like', "%{$searchText}%");
            } elseif ($searchBy === 'no_polisi') {
                $query->where('no_polisi', 'like', "%{$searchText}%");
            } elseif ($searchBy === 'status') {
                $query->where('status', 'like', "%{$searchText}%");
            };
        }

        $sortDirection = $request->sortDirection ?? 'desc';
        $query->orderBy('tanggal_pendaftaran', $sortDirection);
        $pendaftaran = $query->paginate(25);
        $penanggung = Penanggung::all();

        return Inertia::render('Pendaftaran/Index', [
            'nama' => "Pendaftaran",
            'pendaftaran' => $pendaftaran,
            'filters' => $request->only(['startDate', 'endDate', 'sortDirection', 'searchBy', 'searchText']),
            'penanggung' => $penanggung,
        ]);
    }

    public function create()
    {
        $nextId = DB::table('pendaftaran')->max('id') + 1;
        $penanggung = Penanggung::all();
        return Inertia::render('Pendaftaran/Create', [
            'nextId' => $nextId,
            'penanggung' => $penanggung,
        ]);
    }

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
                'user' => 'required'
            ]
        );

        DB::beginTransaction();
        try {

            $pendaftaran = Pendaftaran::create([
                'no_register' => $request->no_register,
                'no_polis' => $request->no_polis,
                'km_masuk' => $request->km_masuk,
                'tanggal_pendaftaran' => $request->tanggal_pendaftaran,
                'keterangan' => $request->keterangan,
                'penanggung_id' => $request->penanggung,
                'keterangan' => $request->keterangan,
                'user_id' => $request->user,

                'nama' => $request->nama,
                'alamat' => $request->alamat,
                'no_telepon' => $request->no_telepon,

                'no_rangka' => $request->no_rangka,
                'no_polisi' => $request->no_polisi,
                'no_mesin' => $request->no_mesin,
                'tipe_id' => $request->tipe,
                'tahun' => $request->tahun,
                'jenis' => $request->jenis,
                'warna' => $request->warna,
            ]);

            $this->syncUploadedFiles($request, 'file_kerusakan', 'pendaftaran_id', $pendaftaran->id, 'K', 'kerusakan', 'kerusakan');
            $this->syncUploadedFiles($request, 'file_stnk', 'pendaftaran_id', $pendaftaran->id, 'STNK', 'stnk', 'stnk');
            $this->syncUploadedFiles($request, 'file_gesek_rangka', 'pendaftaran_id', $pendaftaran->id, 'GR', 'gesek-rangka', 'gesek_rangka');
            $this->syncUploadedFiles($request, 'file_surat_pengantar', 'pendaftaran_id', $pendaftaran->id, 'SP', 'surat-pengantar', 'surat_pengantar');

            DB::commit();
            return redirect(route('pendaftaran.show', $pendaftaran->id, absolute: false));
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['pendaftaran' => 'Gagal menyimpan data: ' . $e->getMessage()])
                ->withInput();
        }
    }

    public function show(Pendaftaran $pendaftaran)
    {
        $pendaftaran->load([
            'tipe.merk',
            'file_kerusakans',
            'file_stnks',
            'file_gesek_rangkas',
            'file_surat_pengantars',
            'file_spks',
            'file_epoxys',
            'estimasi',
            'user'
        ]);

        $penanggung = Penanggung::all();
        return Inertia::render('Pendaftaran/Show', [
            'pendaftaran' => $pendaftaran,
            'penanggung' => $penanggung,
        ]);
    }

    public function edit(Pendaftaran $pendaftaran)
    {
        $pendaftaran->load([
            'tipe.merk',
            'file_kerusakans',
            'file_stnks',
            'file_gesek_rangkas',
            'file_surat_pengantars',
            'file_spks',
            'file_epoxys',
        ]);
        $penanggung = Penanggung::all();
        return Inertia::render('Pendaftaran/Edit', [
            'pendaftaran' => $pendaftaran,
            'penanggung' => $penanggung,
        ]);
    }

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
                'user' => 'required',
                'lunas' => 'required',
            ]
        );
        if ($request->status == "batal") {
            $request->validate([
                'keterangan_pembatalan' => 'required'
            ]);
        }

        DB::beginTransaction();
        try {

            $pendaftaran->update([
                'no_register' => $request->no_register,
                'no_polis' => $request->no_polis,
                'km_masuk' => $request->km_masuk,
                'tanggal_pendaftaran' => $request->tanggal_pendaftaran,
                'keterangan' => $request->keterangan,
                'penanggung_id' => $request->penanggung,
                'status' => $request->status,
                'lunas' => $request->lunas,
                'user_id' => $request->user,
                'keterangan_pembatalan' => $request->keterangan_pembatalan,

                'nama' => $request->nama,
                'alamat' => $request->alamat,
                'no_telepon' => $request->no_telepon,

                'no_polisi' => $request->no_polisi,
                'no_mesin' => $request->no_mesin,
                'tipe_id' => $request->tipe,
                'tahun' => $request->tahun,
                'jenis' => $request->jenis,
                'warna' => $request->warna,

            ]);

            $this->syncUploadedFiles($request, 'file_kerusakan', 'pendaftaran_id', $pendaftaran->id, 'K', 'kerusakan', 'kerusakan');
            $this->syncUploadedFiles($request, 'file_stnk', 'pendaftaran_id', $pendaftaran->id, 'STNK', 'stnk', 'stnk');
            $this->syncUploadedFiles($request, 'file_gesek_rangka', 'pendaftaran_id', $pendaftaran->id, 'GR', 'gesek-rangka', 'gesek_rangka');
            $this->syncUploadedFiles($request, 'file_surat_pengantar', 'pendaftaran_id', $pendaftaran->id, 'SP', 'surat-pengantar', 'surat_pengantar');

            $this->syncUploadedFiles($request, 'file_spk', 'pendaftaran_id', $pendaftaran->id, 'SPK', 'surat-perintah-kerja', 'spk');
            $this->syncUploadedFiles($request, 'file_epoxy', 'pendaftaran_id', $pendaftaran->id, 'EP', 'epoxy', 'epoxy');

            DB::commit();
            return redirect(route('pendaftaran.index', false));
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['pendaftaran' => 'Gagal menyimpan data: ' . $e->getMessage()])
                ->withInput();
        }
    }

    private function syncUploadedFiles(Request $request, $fieldName, $foreignKey, $foreignId, $prefix, $folderName, $jenis)
    {
        $files = File::where($foreignKey, $foreignId)
            ->where('jenis', $jenis)
            ->get();

        foreach ($files as $file) {
            Storage::disk('public')->delete($file->path);
            $file->delete();
        }

        if ($request->hasFile($fieldName)) {
            foreach ($request->file($fieldName) as $file) {
                $extension = $file->getClientOriginalExtension();
                $fileName = "{$prefix}-{$request->no_pendaftaran}-" . now()->format('YmdHis') . '-' . Str::random(8) . ".{$extension}";
                $path = $file->storeAs("uploads/{$folderName}", $fileName, 'public');

                \App\Models\File::create([
                    $foreignKey => $foreignId,
                    'path' => $path,
                    'jenis' => $jenis,
                ]);
            }
        }
    }
}
