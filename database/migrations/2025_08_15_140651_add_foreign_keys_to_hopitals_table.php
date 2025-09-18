<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('hopitals', function (Blueprint $table) {
            $table->foreign('mairie_id')->references('id')->on('mairies')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('hopitals', function (Blueprint $table) {
            $table->dropForeign(['mairie_id']);
        });
    }
};
