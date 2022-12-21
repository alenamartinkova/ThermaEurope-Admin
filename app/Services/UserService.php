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
     * @param UserRepository $userRepository
     * @param LanguageRepository $languageRepository
     */
    public function __construct(UserRepository $userRepository, LanguageRepository $languageRepository) {
        $this->userRepository = $userRepository;
        $this->languageRepository = $languageRepository;
    }

    /**
     * @param string $communicationLanguage
     * @return void
     * @throws NotAuthenticatedException
     */
    public function updateMyCommunicationLanguage(string $communicationLanguage): void
    {
        $user = Auth::user();

        if (!$user) {
            throw new NotAuthenticatedException();
        }

        Log::info('Updating user communication language. User ID: ', [
            'id' => $user->id,
            'communication_lang' => $communicationLanguage
        ]);

        $this->languageRepository->getLanguageByCode($communicationLanguage)->firstOrFail();

        try {
            $this->userRepository->update([
                    'communication_lang' => $communicationLanguage
                ],
                $user->id
            );
        } catch (Exception $e) {
            Log::error('Error updating user communication language. User ID: ' . $e->getMessage(), ['id' => $user->id]);
        }
    }
}
