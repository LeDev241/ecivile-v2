<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Hopital;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class HopitalAgentController extends Controller
{
    /**
     * Affiche le formulaire de création d'un agent pour un hôpital.
     */
    public function create(Hopital $hopital)
    {
        return Inertia::render('Admin/Hopitaux/Agents/Create', [
            'hopital' => $hopital,
        ]);
    }

    /**
     * Affiche les détails d'un hôpital avec ses agents.
     */
    public function show($id)
    {
        $hopital = Hopital::with('agents')->findOrFail($id);

        return Inertia::render('Admin/Hopitaux/Show', [
            'hopital' => $hopital,
        ]);
    }

    /**
     * Enregistre un nouvel agent pour l'hôpital donné.
     */
    public function store(Request $request, Hopital $hopital)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => [
                'required',
                'email',
                Rule::unique('users', 'email'),
            ],
            'password' => 'required|string|min:8|confirmed',
        ]);

        User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => User::ROLE_HOPITAL,
            'hopital_id' => $hopital->id,
        ]);

        // Recharge les agents pour l'affichage dans la vue "show"
        $hopital->load('agents');

        return redirect()
            ->route('admin.hopitaux.show', $hopital->id)
            ->with('success', 'Agent créé avec succès et lié à l\'hôpital.');
    }

    /**
     * Supprime un agent de l'hôpital.
     */
    public function destroy(Hopital $hopital, User $agent)
    {
        // On vérifie que l'agent appartient bien à cet hôpital
        if ($agent->hopital_id !== $hopital->id) {
            abort(403, 'Accès non autorisé. Cet agent n\'appartient pas à cet hôpital.');
        }

        $agent->delete();

        return redirect()->route('admin.hopitaux.show', $hopital->id)
            ->with('success', 'Agent supprimé avec succès.');
    }
}
