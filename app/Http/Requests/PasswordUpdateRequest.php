<?php

declare(strict_types=1);

namespace App\Http\Requests;

use App\Rules\MatchCurrentPassword;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class PasswordUpdateRequest extends FormRequest
{
    const PASSWORD_MIN_LENGTH = 10;

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules(): array
    {
        return [
            'password' => [
                'required',
                new MatchCurrentPassword,
                Password::min(self::PASSWORD_MIN_LENGTH)->mixedCase()->letters()->numbers()
            ],
            'password_changed' => [
                'required',
                'confirmed',
                Password::min(self::PASSWORD_MIN_LENGTH)->mixedCase()->letters()->numbers()
            ]
        ];
    }

    /**
     * @return array
     */
    public function getData(): array
    {
        return [
            'password' => $this->get('password'),
            'password_changed' => $this->get('password_changed'),
            'password_changed_confirmation' => $this->get('password_changed_confirmation'),
        ];
    }
}
