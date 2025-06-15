<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class UserController extends Controller
{
  public function index(Request $request)
  {
    $user = User::where('role', 'user')->paginate(25);

    return Inertia::render('User/Index', [
      'user' => $user,
    ]);
  }


  public function create()
  {
    return Inertia::render('User/Create');
  }

  public function store(Request $request)
  {
    $request->validate([
      'name' => 'required|string|max:255',
      'email' => 'required|email|unique:users,email',
      'password' => 'required|string|min:6',
    ]);

    DB::beginTransaction();
    try {
      $user = User::create([
        'name' => $request->name,
        'email' => $request->email,
        'password' => bcrypt($request->password),
        'role' => $request->role,
      ]);

      DB::commit();
      return redirect()->route('user.index');
    } catch (\Exception $e) {
      DB::rollBack();
      return back()->withErrors(['user' => 'Gagal menyimpan data: ' . $e->getMessage()])
        ->withInput();
    }
  }


  public function show(User $user)
  {
    return Inertia::render('User/Show', [
      'user' => $user
    ]);
  }

  public function edit(User $user) {}

  public function update(Request $request, User $user)
  {
    DB::beginTransaction();
    try {
      $user->update([
        'isActive' => !$user->isActive,
      ]);

      DB::commit();
      return redirect()->route('user.index')
        ->with('success', 'Status pengguna berhasil diperbarui');
    } catch (\Exception $e) {
      DB::rollBack();
      return back()->withErrors(['user' => 'Gagal mengubah data: ' . $e->getMessage()])
        ->withInput();
    }
  }


  public function destroy(User $user) {}
}
