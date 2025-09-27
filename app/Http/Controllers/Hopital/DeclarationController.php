<?php

namespace App\Http\Controllers\Hopital;

use App\Http\Controllers\Controller;
use App\Http\Requests\DeclarationRequest;
use App\Models\Declaration;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Str;


class DeclarationController extends Controller
{
    /**
     * Affiche la liste des déclarations pour l'hôpital de l'utilisateur.
     */
    public function index(Request $request)
    {
        $user = Auth::user();
        if (!$user->hopital) {
            abort(403, 'Accès non autorisé. Vous devez être un agent d\'hôpital.');
        }

        $filters = $request->only('field', 'query', 'status');
        $hopital = $user->hopital;

        $query = Declaration::where('hopital_id', $hopital->id)
            ->with(['agentHopital', 'hopital'])
            ->latest();

        if ($request->filled('query')) {
            $field = $filters['field'] ?? 'nom_enfant';
            $searchQuery = '%' . strtolower($filters['query']) . '%';

            if ($field === 'nom_enfant') {
                $query->where(function ($q) use ($searchQuery) {
                    $q->where('nom_enfant', 'like', $searchQuery)
                        ->orWhere('prenom_enfant', 'like', $searchQuery);
                });
            } else {
                $query->where($field, 'like', $searchQuery);
            }
        }

        if ($request->filled('status')) {
            $status = $filters['status'];
            switch ($status) {
                case 'envoyee':
                    $query->where('statut', 'envoyee');
                    break;
                case 'rejetee':
                    $query->where('statut', 'rejetee');
                    break;
                case 'validee':
                    $query->where('statut', 'validee');
                    break;
                case 'brouillon':
                    $query->where('statut', 'brouillon');
                    break;
            }
        }

        $declarations = $query->paginate(30)->withQueryString();

        return Inertia::render('Hopital/Declarations/Index', [
            'declarations' => $declarations,
            'filters' => $filters,
        ]);
    }


    /**
     * Affiche le formulaire de création de déclaration.
     */
    public function create()
    {
        // Seuls les agents d'hôpital peuvent créer une déclaration.
        $this->authorize('create', Declaration::class);

        return Inertia::render('Hopital/Declarations/Create');
    }

    /**
     * Stocke une nouvelle déclaration dans la base de données.
     */
    public function store(DeclarationRequest $request)
    {
        // Seuls les agents d'hôpital peuvent créer une déclaration.
        $this->authorize('create', Declaration::class);

        $validated = $request->validated();

        if ($request->hasFile('acte_naissance_mere')) {
            $validated['acte_naissance_mere'] = $request->file('acte_naissance_mere')->store('documents', 'public');
        }

        if ($request->hasFile('acte_naissance_pere')) {
            $validated['acte_naissance_pere'] = $request->file('acte_naissance_pere')->store('documents', 'public');
        }

        $user = auth()->user();
        $validated['agent_hopital_id'] = $user->id;
        $validated['hopital_id'] = $user->hopital_id;
        $validated['mairie_id'] = $user->hopital->mairie_id;
        $validated['statut'] = 'brouillon';

        Declaration::create($validated);

        return redirect()->route('hopital.declarations.index')->with('success', 'Déclaration enregistrée en tant que brouillon.');
    }

    /**
     * Affiche une déclaration.
     */
    public function show(Declaration $declaration)
    {
        // Un agent ne peut voir que les déclarations qu'il est autorisé à voir.
        $this->authorize('view', $declaration);

        return Inertia::render('Hopital/Declarations/Show', [
            'declaration' => $declaration->load(['agentHopital', 'hopital', 'mairie']),
        ]);
    }

    /**
     * Affiche le formulaire de modification d'une déclaration.
     */
    public function edit(Declaration $declaration)
    {
        // On autorise la modification uniquement si le statut n'est pas 'envoyee' ou 'validee'
        if ($declaration->statut === 'envoyee' || $declaration->statut === 'validee') {
            return back()->with('error', 'Cette déclaration a été envoyée à la mairie et ne peut plus être modifiée.');
        }

        // On vérifie ensuite les autorisations via la Policy
        $this->authorize('update', $declaration);

        return Inertia::render('Hopital/Declarations/Edit', [
            'declaration' => $declaration->load(['agentHopital', 'hopital', 'mairie']),
        ]);
    }

    /**
     * Met à jour une déclaration existante.
     */
    public function update(Request $request, Declaration $declaration)
    {
        // On vérifie si la déclaration est modifiable (statut 'brouillon' ou 'rejetee')
        if ($declaration->statut === 'envoyee' || $declaration->statut === 'validee') {
            return back()->with('error', 'Cette déclaration ne peut plus être modifiée.');
        }

        // Un agent peut modifier une déclaration si elle lui appartient.
        $this->authorize('update', $declaration);

        $validatedData = $request->validate([
            'nom_enfant' => 'sometimes|string',
            'prenom_enfant' => 'sometimes|string',
            'date_naissance' => 'sometimes|date',
            'sexe' => 'sometimes|in:masculin,feminin',
            'lieu_naissance' => 'sometimes|string',
            'nom_pere' => 'sometimes|string',
            'prenom_pere' => 'sometimes|string',
            'profession_pere' => 'sometimes|nullable|string',
            'nationalite_pere' => 'sometimes|nullable|string',
            'nom_mere' => 'sometimes|string',
            'prenom_mere' => 'sometimes|string',
            'profession_mere' => 'sometimes|nullable|string',
            'nationalite_mere' => 'sometimes|nullable|string',
            'email_parent' => 'sometimes|nullable|string',

        ]);

        $updates = $validatedData;

        if ($request->hasFile('acte_naissance_mere')) {

            $request->validate([
                'acte_naissance_mere' => 'file|mimes:pdf,jpg,jpeg,png|max:2048',
            ]);

            if ($declaration->acte_naissance_mere) {
                Storage::disk('public')->delete($declaration->acte_naissance_mere);
            }
            $updates['acte_naissance_mere'] = $request->file('acte_naissance_mere')->store('documents', 'public');
        }

        if ($request->hasFile('acte_naissance_pere')) {

            $request->validate([
                'acte_naissance_pere' => 'file|mimes:pdf,jpg,jpeg,png|max:2048',
            ]);

            if ($declaration->acte_naissance_pere) {
                Storage::disk('public')->delete($declaration->acte_naissance_pere);
            }
            $updates['acte_naissance_pere'] = $request->file('acte_naissance_pere')->store('documents', 'public');
        }

        $declaration->update($updates);

        return redirect()->route('hopital.declarations.index')->with('success', 'Déclaration mise à jour.');
    }

    /**
     * Supprime une déclaration.
     */
    public function destroy(Declaration $declaration)
    {
        // On vérifie si la déclaration est supprimable (statut 'brouillon' ou 'rejetee')
        if ($declaration->statut === 'envoyee' || $declaration->statut === 'validee') {
            return back()->with('error', 'Cette déclaration ne peut plus être supprimée.');
        }

        // Un agent peut supprimer une déclaration si elle lui appartient et est en brouillon.
        $this->authorize('delete', $declaration);

        if ($declaration->acte_naissance_mere) {
            Storage::disk('public')->delete($declaration->acte_naissance_mere);
        }

        if ($declaration->acte_naissance_pere) {
            Storage::disk('public')->delete($declaration->acte_naissance_pere);
        }

        $declaration->delete();

        return redirect()->route('hopital.declarations.index')->with('success', 'Déclaration supprimée avec succès.');
    }

    /**
     * Soumet une déclaration à la mairie.
     */
    public function submitDeclaration(Declaration $declaration)
    {
        // Vérifie que l'agent est bien l'auteur de la déclaration
        if ($declaration->agent_hopital_id !== Auth::id()) {
            return back()->with('error', 'Vous n\'êtes pas autorisé à soumettre cette déclaration.');
        }

        // Vérifie si la déclaration est au statut 'brouillon' avant de la soumettre
        if ($declaration->statut !== 'brouillon') {
            return back()->with('error', 'Cette déclaration a déjà été soumise.');
        }

        // Met à jour le statut de la déclaration
        $declaration->update(['statut' => 'envoyee']);

        return redirect()->route('hopital.declarations.index')->with('success', 'Déclaration envoyée avec succès à la mairie.');
    }


    /**
     * Affiche les statistiques.
     */
    public function statistic()
    {
        $user = Auth::user();

        // Récupération des déclarations de l'hôpital connecté
        $declarations = Declaration::where('hopital_id', $user->hopital_id)->get();

        // Statistiques
        $totalDeclarations = $declarations->count();
        $bySex = $declarations->groupBy('sexe')->map(fn($items) => $items->count());
        $byCreator = $declarations->groupBy('agent')->map(fn($items) => $items->count());

        return Inertia::render('Hopital/Statistic', [
            'totalDeclarations' => $totalDeclarations,
            'bySex' => $bySex,
            'byCreator' => $byCreator,
        ]);
    }


    /**
     * Télécharge le PDF d'une déclaration.
     */
    public function download($id)
    {
        $declaration = Declaration::with(['hopital', 'mairie'])->findOrFail($id);

        // Autorise le téléchargement de la déclaration
        $this->authorize('view', $declaration);

        // Génération du nom de fichier basé sur le nom de l'enfant ou le code NUIN
        $filename = 'declaration_hopital_';
        if (!empty($declaration->nom_enfant) && !empty($declaration->prenom_enfant)) {
            $filename .= Str::slug($declaration->nom_enfant . '_' . $declaration->prenom_enfant);
        } elseif (!empty($declaration->code_nuin)) {
            $filename .= Str::slug($declaration->code_nuin);
        } else {
            $filename .= $declaration->id;
        }
        $filename .= '.pdf';

        $pdf = Pdf::loadView('pdf.hopital_declaration', compact('declaration'));

        return $pdf->download($filename);
    }
}
