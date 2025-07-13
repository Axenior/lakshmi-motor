<?php

use App\Http\Controllers\PenanggungController;
use App\Http\Middleware\Auth;
use App\Http\Middleware\CheckAdmin;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(Auth::class)->group(function () {
  Route::middleware([CheckAdmin::class])->group(function () {
    Route::post('/penanggung', [PenanggungController::class, 'store'])->name('penanggung.store');
    Route::get('/penanggung/create', [PenanggungController::class, 'create'])->name('penanggung.create');
    Route::get('/penanggung/edit/{penanggung}', [PenanggungController::class, 'edit'])->name('penanggung.edit');
    Route::put('/penanggung/edit/{penanggung}', [PenanggungController::class, 'update'])->name('penanggung.update');
    Route::delete('/penanggung/{penanggung}', [PenanggungController::class, 'destroy'])->name('penanggung.destroy');
    Route::delete('/penanggung/{penanggung}', [PenanggungController::class, 'destroy'])->name('penanggung.destroy');
  });

  Route::get('/penanggung', [PenanggungController::class, 'index'])->name('penanggung.index');
  Route::get('/penanggung/{penanggung}', [PenanggungController::class, 'show'])->name('penanggung.show');
});
