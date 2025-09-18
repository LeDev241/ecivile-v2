<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Declaration extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom_enfant',
        'prenom_enfant',
        'code_nuin',
        'date_naissance',
        'sexe',
        'lieu_naissance',

        'nom_pere',
        'prenom_pere',
        'profession_pere',
        'nationalite_pere',
        'nom_mere',
        'prenom_mere',
        'profession_mere',
        'nationalite_mere',

        "email_parent",

        'acte_naissance_pere',
        'acte_naissance_mere',

        'statut',
        'motif_rejet',

        'agent_hopital_id',
        'agent_mairie_id',
        'hopital_id',
        'mairie_id',
    ];
    protected $appends = [
        'agent',
        'date_naissance_formatted',
        'created_at_formatted'
    ];


    public function hopital()
    {
        return $this->belongsTo(Hopital::class, 'hopital_id');
    }

    public function mairie()
    {
        return $this->belongsTo(Mairie::class, 'mairie_id');
    }

    public function agentHopital()
    {
        return $this->belongsTo(User::class, 'agent_hopital_id');
    }

    public function agentMairie()
    {
        return $this->belongsTo(User::class, 'agent_mairie_id');
    }

    // Accessor pour récupérer le nom de l'agent responsable
    public function getAgentAttribute(): string
    {
        return $this->agentHopital->name ?? 'N/A';
    }

    // Accessor pour formater la date de naissance
    public function getDateNaissanceFormattedAttribute(): string
    {
        return Carbon::parse($this->date_naissance)->translatedFormat('d F Y');
    }

    // Accessor pour formater la date de création
    public function getCreatedAtFormattedAttribute(): string
    {
        return Carbon::parse($this->created_at)->translatedFormat('d F Y H:i');
    }
}
