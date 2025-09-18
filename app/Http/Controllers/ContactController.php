<?php

// app/Http/Controllers/ContactController.php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\ContactFormMail; // Créez ce Mailable si vous voulez envoyer un email

class ContactController extends Controller
{
    public function submit(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'message' => 'required|string',
        ]);

        // Logique pour traiter le formulaire, par exemple envoyer un email
        // Mail::to('devotech241@gmail.com')->send(new ContactFormMail($validatedData));

        return back()->with('success', 'Votre message a bien été envoyé !');
    }
}
