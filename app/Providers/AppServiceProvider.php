<?php

namespace App\Providers;

use Carbon\Carbon;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use App\Models\Declaration;
use App\Models\Hopital;
use App\Models\Mairie;
use App\Policies\DeclarationPolicy;
use App\Policies\EntityPolicy;
use Illuminate\Support\Facades\Gate;


class AppServiceProvider extends ServiceProvider
{

    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        // Enregistrement des policies
        Declaration::class => DeclarationPolicy::class,
        Hopital::class => EntityPolicy::class,
        Mairie::class => EntityPolicy::class,
    ];

    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);

        // Enregistrement des policies
        foreach ($this->policies as $model => $policy) {
            Gate::policy($model, $policy);
        }

        Carbon::setLocale('fr');
    }
}
