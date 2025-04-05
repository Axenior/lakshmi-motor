<?php

use App\Http\Controllers\PendaftaranController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('auth')->group(function () {
  Route::get('/pendaftaran', [PendaftaranController::class, 'index'])->name('pendaftaran.index');
  Route::get('/pendaftaran/create', [PendaftaranController::class, 'create'])->name('pendaftaran.create');
  Route::post('/pendaftaran', [PendaftaranController::class, 'store'])->name('pendaftaran.store');
  Route::get('/pendaftaran/{pendaftaran}', [PendaftaranController::class, 'show'])->name('pendaftaran.show');
  Route::post('/pendaftaran/{pendaftaran}', [PendaftaranController::class, 'update'])->name('pendaftaran.update');
});

// Route::get('/dashboard', function () {
//   return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');
