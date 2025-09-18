<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Hopital extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom',
        'description_courte',
        'type_etablissement',
        'adresse_complete',
        'telephone_principal',
        'email',
        'user_id',
        'mairie_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function agents()
    {
        return $this->hasMany(User::class, 'hopital_id');
    }

    public function mairie()
    {
        return $this->belongsTo(Mairie::class);
    }




}
