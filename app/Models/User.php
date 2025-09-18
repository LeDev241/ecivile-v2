<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'hopital_id',
        'mairie_id',

    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    // Relation un utilisateur appartient à un seul hôpital
    public function hopital()
    {
        return $this->belongsTo(Hopital::class, 'hopital_id');
    }

     // Relation un utilisateur appartient à une seule mairie
     public function mairie()
     {
         return $this->belongsTo(Mairie::class, 'mairie_id');
     }


    // Naissances créées par un agent d’hôpital
    public function naissancesCreees()
    {
        return $this->hasMany(Declaration::class, 'agent_hopital_id');
    }

    // Naissances validées par un agent de mairie
    public function naissancesValidees()
    {
        return $this->hasMany(Declaration::class, 'agent_mairie_id');
    }

    // Rôles de l'utilisateur
    public const ROLE_ADMIN = 'admin';
    public const ROLE_MAIRIE = 'agent_mairie';
    public const ROLE_HOPITAL = 'agent_hopital';


    public function isAdmin(): bool
    {
        return $this->role === self::ROLE_ADMIN;
    }

    public function isMairie(): bool
    {
        return $this->role === self::ROLE_MAIRIE;
    }

    public function isHopital(): bool
    {
        return $this->role === self::ROLE_HOPITAL;
    }


    // Méthode pour obtenir la structure à laquelle l'utilisateur est lié
    public function getStructure()
    {
        if ($this->isHopital()) {
            return $this->hopital;
        }

        if ($this->isMairie()) {
            return $this->mairie;
        }

        return null;
    }
}
