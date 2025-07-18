<?php

use App\Http\Controllers\KendaraanController;
use App\Http\Middleware\Auth;
use App\Http\Middleware\CheckAdmin;
use App\Models\Kendaraan;
use App\Models\Merk;
use Illuminate\Support\Facades\Route;

Route::middleware(Auth::class)->group(function () {
  Route::get('api/merk', function () {
    $merk = Merk::get();
    return response()->json($merk);
  })->name('api.merk');

  Route::get('api/tipe/{merk}', function (Merk $merk) {
    $tipe = $merk->tipes()->get();
    return response()->json($tipe);
  })->name('api.tipe');

  Route::middleware([CheckAdmin::class])->group(function () {
    Route::get('/kendaraan/merk/create', [KendaraanController::class, 'createMerk'])->name('kendaraan.merk.create');
    Route::get('/kendaraan/tipe/create', [KendaraanController::class, 'createTipe'])->name('kendaraan.tipe.create');
    Route::post('/kendaraan/merk/store', [KendaraanController::class, 'storeMerk'])->name('kendaraan.merk.store');
    Route::post('/kendaraan/tipe/store', [KendaraanController::class, 'storeTipe'])->name('kendaraan.tipe.store');
    Route::get('/kendaraan/merk/edit/{merk}', [KendaraanController::class, 'editMerk'])->name('kendaraan.merk.edit');
    Route::get('/kendaraan/tipe/edit/{tipe}', [KendaraanController::class, 'editTipe'])->name('kendaraan.tipe.edit');
    Route::put('/kendaraan/merk/{merk}', [KendaraanController::class, 'updateMerk'])->name('kendaraan.merk.update');
    Route::put('/kendaraan/tipe/{tipe}', [KendaraanController::class, 'updateTipe'])->name('kendaraan.tipe.update');
    Route::delete('/kendaraan/merk/{merk}', [KendaraanController::class, 'destroyMerk'])->name('kendaraan.merk.destroy');
    Route::delete('/kendaraan/tipe/{tipe}', [KendaraanController::class, 'destroyTipe'])->name('kendaraan.tipe.destroy');
  });

  Route::get('/kendaraan/merk', [KendaraanController::class, 'indexMerk'])->name('kendaraan.merk.index');
  Route::get('/kendaraan/tipe', [KendaraanController::class, 'indexTipe'])->name('kendaraan.tipe.index');
  Route::get('/kendaraan/merk/{merk}', [KendaraanController::class, 'showMerk'])->name('kendaraan.merk.show');
  Route::get('/kendaraan/tipe/{tipe}', [KendaraanController::class, 'showTipe'])->name('kendaraan.tipe.show');
});
