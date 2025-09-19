<?php

namespace App\Http\Controllers\Hopital;

use App\Http\Controllers\Controller;
use App\Models\Declaration;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Carbon\Carbon;

class StatisticController extends Controller
{
    public function index()
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
}
