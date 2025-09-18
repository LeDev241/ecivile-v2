<?php

namespace App\Http\Controllers\Mairie;

use App\Http\Controllers\Controller;
use App\Models\Declaration;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Mail;
use App\Mail\DeclarationValidated; // Import du Mailable pour la validation
use App\Mail\DeclarationRejected;  // Import du Mailable pour le rejet

class DeclarationController extends Controller
{
    /**
     * Affiche la liste des déclarations pour la mairie de l'utilisateur,
     * avec la recherche et le filtrage.
     */
    public function index(Request $request)
    {
        $user = Auth::user();

        $filters = $request->only('field', 'query', 'status');

        $query = Declaration::where('mairie_id', $user->mairie_id)
            // Exclure de manière permanente les déclarations avec le statut 'brouillon'
            ->where('statut', '!=', 'brouillon')
            ->with(['agentHopital', 'hopital'])
            ->latest();

        // Logique de recherche
        if ($filters['query'] ?? null) {
            $field = $filters['field'] ?? 'nom_enfant';
            $searchQuery = '%' . strtolower($filters['query']) . '%';

            // Applique la clause de recherche sur le champ sélectionné
            $query->where($field, 'like', $searchQuery);
        }

        // Logique de filtrage par statut
        if ($filters['status'] ?? null) {
            switch ($filters['status']) {
                case 'en_attente':
                    // Le statut 'envoyee' du back-end correspond à 'en_attente' du front-end
                    $query->where('statut', 'envoyee');
                    break;
                case 'validee':
                    // Le statut 'traitee' du front-end correspond à 'validee' ou 'rejetee' du back-end
                    $query->where('statut', 'validee');
                    break;
                case 'rejetee':
                    $query->where('statut', 'rejetee');
                    break;
            }
        }

        $declarations = $query->paginate(30)->withQueryString();

        return Inertia::render('Mairie/Declarations/Index', [
            'declarations' => $declarations,
            'filters' => $filters,
        ]);
    }

    /**
     * Affiche les détails d'une déclaration.
     */
    public function show(Declaration $declaration)
    {
        // L'agent de mairie ne peut voir que les déclarations destinées à sa mairie
        $this->authorize('view', $declaration);

        return Inertia::render('Mairie/Declarations/Show', [
            'declaration' => $declaration->load(['agentHopital', 'hopital']),
        ]);
    }

    /**
     * Valide une déclaration.
     */
    public function validateDeclaration(Declaration $declaration)
    {
        // Autorise la validation via la Policy
        $this->authorize('validate', $declaration);

        $user = Auth::user();

        $declaration->update([
            'statut' => 'validee',
            'agent_mairie_id' => $user->id,
        ]);

        // Envoi de l'e-mail de notification si l'adresse est renseignée
        if ($declaration->email_parent) {
            Mail::to($declaration->email_parent)->send(new DeclarationValidated($declaration));
        }

        return redirect()->route('mairie.declarations.index')->with('success', 'Déclaration validée avec succès.');
    }

    /**
     * Rejette une déclaration.
     */
    public function reject(Request $request, Declaration $declaration)
    {
        // Autorise le rejet via la Policy
        $this->authorize('reject', $declaration);

        $validated = $request->validate([
            'motif_rejet' => 'required|string',
        ]);

        $user = Auth::user();

        $declaration->update([
            'statut' => 'rejetee',
            'agent_mairie_id' => $user->id,
            'motif_rejet' => $validated['motif_rejet'],
        ]);

        // Envoi de l'e-mail de notification si l'adresse est renseignée
        if ($declaration->email_parent) {
            Mail::to($declaration->email_parent)->send(new DeclarationRejected($declaration));
        }


        return redirect()->route('mairie.declarations.index')->with('success', 'Déclaration rejetée. Le motif a été enregistré.');
    }

    /**
     * Télécharge le PDF d'une déclaration.
     */
    public function download($id)
    {
        $declaration = Declaration::with(['hopital', 'mairie'])->findOrFail($id);

        // L'agent de mairie ne peut télécharger que les déclarations destinées à sa mairie
        $this->authorize('view', $declaration);

        // Génération du nom de fichier basé sur le nom de l'enfant ou le code NUIN
        $filename = 'declaration_mairie_';
        if (!empty($declaration->nom_enfant) && !empty($declaration->prenom_enfant)) {
            $filename .= Str::slug($declaration->nom_enfant . '_' . $declaration->prenom_enfant);
        } elseif (!empty($declaration->code_nuin)) {
            $filename .= Str::slug($declaration->code_nuin);
        } else {
            $filename .= $declaration->id; // Fallback à l'ID si rien d'autre n'est disponible
        }
        $filename .= '.pdf';

        $pdf = Pdf::loadView('pdf.mairie_declaration', compact('declaration'));

        return $pdf->download($filename);
    }
}
