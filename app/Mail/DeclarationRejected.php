<?php

namespace App\Mail;

use App\Models\Declaration;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class DeclarationRejected extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * La déclaration associée.
     *
     * @var \App\Models\Declaration
     */
    public $declaration;

    /**
     * Crée une nouvelle instance de message.
     */
    public function __construct(Declaration $declaration)
    {
        $this->declaration = $declaration;
    }

    /**
     * Obtient l'enveloppe du message.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Déclaration de naissance rejetée',
        );
    }

    /**
     * Obtient le contenu du message.
     */
    public function content(): Content
    {
        return new Content(
            markdown: 'emails.declarations.rejected',
            with: [
                'declaration' => $this->declaration,
            ],
        );
    }

    /**
     * Obtient les pièces jointes du message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
