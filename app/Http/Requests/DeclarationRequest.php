<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class DeclarationRequest extends FormRequest
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
            'code_nuin' => 'required|numeric',
            'nom_enfant' => 'required|string',
            'prenom_enfant' => 'required|string',
            'date_naissance' => 'required|date',
            'sexe' => 'required|in:masculin,feminin',
            'lieu_naissance' => 'required|string',
            'nom_pere' => 'required|string',
            'prenom_pere' => 'required|string',
            'profession_pere' => 'nullable|string',
            'nationalite_pere' => 'nullable|string',
            'nom_mere' => 'required|string',
            'prenom_mere' => 'required|string',
            'profession_mere' => 'nullable|string',
            'nationalite_mere' => 'nullable|string',
            'email_parent' => 'required|string',
            'acte_naissance_mere' => 'required|file|mimes:pdf,jpg,jpeg,png|max:2048',
            'acte_naissance_pere' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:2048',
        ];
    }
}
