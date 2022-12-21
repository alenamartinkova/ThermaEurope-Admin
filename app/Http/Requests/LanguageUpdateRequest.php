<?php

declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LanguageUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules(): array
    {
        return [
            'communication_lang' => 'required|string',
        ];
    }

    /**
     * @return array
     */
    public function getData(): array
    {
        return [
            'communication_lang' => $this->get('communication_lang'),
        ];
    }
}
