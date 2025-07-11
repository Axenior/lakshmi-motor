<?php

namespace App\Http\Controllers;

use App\Models\Penanggung;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PenanggungController extends Controller
{
    public function index()
    {
        $penanggung = Penanggung::paginate(25);
        return Inertia::render('Penanggung/Index', [
            'penanggung' => $penanggung
        ]);
    }

    public function create()
    {
        return Inertia::render('Penanggung/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama' => 'required|string|max:100|unique:penanggung,nama',
            'no_telepon' => 'nullable|unique:penanggung,no_telepon',
            'no_fax' => 'nullable|unique:penanggung,no_fax',
            'alamat' => 'nullable|max:255',
        ]);

        DB::beginTransaction();
        try {
            $penanggung = Penanggung::create([
                'nama' => $request->nama,
                'alamat' => $request->alamat,
                'no_telepon' => $request->no_telepon,
                'no_fax' => $request->no_fax,
            ]);

            DB::commit();
            return redirect(route('penanggung.index', absolute: false));
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['penanggung' => 'Gagal menyimpan data: ' . $e->getMessage()])
                ->withInput();
        }
    }

    public function show(Penanggung $penanggung)
    {
        return Inertia::render('Penanggung/Show', [
            'penanggung' => $penanggung
        ]);
    }

    public function edit(Penanggung $penanggung)
    {
        return Inertia::render('Penanggung/Edit', [
            'penanggung' => $penanggung
        ]);
    }

    public function update(Request $request, Penanggung $penanggung)
    {
        $request->validate([
            'nama' => 'required|string|max:100|unique:penanggung,nama,' . $penanggung->id,
            'no_telepon' => 'nullable|unique:penanggung,no_telepon,' . $penanggung->id,
            'no_fax' => 'nullable|unique:penanggung,no_fax,' . $penanggung->id,
            'alamat' => 'nullable|max:255',
        ]);

        DB::beginTransaction();
        try {
            $penanggung->update([
                'nama' => $request->nama,
                'alamat' => $request->alamat,
                'no_telepon' => $request->no_telepon,
                'no_fax' => $request->no_fax,
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
