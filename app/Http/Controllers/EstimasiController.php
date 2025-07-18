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
      'penanggung',
      'tipe.merk',
      'estimasi.estimasiJasas',
      'estimasi.estimasiSpareparts',
    ]);

    $sparepart = Sparepart::where('tipe_id', $pendaftaran->tipe_id)->get();
    $jasa = Jasa::get();

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
      'jasa' => 'required|array',
      'jasa.*.id' => 'required|exists:jasa,id',
      'jasa.*.jumlah' => 'required|integer|min:1',
      'jasa.*.diskon' => 'nullable|integer|min:0',
      'sparepart.*.id' => 'required|exists:sparepart,id',
      'sparepart.*.jumlah' => 'required|integer|min:1',
      'sparepart.*.diskon' => 'nullable|integer|min:0',
    ]);

    DB::beginTransaction();
    try {
      $estimasi = Estimasi::where('pendaftaran_id', $pendaftaranId)->first();

      if ($estimasi) {
        $estimasi->update([
          'nilai_or' => $request->nilai_or,
          'diskon_jasa' => $request->diskon_jasa,
          'diskon_sparepart' => $request->diskon_sparepart,
        ]);
        EstimasiJasa::where('estimasi_id', $estimasi->id)->delete();
        EstimasiSparepart::where('estimasi_id', $estimasi->id)->delete();
      } else {
        $estimasi = Estimasi::create([
          'pendaftaran_id' => $pendaftaranId,
          'nilai_or' => $request->nilai_or,
          'diskon_jasa' => $request->diskon_jasa,
          'diskon_sparepart' => $request->diskon_sparepart,
        ]);
      }

      foreach ($request->jasa as $jasaItem) {
        EstimasiJasa::create([
          'estimasi_id' => $estimasi->id,
          'jasa_id' => $jasaItem['id'],
          'jumlah' => $jasaItem['jumlah'],
          'diskon' => $jasaItem['diskon'] ?? 0,
        ]);
      }

      foreach ($request->sparepart as $sparepartItem) {
        EstimasiSparepart::create([
          'estimasi_id' => $estimasi->id,
          'sparepart_id' => $sparepartItem['id'],
          'jumlah' => $sparepartItem['jumlah'],
          'diskon' => $sparepartItem['diskon'] ?? 0,
        ]);
      }

      $pendaftaran = Pendaftaran::find($pendaftaranId);

      if ($pendaftaran) {
        if ($pendaftaran->status == "pendaftaran") {
          $pendaftaran->status = "estimasi";
          $pendaftaran->save();
        }
      }


      DB::commit();

      return redirect(route('estimasi.create', $pendaftaranId));
    } catch (\Exception $e) {
      DB::rollBack();
      return redirect()->back()->withErrors([
        'error' => 'Terjadi kesalahan saat menyimpan estimasi: ' . $e->getMessage(),
      ]);
    }
  }

  public function invoice(Pendaftaran $pendaftaran, Request $request)
  {
    $pendaftaran->load([
      'penanggung',
      'tipe.merk',
      'estimasi.estimasiJasas.jasa',
      'estimasi.estimasiSpareparts.sparepart',
    ]);

    $sparepart = Sparepart::where('tipe_id', $pendaftaran->tipe_id)->get();
    $jasa = Jasa::get();

    return Inertia::render(
      'Estimasi/Preview',
      [
        'pendaftaran' => $pendaftaran,
        'sparepart' => $sparepart,
        'jasa' => $jasa
      ]
    );
  }
}
