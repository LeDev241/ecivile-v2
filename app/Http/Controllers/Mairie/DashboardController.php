<?php

namespace App\Http\Controllers\Mairie;

use App\Http\Controllers\Controller;
use App\Models\Declaration;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Affiche le tableau de bord pour l'agent de la mairie.
     *
     * @return Response
     */
    public function index(): Response
    {
        $user = Auth::user();

        // Vérifier que l'utilisateur est un agent de mairie
        if (!$user->mairie || !$user->mairie_id) {
            abort(403, 'Accès non autorisé. Vous devez être un agent de mairie.');
        }

        $mairieId = $user->mairie_id;



        $statusCounts = Declaration::where('mairie_id', $mairieId)
            ->selectRaw("
                COUNT(*) as total,
                SUM(CASE WHEN statut = 'envoyee' THEN 1 ELSE 0 END) as recues_en_attente,
                SUM(CASE WHEN statut = 'validee' THEN 1 ELSE 0 END) as validees,
                SUM(CASE WHEN statut = 'rejetee' THEN 1 ELSE 0 END) as rejetees
            ")
            ->first();


        if (!$statusCounts) {
            $statusCounts = (object) [
                'total' => 0,
                'recues_en_attente' => 0,
                'validees' => 0,
                'rejetees' => 0,
            ];
        }


        $recentDeclarations = Declaration::where('mairie_id', $mairieId)
            ->whereIn('statut', ['envoyee', 'validee', 'rejetee'])
            ->with(['agentHopital', 'hopital'])
            ->latest()
            ->take(5)
            ->get()
            ->map(function ($declaration) {
                return [
                    'id' => $declaration->id,
                    'nom_enfant' => $declaration->nom_enfant,
                    'prenom_enfant' => $declaration->prenom_enfant,
                    'code_nuin' => $declaration->code_nuin,
                    'statut' => $declaration->statut,
                    'hopital' => $declaration->hopital->nom ?? 'N/A',
                    'created_at' => $declaration->created_at->format('d/m/Y H:i'),
                ];
            });

        // Charger les informations de la mairie affiliée
        $user->load('mairie');

        return Inertia::render('Mairie/Dashboard', [
            // On utilise les totaux calculés par la requête unique
            'statusCounts' => $statusCounts,
            'recentDeclarations' => $recentDeclarations,
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
                'mairie' => $user->mairie ? [
                    'id' => $user->mairie->id,
                    'nom' => $user->mairie->nom,
                    'adresse_complete' => $user->mairie->adresse_complete ?? '',
                ] : null,
            ],
        ]);
    }
}
