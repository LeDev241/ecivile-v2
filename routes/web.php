<?php

use App\Http\Controllers\ContactController;
use App\Http\Controllers\Hopital\StatisticController as HopitalStatisticController;
use App\Http\Controllers\Mairie\StatisticController as MairieStatisticController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Admin\HopitalController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\MairieController;
use App\Http\Controllers\Admin\HopitalAgentController;
use App\Http\Controllers\Admin\MairieAgentController;
use \App\Http\Controllers\Mairie\DashboardController as MairieDashboardController;
use \App\Http\Controllers\Hopital\DashboardController as HopitalDashboardController;
use App\Http\Controllers\Hopital\DeclarationController as HopitalDeclarationController;
use \App\Http\Controllers\Mairie\DeclarationController as MairieDeclarationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');


Route::prefix('contact')->group(function () {
    Route::get('/', function () {
        return Inertia::render('contact');
    })->name('contact');
    Route::post('/', [ContactController::class, 'submit'])->name('contact.submit');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        $user = Auth::user();

        if (!$user) {
            return redirect()->route('login');
        }

        if ($user->isAdmin()) {
            return redirect()->route('admin.dashboard');
        }

        if ($user->isMairie()) {
            return redirect()->route('mairie.dashboard');
        }

        return redirect()->route('hopital.dashboard');
    })->name('dashboard');

    Route::get('/admin/dashboard', [DashboardController::class, 'index'])->name('admin.dashboard');
    Route::get('/mairie/dashboard', [MairieDashboardController::class, 'index'])->name('mairie.dashboard');
    Route::get('/hopital/dashboard', [HopitalDashboardController::class, 'index'])->name('hopital.dashboard');
});

Route::middleware(['auth', 'verified'])->prefix('admin')->name('admin.')->group(function () {

    //hopitaux
    Route::get('/hopitaux', [HopitalController::class, 'index'])->name('hopitaux.index');
    Route::get('/hopitaux/create', [HopitalController::class, 'create'])->name('hopitaux.create');
    Route::post('/hopitaux', [HopitalController::class, 'store'])->name('hopitaux.store');
    Route::get('/hopitaux/{hopital}', [HopitalController::class, 'show'])->name('hopitaux.show');
    Route::get('/hopitaux/{hopital}/edit', [HopitalController::class, 'edit'])->name('hopitaux.edit');
    Route::put('/hopitaux/{hopital}', [HopitalController::class, 'update'])->name('hopitaux.update');
    Route::delete('/hopitaux/{hopital}', [HopitalController::class, 'destroy'])->name('hopitaux.destroy');

    // Mairies
    Route::get('/mairies', [MairieController::class, 'index'])->name('mairies.index');
    Route::get('/mairies/create', [MairieController::class, 'create'])->name('mairies.create');
    Route::post('/mairies', [MairieController::class, 'store'])->name('mairies.store');
    Route::get('/mairies/{mairie}', [MairieController::class, 'show'])->name('mairies.show');
    Route::get('/mairies/{id}/edit', [MairieController::class, 'edit'])->name('mairies.edit');
    Route::put('/mairies/{id}', [MairieController::class, 'update'])->name('mairies.update');
    Route::delete('/mairies/{id}', [MairieController::class, 'destroy'])->name('mairies.destroy');

    // Routes pour les agents des hopitaux
    Route::get('/hopitaux/{hopital}/agents/create', [HopitalAgentController::class, 'create'])->name('hopitaux.agents.create');
    Route::post('/hopitaux/{hopital}/agents', [HopitalAgentController::class, 'store'])->name('hopitaux.agents.store');
    Route::delete('/hopitaux/{hopital}/agents/{agent}', [HopitalAgentController::class, 'destroy'])->name('hopitaux.agents.destroy');

    // Routes pour les agents des mairies
    Route::get('/mairies/{mairie}/agents/create', [MairieAgentController::class, 'create'])->name('mairies.agents.create');
    Route::post('/mairies/{mairie}/agents', [MairieAgentController::class, 'store'])->name('mairies.agents.store');
    Route::delete('/mairies/{mairie}/agents/{agent}', [MairieAgentController::class, 'destroy'])->name('mairies.agents.destroy');

});

// Routes pour les agents des hôpitaux
Route::middleware(['auth', 'verified'])->prefix('hopital')->name('hopital.')->group(function () {
    Route::get('/declarations', [HopitalDeclarationController::class, 'index'])->name('declarations.index');
    Route::get('/declarations/create', [HopitalDeclarationController::class, 'create'])->name('declarations.create');
    Route::post('/declarations', [HopitalDeclarationController::class, 'store'])->name('declarations.store');
    Route::get('/declarations/{declaration}', [HopitalDeclarationController::class, 'show'])->name('declarations.show');
    Route::get('/declarations/{declaration}/edit', [HopitalDeclarationController::class, 'edit'])->name('declarations.edit');
    Route::delete('/declarations/{declaration}', [HopitalDeclarationController::class, 'destroy'])->name('declarations.destroy');
    Route::put('/declarations/{declaration}', [HopitalDeclarationController::class, 'update'])->name('declarations.update');
    Route::post('/declarations/{declaration}/submit', [HopitalDeclarationController::class, 'submitDeclaration'])->name('declarations.submit');
    Route::get('declarations/{declaration}/download', [HopitalDeclarationController::class, 'download'])->name('declarations.download');
    // Statistiques pour l'hôpital
    Route::get('/statistic', [HopitalStatisticController::class, 'index'])->name('declarations.statistic');

});

// Routes pour les agents des mairies
Route::middleware(['auth', 'verified'])->prefix('mairie')->name('mairie.')->group(function () {
    Route::get('/declarations', [MairieDeclarationController::class, 'index'])
        ->name('declarations.index');
    Route::get('/declarations/{declaration}', [MairieDeclarationController::class, 'show'])
        ->name('declarations.show');
    Route::post('/declarations/{declaration}/validate', [MairieDeclarationController::class, 'validateDeclaration'])
        ->name('declarations.validate');
    Route::post('/declarations/{declaration}/reject', [MairieDeclarationController::class, 'reject'])
        ->name('declarations.reject');
    Route::get('/declarations/{id}/download', [MairieDeclarationController::class, 'download'])
        ->name('declarations.download');
    // Statistiques pour la mairie
    Route::get('/statistic', [MairieStatisticController::class, 'index'])->name('declarations.statistic');

});


Route::get('/preview', function (Request $request) {
    $path = $request->query('path');

    if (!$path || !Storage::disk('public')->exists($path)) {
        abort(404, 'Document introuvable');
    }

    $mimeType = Storage::disk('public')->mimeType($path);
    $file = Storage::disk('public')->get($path);

    return response($file, 200)->header('Content-Type', $mimeType);
})->name('document.preview');




require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
