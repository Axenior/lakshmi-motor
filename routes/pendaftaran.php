<?php

use App\Http\Controllers\PendaftaranController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('auth')->group(function () {
  Route::get('/pendaftaran', [PendaftaranController::class, 'index'])->name('pendaftaran.index');
  Route::get('/pendaftaran/create', [PendaftaranController::class, 'create'])->name('pendaftaran.create');
  Route::post('/pendaftaran', [PendaftaranController::class, 'store'])->name('pendaftaran.store');
  Route::get('/pendaftaran/{pendaftaran}', [PendaftaranController::class, 'show'])->name('pendaftaran.show');
  Route::get('/pendaftaran/edit/{pendaftaran}', [PendaftaranController::class, 'edit'])->name('pendaftaran.edit');
  Route::post('/pendaftaran/{pendaftaran}', [PendaftaranController::class, 'update'])->name('pendaftaran.update');
});
