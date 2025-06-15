<?php

use App\Http\Controllers\UserController;
use App\Http\Middleware\Auth;
use App\Http\Middleware\CheckAdmin;
use Illuminate\Support\Facades\Route;

Route::middleware([Auth::class, CheckAdmin::class])->group(function () {
  Route::get('/user', [UserController::class, 'index'])->name('user.index');
  Route::get('/user/create', [UserController::class, 'create'])->name('user.create');
  Route::post('/user', [UserController::class, 'store'])->name('user.store');
  Route::get('/user/{user}', [UserController::class, 'show'])->name('user.show');
  Route::get('/user/edit/{user}', [UserController::class, 'edit'])->name('user.edit');
  Route::put('/user/edit/{user}', [UserController::class, 'update'])->name('user.update');
});
