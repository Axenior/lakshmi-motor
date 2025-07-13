<?php

use App\Http\Controllers\SparepartController;
use App\Http\Middleware\Auth;
use App\Http\Middleware\CheckAdmin;
use Illuminate\Support\Facades\Route;

Route::middleware(Auth::class)->group(function () {
  Route::middleware([CheckAdmin::class])->group(function () {
    Route::post('/sparepart', [SparepartController::class, 'store'])->name('sparepart.store');
    Route::get('/sparepart/create', [SparepartController::class, 'create'])->name('sparepart.create');
    Route::get('/sparepart/edit/{sparepart}', [SparepartController::class, 'edit'])->name('sparepart.edit');
    Route::put('/sparepart/edit/{sparepart}', [SparepartController::class, 'update'])->name('sparepart.update');
    Route::delete('/sparepart/{sparepart}', [SparepartController::class, 'destroy'])->name('sparepart.destroy');
  });
  Route::get('/sparepart', [SparepartController::class, 'index'])->name('sparepart.index');
  Route::get('/sparepart/{sparepart}', [SparepartController::class, 'show'])->name('sparepart.show');
});
