<?php

namespace App\Http\Controllers\Hopital;

use App\Http\Controllers\Controller;
use App\Models\Declaration;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        if (!$user->isHopital() || !$user->hopital_id) {
            abort(403, 'Accès non autorisé. Vous devez être un agent d\'hôpital.');
        }

        $hopitalId = $user->hopital_id;

        // Totaux
        $declarationsCount = Declaration::where('hopital_id', $hopitalId)->count();
        $newDeclarationsCount = Declaration::where('hopital_id', $hopitalId)
            ->where('created_at', '>=', Carbon::now()->subDays(7))
            ->count();

        // Répartition par sexe
        $bySex = Declaration::select('sexe', DB::raw('COUNT(*) as total'))
            ->where('hopital_id', $hopitalId)
            ->groupBy('sexe')
            ->pluck('total', 'sexe');

        // Répartition par statut
        $byStatus = Declaration::select('statut', DB::raw('COUNT(*) as total'))
            ->where('hopital_id', $hopitalId)
            ->groupBy('statut')
            ->pluck('total', 'statut');

        // Agent le plus actif
        $byAgent = Declaration::join('users', 'declarations.agent_hopital_id', '=', 'users.id')
            ->where('declarations.hopital_id', $hopitalId)
            ->select('users.name', DB::raw('COUNT(declarations.id) as total'))
            ->groupBy('users.name')
            ->orderByDesc('total')
            ->pluck('total', 'name');

        $mostActiveAgent = $byAgent->keys()->first() ?? null;

        // Déclarations récentes
        $recentDeclarations = Declaration::where('hopital_id', $hopitalId)
            ->with(['agentHopital'])
            ->latest()
            ->take(5)
            ->get();

        $user->load('hopital');

        return Inertia::render('Hopital/Dashboard', [
            'declarationsCount' => $declarationsCount,
            'newDeclarationsCount' => $newDeclarationsCount,
            'recentDeclarations' => $recentDeclarations,
            'bySex' => $bySex,
            'byStatus' => $byStatus,
            'mostActiveAgent' => $mostActiveAgent,
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
                'hopital' => $user->hopital ? [
                    'id' => $user->hopital->id,
                    'nom' => $user->hopital->nom,
                    'type_etablissement' => $user->hopital->type_etablissement ?? 'Hôpital',
                    'adresse_complete' => $user->hopital->adresse_complete ?? '',
                ] : null,
            ],
        ]);
    }
}
