<?php

namespace App\Providers;

use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;

class RouteServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        // Load the API routes with 'api' middleware and 'api' prefix
        Route::middleware('api')
            ->prefix('api')
            ->group(base_path('routes/api.php'));

        // Load the web routes
        Route::middleware('web')
            ->group(base_path('routes/web.php'));
    }
}
