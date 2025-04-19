<?php

namespace App\Http\Controllers;

use App\Models\Jasa;
use App\Models\Merk;
use App\Models\Penanggung;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class JasaController extends Controller
{
  public function index(Request $request)
  {
    $penanggung = Penanggung::all();
    $query = Jasa::query()->with('penanggung');

    if ($request->has('penanggung')) {
      $query->where('penanggung_id', $request->penanggung);
    }

    $jasa = $query->paginate(25)->withQueryString();

    return Inertia::render('Jasa/Index', [
      'jasa' => $jasa,
      'penanggung' => $penanggung,
      'selectedPenanggung' => $request->penanggung,
    ]);
  }


  public function create()
  {
    $penanggung = Penanggung::all();
    return Inertia::render('Jasa/Create', ['penanggung' => $penanggung]);
  }

  public function store(Request $request)
  {
    $request->validate([
      'nama' => 'required|string',
      'harga' => 'required|numeric',
      'penanggung' => "required"
    ]);

    DB::beginTransaction();
    try {
      Jasa::create([
        'nama' => $request->nama,
        'harga' => $request->harga,
        'penanggung_id' => $request->penanggung,
      ]);

      DB::commit();
      return redirect(route('jasa.create'))
        ->with('success', 'Data berhasil disimpan!');
    } catch (\Exception $e) {
      DB::rollBack();
      return redirect()->back()
        ->withErrors(['jasa' => 'Gagal menyimpan data: ' . $e->getMessage()])
        ->withInput();
    }
  }

  public function show(Jasa $jasa)
  {
    $penanggung = Penanggung::all();
    return Inertia::render('Jasa/Show', [
      'jasa' => $jasa,
      'penanggung' => $penanggung
    ]);
  }

  public function edit(Jasa $jasa)
  {
    $penanggung = Penanggung::all();
    return Inertia::render('Jasa/Edit', [
      'jasa' => $jasa,
      'penanggung' => $penanggung
    ]);
  }

  public function update(Request $request, Jasa $jasa)
  {

    $request->validate([
      'nama' => 'required|string',
      'harga' => 'required|numeric',
      'penanggung' => [
        'required',
        'integer',
        Rule::exists('penanggung', 'id')->where(function ($query) use ($request) {
          $query->where('id', $request->penanggung);
        }),
      ],
    ]);

    DB::beginTransaction();
    try {
      $jasa->update([
        'nama' => $request->nama,
        'harga' => $request->harga,
        'penanggung_id' => $request->penanggung,
      ]);

      DB::commit();
      return redirect(route('jasa.index'))
        ->with('success', 'Data berhasil disimpan!');
    } catch (\Exception $e) {
      DB::rollBack();
      return redirect()->back()
        ->withErrors(['jasa' => 'Gagal menyimpan data: ' . $e->getMessage()])
        ->withInput();
    }
  }

  public function destroy(Jasa $jasa)
  {
    DB::beginTransaction();
    try {
      $jasa->delete();

      DB::commit();
      return redirect(route('jasa.index'));
    } catch (\Exception $e) {
      DB::rollBack();
      if ($e->getCode() == '23000') {
        // Error karena foreign key
        $errorMessage = 'Data tidak dapat dihapus karena telah digunakan.';
      } else {
        $errorMessage = 'Terjadi kesalahan saat menghapus data.';
      }

      return redirect(route('penanggung.show', $jasa->id))
        ->withErrors(['error' => $errorMessage])
        ->withInput();
    }
  }
}
