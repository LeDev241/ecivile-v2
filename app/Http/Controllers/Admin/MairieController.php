<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\MairieRequest;
use App\Models\Mairie;
use App\Models\Province;
use App\Models\Commune;
use App\Models\Arrondissement;
use App\Models\Quartier;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class MairieController extends Controller
{
    public function index(): Response
    {
        $mairies = Mairie::with(['user', 'province', 'commune', 'arrondissement'])
            ->paginate(30);

        return Inertia::render('Admin/Mairies/Index', [
            'mairies' => $mairies,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Mairies/Create', [
            'provinces' => Province::all(),
            'communes' => Commune::all(),
            'arrondissements' => Arrondissement::all(),
        ]);
    }

    public function store(MairieRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        $validated['user_id'] = Auth::id();

        // Construit l’adresse complète automatiquement
        $province = Province::find($validated['province_id'])->nom;
        $commune = Commune::find($validated['commune_id'])->nom;
        $arrondissement = Arrondissement::find($validated['arrondissement_id'])->nom;

        $validated['adresse_complete'] = "$arrondissement, $commune, $province";

        Mairie::create($validated);

        return redirect()->route('admin.mairies.index')
            ->with('success', 'Mairie créée avec succès.');
    }

    public function show(Mairie $mairie): Response
    {
        $mairie->load(['agents', 'user', 'province', 'commune', 'arrondissement']);

        return Inertia::render('Admin/Mairies/Show', [
            'mairie' => $mairie,
            'agents' => $mairie->agents,
        ]);
    }

    public function edit(string $id): Response
    {
        $mairie = Mairie::with(['province', 'commune', 'arrondissement'])->findOrFail($id);

        return Inertia::render('Admin/Mairies/Edit', [
            'mairie' => $mairie,
            'provinces' => Province::all(['id', 'nom']),
            'communes' => Commune::all(['id', 'nom', 'province_id']),
            'arrondissements' => Arrondissement::all(['id', 'nom', 'commune_id']),
        ]);

    }

    public function update(Request $request, string $id): RedirectResponse
    {
        $mairie = Mairie::findOrFail($id);

        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'description_courte' => 'nullable|string|max:500',
            'telephone_principal' => 'required|string|max:20|unique:mairies,telephone_principal,' . $mairie->id,
            'email' => 'required|email|unique:mairies,email,' . $mairie->id,
            'code_postal' => 'nullable|string|max:10',
            'province_id' => 'required|exists:provinces,id',
            'commune_id' => 'required|exists:communes,id',
            'arrondissement_id' => 'required|exists:arrondissements,id',
        ]);

        // Mise à jour de l’adresse complète
        $province = Province::find($validated['province_id'])->nom;
        $commune = Commune::find($validated['commune_id'])->nom;
        $arrondissement = Arrondissement::find($validated['arrondissement_id'])->nom;

        $validated['adresse_complete'] = "$arrondissement, $commune, $province";

        $mairie->update($validated);

        return redirect()->route('admin.mairies.index')
            ->with('success', 'Mairie mise à jour avec succès.');
    }

    public function destroy(string $id): RedirectResponse
    {
        $mairie = Mairie::findOrFail($id);

        $mairie->delete();

        return redirect()->route('admin.mairies.index')
            ->with('success', 'Mairie supprimée avec succès.');
    }
}
