<?php

namespace App\Http\Middleware;

use App;
use App\Services\Locale\LocaleService;
use Closure;
use Config;
use Illuminate\Http\Request;
use Session;
use UnexpectedValueException;

class LocaleMiddleware
{
    /**
     * @param  Request  $request
     * @param  Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next): mixed
    {
        $locale = Config::get('app.fallback_locale');
        $sessionLocale = Session::get(LocaleService::SESSION_LOCALE_KEY);

        if (is_string($sessionLocale) && LocaleService::isLocaleValid($sessionLocale)) {
            $locale = $sessionLocale;
        }

        if (is_string($locale) && LocaleService::isLocaleValid($locale)) {
            App::setLocale($locale);
        } else {
            throw new UnexpectedValueException('Given locale value is not allowed.');
        }

        return $next($request);
    }
}
