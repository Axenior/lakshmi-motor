<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth as FacadesAuth;
use Symfony\Component\HttpFoundation\Response;

class Guest
{
  public function handle(Request $request, Closure $next): Response
  {
    if (FacadesAuth::check()) {
      return redirect()->route('dashboard');
    }

    return $next($request);
  }
}
