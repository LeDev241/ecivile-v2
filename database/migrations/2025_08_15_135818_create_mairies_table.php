<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('mairies', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->string('adresse_complete');
            $table->string('description_courte')->nullable();
            $table->string('telephone_principal')->unique();
            $table->string('code_postal')->nullable();
            $table->string('email')->unique()->nullable();

            $table->unsignedBigInteger('province_id');
            $table->unsignedBigInteger('commune_id');
            $table->unsignedBigInteger('arrondissement_id');
            $table->unsignedBigInteger('quartier_id')->nullable();

            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('mairies');
    }
};
