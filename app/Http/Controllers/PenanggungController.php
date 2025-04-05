<?php

namespace App\Http\Controllers;

use App\Models\Penanggung;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PenanggungController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $penanggung = Penanggung::paginate(25);
        return Inertia::render('Penanggung/Index', [
            'penanggung' => $penanggung
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Penanggung/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nama' => 'required|string|max:100|unique:penanggung,nama',
            'no_telepon' => 'nullable|unique:penanggung,no_telepon',
            'no_fax' => 'nullable|unique:penanggung,no_fax',
            'alamat' => 'nullable|max:255',
            'pph' => 'required|integer',
            'ppn' => 'required|integer',
        ]);

        DB::beginTransaction();
        try {
            // Simpan data pendaftaran
            $penanggung = Penanggung::create([
                'nama' => $request->nama,
                'alamat' => $request->alamat,
                'no_telepon' => $request->no_telepon,
                'no_fax' => $request->no_fax,
                'pph' => $request->pph,
                'ppn' => $request->ppn,

            ]);

            DB::commit();
            return redirect(route('penanggung.index', absolute: false));
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['penanggung' => 'Gagal menyimpan data: ' . $e->getMessage()])
                ->withInput();
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Penanggung $penanggung)
    {
        // dd($penanggung);
        return Inertia::render('Penanggung/Show', [
            'penanggung' => $penanggung
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Penanggung $penanggung)
    {
        return Inertia::render('Penanggung/Edit', [
            'penanggung' => $penanggung
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Penanggung $penanggung)
    {
        $request->validate([
            'nama' => 'required|string|max:100|unique:penanggung,nama,' . $penanggung->id,
            'no_telepon' => 'nullable|unique:penanggung,no_telepon,' . $penanggung->id,
            'no_fax' => 'nullable|unique:penanggung,no_fax,' . $penanggung->id,
            'alamat' => 'nullable|max:255',
            'pph' => 'required|integer|max:100',
            'ppn' => 'required|integer|max:100',
        ]);

        DB::beginTransaction();
        try {
            // Perbarui data penanggung
            $penanggung->update([
                'nama' => $request->nama,
                'alamat' => $request->alamat,
                'no_telepon' => $request->no_telepon,
                'no_fax' => $request->no_fax,
                'pph' => $request->pph,
                'ppn' => $request->ppn,
            ]);

            DB::commit();
            return redirect(route('penanggung.index', absolute: false))
                ->with('success', 'Data berhasil diperbarui');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['penanggung' => 'Gagal menyimpan data: ' . $e->getMessage()])
                ->withInput();
        }
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Penanggung $penanggung)
    {
        DB::beginTransaction();
        try {
            $penanggung->delete();

            DB::commit();
            return redirect(route('penanggung.index'));
        } catch (\Exception $e) {
            DB::rollBack();
            if ($e->getCode() == '23000') {
                // Error karena foreign key
                $errorMessage = 'Data tidak dapat dihapus karena telah digunakan.';
            } else {
                $errorMessage = 'Terjadi kesalahan saat menghapus data.';
            }

            return redirect(route('penanggung.show', $penanggung->id))
                ->withErrors(['error' => $errorMessage])
                ->withInput();
        }
    }
}
