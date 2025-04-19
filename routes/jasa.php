<?php

use App\Http\Controllers\JasaController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
  Route::get('/jasa', [JasaController::class, 'index'])->name('jasa.index');
  Route::get('/jasa/create', [JasaController::class, 'create'])->name('jasa.create');
  Route::post('/jasa', [JasaController::class, 'store'])->name('jasa.store');
  Route::get('/jasa/{jasa}', [JasaController::class, 'show'])->name('jasa.show');
  Route::get('/jasa/edit/{jasa}', [JasaController::class, 'edit'])->name('jasa.edit');
  Route::put('/jasa/edit/{jasa}', [JasaController::class, 'update'])->name('jasa.update');
  Route::delete('/jasa/{jasa}', [JasaController::class, 'destroy'])->name('jasa.destroy');
});
