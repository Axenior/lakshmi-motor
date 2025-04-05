<?php

namespace App\Http\Controllers;

use App\Models\Merk;
use App\Models\Penanggung;
use App\Models\Sparepart;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class SparepartController extends Controller
{
    public function index()
    {
        $sparepart = Sparepart::get();
        return Inertia::render('Sparepart/Index', [
            'sparepart' => $sparepart
        ]);
    }

    public function create()
    {
        $merk = Merk::get();
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
            'tipe' => 'required'
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
                ->withErrors(['merk' => 'Gagal menyimpan data: ' . $e->getMessage()])
                ->withInput();
        }
    }

    public function show(Sparepart $sparepart) {}

    public function edit(Sparepart $sparepart) {}

    public function update(Request $request, Sparepart $sparepart) {}

    public function destroy(Sparepart $sparepart) {}
}
