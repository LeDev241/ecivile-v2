<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\HopitalRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Hopital;
use App\Models\Mairie;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Hash;

class HopitalController extends Controller
{
    /**
     * Affiche la liste des hôpitaux
     */
    public function index()
    {
        $hopitaux = Hopital::with('user')->paginate(30);

        return Inertia::render('Admin/Hopitaux/Index', [
            'hopitaux' => $hopitaux,
        ]);
    }

    /**
     * Affiche le formulaire de création
     */
    public function create()
    {
        $mairies = Mairie::all(['id', 'nom']);

        return Inertia::render('Admin/Hopitaux/Create', [
            'mairies' => $mairies,
        ]);
    }

    /**
     * Enregistre un nouvel hôpital
     */
    public function store(HopitalRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        try {
            Hopital::create([
                ...$validated,
                'user_id' => auth()->id(),
            ]);

            return redirect()->route('admin.hopitaux.index')
                ->with('success', 'Hôpital enregistré avec succès.');
        } catch (\Exception $e) {
            return back()->withErrors([
                'error' => 'Erreur lors de l’enregistrement : ' . $e->getMessage(),
            ])->withInput();
        }
    }

    /**
     * Affiche le formulaire d’édition
     */
    public function edit(string $id)
    {
        $hopital = Hopital::with('user')->findOrFail($id);
        $mairies = Mairie::all(['id', 'nom']);

        return Inertia::render('Admin/Hopitaux/Edit', [
            'hopital' => $hopital,
            'mairies' => $mairies,
        ]);
    }

    /**
     * Met à jour un hôpital
     */
    public function update(Request $request, string $id): RedirectResponse
    {
        $hopital = Hopital::findOrFail($id);

        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'description_courte' => 'nullable|string|max:500',
            'type_etablissement' => 'required|in:hopital_general,clinique,centre_medical,hopital_specialise',
            'adresse_complete' => 'required|string|max:255',
            'telephone_principal' => 'required|string|max:20',
            'email' => 'required|email|unique:hopitals,email,' . $hopital->id,
            'mairie_id' => 'required|exists:mairies,id',
        ]);

        try {
            $hopital->update($validated);

            return redirect()->route('admin.hopitaux.index')
                ->with('success', 'Hôpital mis à jour avec succès.');
        } catch (\Exception $e) {
            return back()->withErrors([
                'error' => 'Erreur lors de la mise à jour : ' . $e->getMessage(),
            ])->withInput();
        }
    }

    /**
     * Supprime un hôpital
     */
    public function destroy(string $id): RedirectResponse
    {
        $hopital = Hopital::findOrFail($id);

        try {
            $hopital->delete();

            return redirect()->route('admin.hopitaux.index')
                ->with('success', 'Hôpital supprimé avec succès.');
        } catch (\Exception $e) {
            return back()->withErrors([
                'error' => 'Erreur lors de la suppression : ' . $e->getMessage(),
            ]);
        }
    }

    /**
     * Affiche le détail d'un hôpital
     */
    public function show(Hopital $hopital): \Inertia\Response
    {
        $hopital->load(['agents', 'user', 'mairie']);

        return Inertia::render('Admin/Hopitaux/Show', [
            'hopital' => $hopital,
            'agents' => $hopital->agents
        ]);
    }
}
