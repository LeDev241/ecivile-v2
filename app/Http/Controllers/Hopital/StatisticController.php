<?php

namespace App\Http\Controllers\Hopital;

use App\Http\Controllers\Controller;
use App\Models\Declaration;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class StatisticController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        if (!$user || !$user->hopital_id) {
            return Inertia::render('Hopital/Statistic', [
                'totalDeclarations' => 0,
                'bySex' => [],
                'byYear' => [],
                'byMonth' => [],
                'byCreator' => [],
                'byStatus' => [],
            ]);
        }

        $hopitalId = $user->hopital_id;
        $driver = DB::getDriverName();

        // Expressions SQL en fonction du SGBD
        switch ($driver) {
            case 'sqlite':
                $yearExpr  = "strftime('%Y', created_at)";
                $monthExpr = "strftime('%m', created_at)";
                break;

            case 'pgsql':
                $yearExpr  = "EXTRACT(YEAR FROM created_at)";
                $monthExpr = "EXTRACT(MONTH FROM created_at)";
                break;

            default: // mysql / mariadb
                $yearExpr  = "YEAR(created_at)";
                $monthExpr = "MONTH(created_at)";
        }

        // Total déclarations
        $totalDeclarations = Declaration::where('hopital_id', $hopitalId)->count();

        // Répartition par sexe
        $bySex = Declaration::select('sexe', DB::raw('COUNT(*) as total'))
            ->where('hopital_id', $hopitalId)
            ->groupBy('sexe')
            ->pluck('total', 'sexe');

        // Répartition par année
        $byYear = Declaration::select(DB::raw("$yearExpr as year"), DB::raw('COUNT(*) as total'))
            ->where('hopital_id', $hopitalId)
            ->groupBy('year')
            ->orderByDesc('year')
            ->pluck('total', 'year');

        // Répartition par mois (année en cours)
        $byMonth = Declaration::select(DB::raw("$monthExpr as month"), DB::raw('COUNT(*) as total'))
            ->where('hopital_id', $hopitalId)
            ->where(DB::raw($yearExpr), date('Y'))
            ->groupBy('month')
            ->orderBy('month')
            ->pluck('total', 'month');

        // Répartition par agent hopital
        $byCreator = Declaration::join('users', 'declarations.agent_hopital_id', '=', 'users.id')
            ->where('declarations.hopital_id', $hopitalId)
            ->select('users.name as agent_name', DB::raw('COUNT(declarations.id) as total'))
            ->groupBy('users.name')
            ->pluck('total', 'agent_name');

        // Répartition par statut
        $byStatus = Declaration::select('statut', DB::raw('COUNT(*) as total'))
            ->where('hopital_id', $hopitalId)
            ->groupBy('statut')
            ->pluck('total', 'statut');

        return Inertia::render('Hopital/Statistic', [
            'totalDeclarations' => $totalDeclarations,
            'bySex' => $bySex,
            'byYear' => $byYear,
            'byMonth' => $byMonth,
            'byCreator' => $byCreator,
            'byStatus' => $byStatus,
        ]);
    }
}
