<?php

namespace App\Services;

use App\Exceptions\NotAuthenticatedException;
use App\Repositories\LanguageRepository;
use App\Repositories\UserRepository;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class UserService
{
    /** @var UserRepository */
    private UserRepository $userRepository;

    /** @var LanguageRepository */
    private LanguageRepository $languageRepository;

    /**
     * @param  UserRepository  $userRepository
     * @param  LanguageRepository  $languageRepository
     */
    public function __construct(UserRepository $userRepository, LanguageRepository $languageRepository)
    {
        $this->userRepository = $userRepository;
        $this->languageRepository = $languageRepository;
    }

    /**
     * @param  string  $communicationLanguage
     * @return void
     *
     * @throws NotAuthenticatedException
     */
    public function updateMyCommunicationLanguage(string $communicationLanguage): void
    {
        Log::info('Updating my communication language.', [
            'communication_lang' => $communicationLanguage,
        ]);

        $user = Auth::user();
        if (! $user) {
            Log::error('Error updating my communication language. No user authenticated.');
            throw new NotAuthenticatedException();
        }

        $this->languageRepository->getLanguageByCode($communicationLanguage)->firstOrFail();

        try {
            $this->userRepository->update(['communication_lang' => $communicationLanguage], $user->getAuthIdentifier());
            Log::info('My communication language updated.', [
                'user_id' => $user->getAuthIdentifier(),
                'communication_lang' => $communicationLanguage,
            ]);
        } catch (Exception $e) {
            Log::error('Error updating my communication language.', [
                'user_id' => $user->getAuthIdentifier(),
                'communication_lang' => $communicationLanguage,
                'message' => $e->getMessage(),
            ]);
        }
    }
}
