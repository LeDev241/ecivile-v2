<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('declarations', function (Blueprint $table) {
            $table->id();

            // Infos de l'enfant
            $table->string('nom_enfant');
            $table->string('prenom_enfant');
            $table->string('code_nuin');
            $table->date('date_naissance');
            $table->enum('sexe', ['masculin', 'feminin']);
            $table->string('lieu_naissance');

            // Infos du père
            $table->string('nom_pere');
            $table->string('prenom_pere');
            $table->string('profession_pere')->nullable();
            $table->string('nationalite_pere')->nullable();

            // Infos de la mère
            $table->string('nom_mere');
            $table->string('prenom_mere');
            $table->string('profession_mere')->nullable();
            $table->string('nationalite_mere')->nullable();

            // Email du parent pour les notifications
            $table->string('email_parent');

            // Fichiers uploadés
            $table->string('acte_naissance_pere')->nullable();
            $table->string('acte_naissance_mere')->nullable();

            // Le statut des declarations
            $table->enum('statut', ['brouillon', 'envoyee', 'validee', 'rejetee'])->default('brouillon');
            $table->text('motif_rejet')->nullable();


            // Liens avec les utilisateurs
            $table->foreignId('agent_hopital_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('agent_mairie_id')->nullable()->constrained('users')->onDelete('cascade');
            $table->foreignId('hopital_id')->constrained()->onDelete('cascade');
            $table->foreignId('mairie_id')->constrained()->onDelete('cascade');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('declarations');
    }
};
