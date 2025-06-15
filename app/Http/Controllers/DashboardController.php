<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\Pendaftaran;
use Carbon\Carbon;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
  public function index()
  {
    $jumlah_pendaftaran_hari_ini = Pendaftaran::whereDate('tanggal_pendaftaran', Carbon::today())->count();
    $jumlah_pengerjaan = Pendaftaran::where('status', 'pengerjaan')->count();
    $jumlah_estimasi = Pendaftaran::where('status', 'estimasi')->count();

    $query = Pendaftaran::with([
      'pelanggan',
      'penanggung',
      'kendaraan',
      'file_kerusakans',
      'file_stnks',
      'file_gesek_rangkas',
      'file_surat_pengantars',
      'file_spks',
      'file_epoxys',
      'estimasi',
      'user'
    ]);

    $pendaftaran = $query->latest('tanggal_pendaftaran')->take(5)->get();

    return Inertia::render('Dashboard', [
      'pendaftaran' => $pendaftaran,
      'jumlah_pendaftaran_hari_ini' => $jumlah_pendaftaran_hari_ini,
      'jumlah_pengerjaan' => $jumlah_pengerjaan,
      'jumlah_estimasi' => $jumlah_estimasi,
    ]);
  }

  public function edit(Request $request): Response
  {
    return Inertia::render('Profile/Edit', [
      'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
      'status' => session('status'),
    ]);
  }

  /**
   * Update the user's profile information.
   */
  public function update(ProfileUpdateRequest $request): RedirectResponse
  {
    $request->user()->fill($request->validated());

    if ($request->user()->isDirty('email')) {
      $request->user()->email_verified_at = null;
    }

    $request->user()->save();

    return Redirect::route('profile.edit');
  }

  /**
   * Delete the user's account.
   */
  public function destroy(Request $request): RedirectResponse
  {
    $request->validate([
      'password' => ['required', 'current_password'],
    ]);

    $user = $request->user();

    Auth::logout();

    $user->delete();

    $request->session()->invalidate();
    $request->session()->regenerateToken();

    return Redirect::to('/');
  }
}
