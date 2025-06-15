<?php

use App\Http\Controllers\EstimasiController;
use App\Http\Middleware\Auth;
use Illuminate\Support\Facades\Route;

Route::middleware(Auth::class)->group(function () {
  Route::get('/estimasi/{pendaftaran}', [EstimasiController::class, 'create'])->name('estimasi.create');
  Route::post('/estimasi/{pendaftaran}', [EstimasiController::class, 'store'])->name('estimasi.store');
  Route::get('/estimasi/invoice/{pendaftaran}', [EstimasiController::class, 'invoice'])->name('estimasi.invoice.show');
});
