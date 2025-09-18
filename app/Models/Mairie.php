<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Mairie extends Model
{
    protected $fillable = [
        'nom',
        'description_courte',
        'adresse_complete',
        'telephone_principal',
        'email',
        'code_postal',
        'user_id',
        'province_id',
        'commune_id',
        'arrondissement_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function agents()
    {
        return $this->hasMany(User::class, 'mairie_id');
    }

    public function hopitaux()
    {
        return $this->hasMany(Hopital::class);
    }

    // --- Relations géographiques ---
    public function province()
    {
        return $this->belongsTo(Province::class);
    }

    public function commune()
    {
        return $this->belongsTo(Commune::class);
    }

    public function arrondissement()
    {
        return $this->belongsTo(Arrondissement::class);
    }




}
