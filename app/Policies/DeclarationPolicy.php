<?php

namespace App\Policies;

use App\Models\Declaration;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class DeclarationPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        // Tous les utilisateurs (admin, hopital, mairie) peuvent voir la liste des déclarations
        return $user->isAdmin() || $user->isHopital() || $user->isMairie();
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Declaration $declaration): bool
    {
        // Un agent d'hôpital peut voir ses propres déclarations
        if ($user->isHopital() && $user->id === $declaration->agent_hopital_id) {
            return true;
        }

        // Un agent de mairie peut voir les déclarations de la mairie à laquelle il est affilié
        if ($user->isMairie() && $user->mairie_id === $declaration->mairie_id) {
            return true;
        }

        // L'administrateur peut tout voir
        return $user->isAdmin();
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        // Seul un agent d'hôpital peut créer une déclaration
        return $user->isHopital();
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Declaration $declaration): bool
    {
        // Un agent d'hôpital peut modifier une déclaration uniquement si elle est encore en brouillon
        // et qu'elle lui appartient.
        return $user->isHopital()
            && $user->id === $declaration->agent_hopital_id
            && $declaration->statut === 'brouillon';
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Declaration $declaration): bool
    {
        // Un agent d'hôpital peut supprimer une déclaration uniquement si elle est en brouillon
        // et qu'elle lui appartient.
        return $user->isHopital()
            && $user->id === $declaration->agent_hopital_id
            && $declaration->statut === 'brouillon';
    }

    /**
     * Determine whether the user can send the model to the Mairie.
     */
    public function send(User $user, Declaration $declaration): bool
    {
        // Un agent d'hôpital peut envoyer une déclaration si elle lui appartient et est en brouillon
        return $user->isHopital()
            && $user->id === $declaration->agent_hopital_id
            && $declaration->statut === 'brouillon';
    }

    /**
     * Determine whether the user can validate the model.
     */
    public function validate(User $user, Declaration $declaration): bool
    {
        // Un agent de mairie peut valider une déclaration si elle a été envoyée
        // et qu'elle est pour sa mairie.
        return $user->isMairie()
            && $user->mairie_id === $declaration->mairie_id
            && $declaration->statut === 'envoyee';
    }

    /**
     * Determine whether the user can reject the model.
     */
    public function reject(User $user, Declaration $declaration): bool
    {
        // Un agent de mairie peut rejeter une déclaration si elle a été envoyée
        // et qu'elle est pour sa mairie.
        return $user->isMairie()
            && $user->mairie_id === $declaration->mairie_id
            && $declaration->statut === 'envoyee';
    }
}
