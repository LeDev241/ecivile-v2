<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('hopitals', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->text('description_courte')->nullable();
            $table->enum('type_etablissement', [
                'hopital_general',
                'clinique',
                'centre_medical',
                'hopital_specialise'
            ]);
            $table->string('adresse_complete');
            $table->string('telephone_principal');
            $table->string('email')->unique();
            $table->unsignedBigInteger('mairie_id')->nullable();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('hopitals');
    }
};

