<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Mairie;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class MairieAgentController extends Controller
{
    /**
     * Affiche le formulaire de création d'un agent pour une mairie.
     */
    public function create(Mairie $mairie)
    {
        return Inertia::render('Admin/Mairies/Agents/Create', [
            'mairie' => $mairie
        ]);
    }

    /**
     * Affiche les détails d'une mairie avec ses agents.
     */
    public function show($id)
    {
        $mairie = Mairie::with('agents')->findOrFail($id);

        return Inertia::render('Admin/Mairies/Show', [
            'mairie' => $mairie,
        ]);
    }

    /**
     * Enregistre un nouvel agent pour la mairie donnée.
     */
    public function store(Request $request, Mairie $mairie)
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
            'role' => User::ROLE_MAIRIE,
            'mairie_id' => $mairie->id,
        ]);

        // Recharge les agents pour l’affichage
        $mairie->load('agents');

        return redirect()
            ->route('admin.mairies.show', $mairie->id)
            ->with('success', 'Agent créé avec succès et lié à la mairie.');
    }


    /**
     * Supprime un agent de l'hôpital.
     * C'est une nouvelle méthode pour gérer la suppression.
     */
    public function destroy(Mairie $mairie, User $agent)
    {
        // On vérifie que l'agent appartient bien à cet hôpital
        if ($agent->mairie_id !== $mairie->id) {
            abort(403, 'Accès non autorisé. Cet agent n\'appartient pas à cette mairie.');
        }

        $agent->delete();

        return redirect()->route('admin.mairies.show', $mairie->id)
            ->with('success', 'Agent supprimé avec succès.');
    }
}
