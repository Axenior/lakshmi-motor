<?php

namespace App\Http\Controllers;

use App\Models\Jasa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class JasaController extends Controller
{
  public function index(Request $request)
  {
    $query = Jasa::query();
    if ($request->filled('searchText')) {
      $searchText = $request->searchText;
      $query->where('nama', 'like', "%{$searchText}%");
    }

    $jasa = $query->paginate(25)->withQueryString();

    return Inertia::render('Jasa/Index', [
      'jasa' => $jasa,
    ]);
  }


  public function create()
  {
    return Inertia::render('Jasa/Create');
  }

  public function store(Request $request)
  {
    $request->validate([
      'nama' => 'required|string',
      'harga' => 'required|numeric',
    ]);

    DB::beginTransaction();
    try {
      Jasa::create([
        'nama' => $request->nama,
        'harga' => $request->harga,
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
    return Inertia::render('Jasa/Show', [
      'jasa' => $jasa,
    ]);
  }

  public function edit(Jasa $jasa)
  {
    return Inertia::render('Jasa/Edit', [
      'jasa' => $jasa,
    ]);
  }

  public function update(Request $request, Jasa $jasa)
  {

    $request->validate([
      'nama' => 'required|string',
      'harga' => 'required|numeric',
    ]);

    DB::beginTransaction();
    try {
      $jasa->update([
        'nama' => $request->nama,
        'harga' => $request->harga,
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
