<?php

namespace App\Http\Controllers\Mairie;

use App\Http\Controllers\Controller;
use App\Models\Declaration;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class StatisticController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        if (!$user || !$user->mairie_id) {
            return Inertia::render('Mairie/Statistic', [
                'totalPending' => 0,
                'totalDeclarations' => 0,
                'bySex' => [],
                'byYear' => [],
                'byMonth' => [],
                'byCreator' => [],
                'byStatus' => [],
            ]);
        }

        $mairieId = $user->mairie_id;

        // Déclarations en attente (envoyee)
        $totalPending = Declaration::where('mairie_id', $mairieId)
            ->where('statut', 'envoyee')
            ->count();

        // Déclarations traitées (validee ou rejetee)
        $processed = Declaration::where('mairie_id', $mairieId)
            ->whereIn('statut', ['validee', 'rejetee']);

        // Total des déclarations traitées
        $totalDeclarations = $processed->count();

        

        // Répartition par année
        $byYear = Declaration::where('mairie_id', $mairieId)
            ->whereIn('statut', ['validee', 'rejetee'])
            ->select(DB::raw('YEAR(created_at) as year'), DB::raw('COUNT(*) as total'))
            ->groupBy(DB::raw('YEAR(created_at)'))
            ->orderBy(DB::raw('YEAR(created_at)'), 'desc')
            ->pluck('total', 'year');

        $byMonth = Declaration::where('mairie_id', $mairieId)
            ->whereIn('statut', ['validee', 'rejetee'])
            ->whereYear('created_at', date('Y'))
            ->select(DB::raw('MONTH(created_at) as month'), DB::raw('COUNT(*) as total'))
            ->groupBy(DB::raw('MONTH(created_at)'))
            ->orderBy(DB::raw('MONTH(created_at)'), 'asc')
            ->pluck('total', 'month');



        // Répartition par agent mairie
        $byCreator = Declaration::join('users', 'declarations.agent_mairie_id', '=', 'users.id')
            ->where('declarations.mairie_id', $mairieId)
            ->whereIn('declarations.statut', ['validee', 'rejetee'])
            ->select('users.name as agent_name', DB::raw('COUNT(declarations.id) as total'))
            ->groupBy('users.name')
            ->pluck('total', 'agent_name');


        // Répartition par statut
        $byStatus = Declaration::where('mairie_id', $mairieId)
            ->whereIn('statut', ['validee', 'rejetee'])
            ->select('statut', DB::raw('COUNT(*) as total'))
            ->groupBy('statut')
            ->pluck('total', 'statut');


        return Inertia::render('Mairie/Statistic', [
            'totalPending' => $totalPending,
            'totalDeclarations' => $totalDeclarations,
            'byYear' => $byYear,
            'byMonth' => $byMonth,
            'byCreator' => $byCreator,
            'byStatus' => $byStatus,
        ]);
    }
}
