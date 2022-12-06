<?php

namespace App\Http\Middleware;

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

        if (! $request->ajax()) {
            $loader = app('translation.loader');
            $languages = [];

            $translations = [];
            $translations['validation'] = $loader->load('en', 'validation');
            $languages['en'] = ['default' => Arr::dot($translations)];

            $translations = [];
            $translations['validation'] = $loader->load('cz', 'validation');
            $languages['cz'] = ['default' => Arr::dot($translations)];

            $props['locale'] = app()->getLocale();
            $props['translations'] = $languages;
        }

        return array_merge(parent::share($request), $props);
    }
}
