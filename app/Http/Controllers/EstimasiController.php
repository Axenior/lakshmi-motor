<?php

namespace App\Http\Controllers;

use App\Models\Estimasi;
use App\Models\EstimasiJasa;
use App\Models\EstimasiSparepart;
use App\Models\Jasa;
use App\Models\Penanggung;
use App\Models\Pendaftaran;
use App\Models\Sparepart;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class EstimasiController extends Controller
{
  public function create(Pendaftaran $pendaftaran, Request $request)
  {
    $pendaftaran->load([
      'pelanggan',
      'penanggung',
      'kendaraan.tipe.merk',
      'estimasi.estimasiJasas',
      'estimasi.estimasiSpareparts',
      // 'estimasi.spareparts',
    ]);

    $sparepart = Sparepart::where('tipe_id', $pendaftaran->kendaraan->tipe_id)->get();
    $jasa = Jasa::where('penanggung_id', $pendaftaran->penanggung_id)->get();

    // dd($pendaftaran);
    return Inertia::render(
      'Estimasi/Create',
      [
        'pendaftaran' => $pendaftaran,
        'sparepart' => $sparepart,
        'jasa' => $jasa
      ]
    );
  }

  public function store(Request $request, $pendaftaranId)
  {
    $request->validate([
      // 'jasa' => 'required|array',
      // 'sparepart' => 'required|array',
      'jasa.*.id' => 'required|exists:jasa,id',
      'jasa.*.jumlah' => 'required|integer|min:1',
      'jasa.*.diskon' => 'nullable|integer|min:0',
      'sparepart.*.id' => 'required|exists:sparepart,id',
      'sparepart.*.jumlah' => 'required|integer|min:1',
      'sparepart.*.diskon' => 'nullable|integer|min:0',
    ]);

    DB::beginTransaction();
    try {
      // Cari estimasi berdasarkan pendaftaran_id
      $estimasi = Estimasi::where('pendaftaran_id', $pendaftaranId)->first();

      if ($estimasi) {
        // Jika sudah ada, hapus jasa & sparepart yang terkait
        $estimasi->update([
          'nilai_or' => $request->nilai_or,
          'diskon_jasa' => $request->diskon_jasa,
          'diskon_sparepart' => $request->diskon_sparepart,
        ]);
        EstimasiJasa::where('estimasi_id', $estimasi->id)->delete();
        EstimasiSparepart::where('estimasi_id', $estimasi->id)->delete();
      } else {
        // Jika belum ada, buat estimasi baru
        $estimasi = Estimasi::create([
          'pendaftaran_id' => $pendaftaranId,
          'nilai_or' => $request->nilai_or,
          'diskon_jasa' => $request->diskon_jasa,
          'diskon_sparepart' => $request->diskon_sparepart,
        ]);
      }

      // Simpan data jasa
      foreach ($request->jasa as $jasaItem) {
        EstimasiJasa::create([
          'estimasi_id' => $estimasi->id,
          'jasa_id' => $jasaItem['id'],
          'jumlah' => $jasaItem['jumlah'],
          'diskon' => $jasaItem['diskon'] ?? 0,
        ]);
      }

      // Simpan data sparepart
      foreach ($request->sparepart as $sparepartItem) {
        EstimasiSparepart::create([
          'estimasi_id' => $estimasi->id,
          'sparepart_id' => $sparepartItem['id'],
          'jumlah' => $sparepartItem['jumlah'],
          'diskon' => $sparepartItem['diskon'] ?? 0,
        ]);
      }

      DB::commit();

      return redirect()->back()->with('success', 'Estimasi berhasil disimpan.');
    } catch (\Exception $e) {
      DB::rollBack();
      return redirect()->back()->withErrors([
        'error' => 'Terjadi kesalahan saat menyimpan estimasi: ' . $e->getMessage(),
        // 'trace' => $e->getTraceAsString(), // opsional
      ]);
    }
  }

  public function show(Pendaftaran $pendaftaran, Request $request)
  {
    $pendaftaran->load([
      'pelanggan',
      'penanggung',
      'kendaraan.tipe.merk',
      'estimasi.estimasiJasas',
      'estimasi.estimasiSpareparts',
      // 'estimasi.spareparts',
    ]);

    $sparepart = Sparepart::where('tipe_id', $pendaftaran->kendaraan->tipe_id)->get();
    $jasa = Jasa::where('penanggung_id', $pendaftaran->penanggung_id)->get();

    // dd($pendaftaran);
    return Inertia::render(
      'Estimasi/Index',
      [
        'pendaftaran' => $pendaftaran,
        'sparepart' => $sparepart,
        'jasa' => $jasa
      ]
    );
  }
}
