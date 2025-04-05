<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth as FacadesAuth;
use Symfony\Component\HttpFoundation\Response;

class Auth
{
  public function handle(Request $request, Closure $next): Response
  {
    if (!FacadesAuth::check()) {
      // dd(auth());
      return redirect()->route('login'); // Custom login page
    }

    return $next($request);
  }
}
