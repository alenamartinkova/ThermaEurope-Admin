<?php

namespace App\Http\Middleware;

use App;
use App\Services\Locale\LocaleService;
use File;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Inertia\Middleware;
use UnexpectedValueException;

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
        $appLocale = config('app.fallback_locale');
        if (! is_string($appLocale) || ! LocaleService::isLocaleValid($appLocale)) {
            throw new UnexpectedValueException('Given locale value is not allowed.');
        }

        $props = [];
        $localeNames = collect(LocaleService::getActiveLocaleNames());

        if (! $request->ajax()) {
            $loader = app('translation.loader');
            $groups = [];
            $languages = [];

            foreach (File::allFiles(lang_path($appLocale)) as $file) {
                $groups[] = $file->getFilenameWithoutExtension();
            }

            foreach ($localeNames->keys() as $langCode) {
                $translations = [];

                foreach ($groups as $group) {
                    $messages = $loader->load($langCode, $group);
                    if (! empty($messages)) {
                        $translations[$group] = $messages;
                    }
                }

                $languages[$langCode] = ['default' => Arr::dot($translations)];
            }

            $props['locale'] = App::getLocale();
            $props['fallbackLang'] = $appLocale;
            $props['translations'] = $languages;
        }

        $props['localeNames'] = $localeNames;

        return array_merge(parent::share($request), $props);
    }
}
