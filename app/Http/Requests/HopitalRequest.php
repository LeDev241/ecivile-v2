<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class HopitalRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'nom' => 'required|string|max:255',
            'description_courte' => 'nullable|string',
            'type_etablissement' => 'required|in:hopital_general,clinique,centre_medical,hopital_specialise',
            'adresse_complete' => 'required|string|max:255',
            'telephone_principal' => 'required|string|max:20',
            'email' => 'required|email|unique:hopitals,email',
            'mairie_id' => 'required|exists:mairies,id',
        ];
    }
}
