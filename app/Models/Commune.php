<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Commune extends Model
{
    protected $fillable = ['nom','province_id'];

    public function province()
    {
        return $this->belongsTo(Province::class);
    }

    public function arrondissements()
    {
        return $this->hasMany(Arrondissement::class);
    }
}
