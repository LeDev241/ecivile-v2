@extends('emails.layout')

@section('title', 'Déclaration de naissance rejetée')
@section('header', 'Déclaration de naissance rejetée')

@section('content')
    <p>Bonjour,</p>
    <p>Nous vous informons que la déclaration de naissance concernant l'enfant <strong>{{ $declaration->nom_enfant }} {{ $declaration->prenom_enfant }} </strong> a été <strong>rejetée</strong> par la mairie de <strong>{{ $declaration->mairie->nom }}</strong>.</p>
    <p><strong>Motif du rejet :</strong></p>
    <p>{{ $declaration->motif_rejet }}</p>
    <p>Pour corriger la déclaration, veuillez vous rendre à la mairie de {{ $declaration->mairie->nom }} avec les documents requis pour finaliser l'acte de naissance.</p>
    <p>Nous vous prions de bien vouloir accepter nos excuses pour tout inconvénient que cela pourrait occasionner.</p>
    <p>Cordialement,<br>L'équipe de l'administration</p>
@endsection
