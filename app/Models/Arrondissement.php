<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Arrondissement extends Model
{
    protected $fillable = [
        'nom',
        'commune_id',
    ];

    // Relation vers la commune
    public function commune()
    {
        return $this->belongsTo(Commune::class);
    }

   

    // Une mairie peut être rattachée à un arrondissement
    public function mairies()
    {
        return $this->hasMany(Mairie::class);
    }
}
