<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    // if (auth()->guard()->user()) {
    //     // dd(auth()->guard()->user());
    //     return redirect()->route('dashboard');
    // }
    return Inertia::render('Welcome', [
        // 'canLogin' => Route::has('login'),
        // 'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
require __DIR__ . '/pendaftaran.php';
require __DIR__ . '/penanggung.php';
require __DIR__ . '/kendaraan.php';
require __DIR__ . '/pelanggan.php';
require __DIR__ . '/sparepart.php';
require __DIR__ . '/jasa.php';
require __DIR__ . '/estimasi.php';
