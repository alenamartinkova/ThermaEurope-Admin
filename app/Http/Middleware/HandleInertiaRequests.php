<?php

namespace App\Http\Middleware;

use App;
use App\Http\Middleware\Dto\LocaleDto;
use App\Services\Locale\LocaleService;
use File;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Collection;
use Inertia\Middleware;
use Spatie\TranslationLoader\TranslationLoaderManager;
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
     * @var TranslationLoaderManager
     */
    protected TranslationLoaderManager $loader;

    protected LocaleService $localeService;

    public function __construct(LocaleService $localeService)
    {
        $this->loader = app('translation.loader');
        $this->localeService = $localeService;
    }

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
     * @param  string  $locale
     * @return Collection<int, string>
     */
    private function getLocaleTranslationGroups(string $locale): Collection
    {
        $groups = new Collection();

        foreach (File::allFiles(lang_path($locale)) as $file) {
            $groups->push($file->getFilenameWithoutExtension());
        }

        return $groups;
    }

    /**
     * @param  string  $locale
     * @param  Collection<int, string>  $groups
     * @return Collection<string, string>
     */
    private function getLanguageMessages(string $locale, Collection $groups): Collection
    {
        $translations = new Collection();

        foreach ($groups as $group) {
            $messages = $this->loader->load($locale, $group);
            if (! empty($messages)) {
                $translations->put($group, $messages);
            }
        }

        return collect(Arr::dot($translations));
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
        if (! is_string($appLocale) || ! $this->localeService->isLocaleValid($appLocale)) {
            throw new UnexpectedValueException('Given locale value is not allowed.');
        }

        $props = [];
        $localeNames = $this->localeService->getActiveLocales();

        if (! $request->ajax()) {
            $translations = [];
            $groups = $this->getLocaleTranslationGroups($appLocale);
            $defaultMessages = $this->getLanguageMessages($appLocale, $groups);

            foreach ($localeNames->keys() as $langCode) {
                $messages = $this->getLanguageMessages($langCode, $groups);

                $translations[$langCode] = ['default' => $defaultMessages->merge($messages)];
            }

            $props['locale'] = App::getLocale();
            $props['translations'] = $translations;
        }

        $props['localeNames'] = $localeNames->map(function (LocaleDto $localeName) {
            return ['name' => $localeName->getName(), 'icon' => $localeName->getIcon()];
        });

        return array_merge(parent::share($request), $props);
    }
}
