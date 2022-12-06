<?php

namespace App\Http\Middleware;

use App;
use App\Services\Locale\LocaleService;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     *
     * @param  Request  $request
     * @return string|null
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Defines the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @param  Request  $request
     * @return array<mixed>
     * @noinspection PhpPluralMixedCanBeReplacedWithArrayInspection
     */
    public function share(Request $request): array
    {
        $props = [];
        $localeNames = collect(LocaleService::getActiveLocaleNames());

        if (! $request->ajax()) {
            $loader = app('translation.loader');
            $groups = ['auth', 'locale', 'pagination', 'passwords', 'validation'];
            $languages = [];

            foreach ($localeNames->keys() as $langCode) {
                $translations = [];

                foreach ($groups as $group) {
                    $translations[$group] = $loader->load($langCode, $group);
                }

                $languages[$langCode] = ['default' => Arr::dot($translations)];
            }

            $props['locale'] = App::getLocale();
            $props['fallbackLang'] = config('app.locale');
            $props['translations'] = $languages;
        }

        $props['localeNames'] = $localeNames;

        return array_merge(parent::share($request), $props);
    }
}
