<?php

namespace App\Http\Controllers;

use App\Models\Kendaraan;
use App\Models\Merk;
use App\Models\Tipe;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class KendaraanController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function indexMerk()
    {
        $merk = Merk::paginate(25);
        return Inertia::render(
            'Kendaraan/Merk/Index',
            [
                'merk' => $merk,
            ]
        );
    }

    public function indexTipe()
    {
        $tipe = Tipe::with('merk')->paginate(25);
        return Inertia::render(
            'Kendaraan/Tipe/Index',
            [
                'tipe' => $tipe
            ]
        );
    }

    public function createMerk()
    {
        return Inertia::render('Kendaraan/Merk/Create');
    }

    public function createTipe()
    {
        $merk = Merk::get();
        return Inertia::render(
            'Kendaraan/Tipe/Create',
            [
                'merk' => $merk
            ]
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function storeMerk(Request $request)
    {
        $request->validate([
            'merk' => 'required|string|unique:merk,nama',
        ]);

        DB::beginTransaction();
        try {
            Merk::create([
                'nama' => $request->merk
            ]);

            DB::commit();
            return redirect(route('kendaraan.merk.index'))
                ->with('success', 'Data berhasil disimpan!');
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()
                ->withErrors(['merk' => 'Gagal menyimpan data: ' . $e->getMessage()])
                ->withInput();
        }
    }


    public function storeTipe(Request $request)
    {
        $request->validate([
            'merk' => 'required|integer|exists:merk,id', // Memastikan merk ada di tabel merks
            'tipe' => 'required|string|unique:tipe,nama,NULL,id,merk_id,' . $request->merk, // Validasi tipe tidak duplikat dengan merk_id
        ]);

        DB::beginTransaction();
        try {
            Tipe::create([
                'merk_id' => $request->merk,
                'nama' => $request->tipe
            ]);

            DB::commit();
            return redirect(route('kendaraan.tipe.index'))
                ->with('success', 'Data berhasil disimpan!');
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()
                ->withErrors(['error' => 'Gagal menyimpan data: ' . $e->getMessage()])
                ->withInput();
        }
    }

    /**
     * Display the specified resource.
     */
    public function showMerk(Merk $merk)
    {
        return Inertia::render('Kendaraan/Merk/Show', [
            'merk' => $merk,
        ]);
    }

    public function showTipe(Tipe $tipe)
    {
        $merk = Merk::get();
        return Inertia::render('Kendaraan/Tipe/Show', [
            'merk' => $merk,
            'tipe' => $tipe,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function editMerk(Merk $merk)
    {
        return Inertia::render('Kendaraan/Merk/Edit', [
            'merk' => $merk,
        ]);
    }

    public function editTipe(Tipe $tipe)
    {
        $merk = Merk::get();
        return Inertia::render('Kendaraan/Tipe/Edit', [
            'merk' => $merk,
            'tipe' => $tipe,
        ]);
    }
    /**
     * Update the specified resource in storage.
     */
    public function updateMerk(Request $request, Merk $merk)
    {
        $request->validate([
            'merk' => 'required|string|max:255|unique:merk,nama,' . $merk->id,
        ]);

        DB::beginTransaction();
        try {
            $merk->update([
                'nama' => $request->merk
            ]);

            DB::commit();
            return redirect(route('kendaraan.merk.index'));
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['merk' => 'Gagal menyimpan data: ' . $e->getMessage()])
                ->withInput();
        }
    }

    public function updateTipe(Request $request, Tipe $tipe)
    {
        $request->validate([
            'merk' => 'required|integer|exists:merk,id',
            'tipe' => 'required|string|max:255|unique:tipe,nama,' . $tipe->id,
        ]);

        DB::beginTransaction();
        try {
            $tipe->update([
                'merk_id' => $request->merk,
                'nama' => $request->tipe
            ]);

            DB::commit();
            return redirect()->route('kendaraan.tipe.index')
                ->with('success', 'Data berhasil diperbarui.');
        } catch (\Illuminate\Database\QueryException $e) {
            DB::rollBack();

            return back()->withErrors(['merk' => 'Gagal menyimpan data: ' . $e->getMessage()])
                ->withInput();
        }
    }

    public function destroyMerk(Merk $merk)
    {
        DB::beginTransaction();
        try {
            // $merk->tipes()->delete();
            $merk->delete();

            DB::commit();
            return redirect(route('kendaraan.merk.index'));
        } catch (\Exception $e) {
            DB::rollBack();

            if ($e->getCode() == '23000') {
                // Error karena foreign key
                $errorMessage = 'Data tidak dapat dihapus karena telah digunakan.';
            } else {
                $errorMessage = 'Terjadi kesalahan saat menghapus data.';
            }

            return redirect(route('kendaraan.merk.show', $merk->id))
                ->withErrors(['error' => $errorMessage])
                ->withInput();
        }
    }

    public function destroyTipe(Tipe $tipe)
    {
        DB::beginTransaction();
        try {
            $tipe->delete();

            DB::commit();
            return redirect(route('kendaraan.tipe.index'));
        } catch (\Exception $e) {
            DB::rollBack();

            if ($e->getCode() == '23000') {
                // Error karena foreign key
                $errorMessage = 'Data tidak dapat dihapus karena telah digunakan.';
            } else {
                $errorMessage = 'Terjadi kesalahan saat menghapus data.';
            }

            return redirect(route('kendaraan.tipe.show', $tipe->id))
                ->withErrors(['error' => $errorMessage])
                ->withInput();
        }
    }
}
