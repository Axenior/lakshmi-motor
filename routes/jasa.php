<?php

use App\Http\Controllers\JasaController;
use App\Http\Middleware\Auth;
use App\Http\Middleware\CheckAdmin;
use Illuminate\Support\Facades\Route;

Route::middleware([Auth::class])->group(function () {
  Route::middleware([CheckAdmin::class])->group(function () {
    Route::get('/jasa/create', [JasaController::class, 'create'])->name('jasa.create');
    Route::post('/jasa', [JasaController::class, 'store'])->name('jasa.store');
    Route::get('/jasa/edit/{jasa}', [JasaController::class, 'edit'])->name('jasa.edit');
    Route::put('/jasa/edit/{jasa}', [JasaController::class, 'update'])->name('jasa.update');
    Route::delete('/jasa/{jasa}', [JasaController::class, 'destroy'])->name('jasa.destroy');
  });
  Route::get('/jasa', [JasaController::class, 'index'])->name('jasa.index');
  Route::get('/jasa/{jasa}', [JasaController::class, 'show'])->name('jasa.show');
});
