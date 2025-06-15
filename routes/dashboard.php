<?php

use App\Http\Controllers\DashboardController;
use App\Http\Middleware\Auth;
use Illuminate\Support\Facades\Route;

Route::middleware(Auth::class)->group(function () {
  Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
});
