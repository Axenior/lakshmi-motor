<?php

use App\Http\Middleware\Auth;
use App\Models\Pelanggan;
use Illuminate\Support\Facades\Route;

Route::middleware(Auth::class)->group(function () {
  Route::get('api/pelanggan/{no_telepon}', function ($no_telepon) {
    $no_telepon = urldecode($no_telepon);

    // Query pelanggan berdasarkan no_telepon tanpa menghiraukan spasi
    $pelanggan = Pelanggan::whereRaw("REPLACE(no_telepon, ' ', '') = ?", [str_replace(' ', '', $no_telepon)])->first();

    return response()->json($pelanggan);
  })->name('api.pelanggan.no_telepon');
});
