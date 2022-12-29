<?php

declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PasswordUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules(): array
    {
        return [
            'password' => 'required',
            'password_changed' => 'required',
            'password_changed_confirm' => 'required|same:password_changed',
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
            'password_changed_confirm' => $this->get('password_changed_confirm'),
        ];
    }
}
