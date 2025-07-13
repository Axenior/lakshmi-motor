<?php

namespace App\Http\Controllers;

use App\Models\Merk;
use App\Models\Penanggung;
use App\Models\Sparepart;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class SparepartController extends Controller
{
    public function index(Request $request)
    {
        $merk = Merk::all();
        $query = Sparepart::query();

        if ($request->filled('selectedTipe')) {
            $query->where('tipe_id', $request->selectedTipe);
        }
        if ($request->filled('searchText')) {
            $searchText = $request->searchText;
            $query->where('nama', 'like', "%{$searchText}%");
        }
        $sparepart = $query->paginate(25)->withQueryString();

        return Inertia::render('Sparepart/Index', [
            'sparepart' => $sparepart,
            'merk' => $merk,
            'selectedMerk' => $request->merk,
            'selectedTipe' => $request->tipe,
        ]);
    }


    public function create()
    {
        $merk = Merk::all();
        return Inertia::render('Sparepart/Create', ['merk' => $merk]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'kode' => 'required|string|unique:sparepart,kode',
            'nama' => 'required|string',
            'satuan' => 'required',
            'harga' => 'required|numeric',
            'merk' => 'required',
            'tipe' => [
                'required',
                'integer',
                Rule::exists('tipe', 'id')->where(function ($query) use ($request) {
                    $query->where('merk_id', $request->merk);
                }),
            ],
        ]);

        DB::beginTransaction();
        try {
            Sparepart::create([
                'kode' => $request->kode,
                'nama' => $request->nama,
                'satuan' => $request->satuan,
                'harga' => $request->harga,
                'tipe_id' => $request->tipe,
            ]);

            DB::commit();
            return redirect(route('sparepart.create'))
                ->with('success', 'Data berhasil disimpan!');
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()
                ->withErrors(['sparepart' => 'Gagal menyimpan data: ' . $e->getMessage()])
                ->withInput();
        }
    }

    public function show(Sparepart $sparepart)
    {
        $merk = Merk::all();
        return Inertia::render('Sparepart/Show', [
            'sparepart' => $sparepart->load('tipe.merk'),
            'merk' => $merk
        ]);
    }

    public function edit(Sparepart $sparepart)
    {
        $merk = Merk::all();
        return Inertia::render('Sparepart/Edit', [
            'sparepart' => $sparepart->load('tipe.merk'),
            'merk' => $merk
        ]);
    }

    public function update(Request $request, Sparepart $sparepart)
    {

        $request->validate([
            'kode' => 'required|string|unique:sparepart,kode,' . $sparepart->id,
            'nama' => 'required|string',
            'satuan' => 'required',
            'harga' => 'required|numeric',
            'merk' => 'required',
            'tipe' => [
                'required',
                'integer',
                Rule::exists('tipe', 'id')->where(function ($query) use ($request) {
                    $query->where('merk_id', $request->merk);
                }),
            ],
        ]);

        DB::beginTransaction();
        try {
            $sparepart->update([
                'kode' => $request->kode,
                'nama' => $request->nama,
                'satuan' => $request->satuan,
                'harga' => $request->harga,
                'tipe_id' => $request->tipe,
            ]);

            DB::commit();
            return redirect(route('sparepart.index'))
                ->with('success', 'Data berhasil disimpan!');
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()
                ->withErrors(['sparepart' => 'Gagal menyimpan data: ' . $e->getMessage()])
                ->withInput();
        }
    }

    public function destroy(Sparepart $sparepart)
    {
        DB::beginTransaction();
        try {
            $sparepart->delete();

            DB::commit();
            return redirect(route('sparepart.index'));
        } catch (\Exception $e) {
            DB::rollBack();
            if ($e->getCode() == '23000') {
                $errorMessage = 'Data tidak dapat dihapus karena telah digunakan.';
            } else {
                $errorMessage = 'Terjadi kesalahan saat menghapus data.';
            }

            return redirect(route('penanggung.show', $sparepart->id))
                ->withErrors(['error' => $errorMessage])
                ->withInput();
        }
    }
}
