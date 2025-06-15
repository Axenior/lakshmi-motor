<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckAdmin
{
  /**
   * Handle an incoming request.
   */
  public function handle(Request $request, Closure $next): Response
  {
    // Pastikan user sudah login dan memiliki role 'admin'
    if (!$request->user() || $request->user()->role !== 'admin') {
      // Redirect atau berikan response error jika user bukan admin
      // dd('s');
      return redirect('/'); // Atau gunakan response lain sesuai kebutuhan
    }

    return $next($request);
  }
}
