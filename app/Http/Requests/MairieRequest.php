<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MairieRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
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
            'description_courte' => 'nullable|string|max:500',
            'telephone_principal' => 'required|string|max:20|unique:mairies',
            'email' => 'required|email|unique:mairies|max:255',
            'code_postal' => 'nullable|string|max:10',
            'province_id' => 'required|exists:provinces,id',
            'commune_id' => 'required|exists:communes,id',
            'arrondissement_id' => 'required|exists:arrondissements,id',
        ];
    }
}
