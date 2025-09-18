@extends('emails.layout')

@section('title', 'Déclaration de naissance validée')
@section('header', 'Déclaration de naissance validée')

@section('content')
    <p>Bonjour,</p>
    <p>Nous vous informons que la déclaration de naissance concernant l'enfant <strong>{{ $declaration->nom_enfant }} {{ $declaration->prenom_enfant }} </strong> a été <strong>validée</strong> par la mairie de <strong>{{ $declaration->mairie->nom }}</strong>.</p>
    <p>Vous pouvez vous rendre à la mairie de {{ $declaration->mairie->nom }} pour prendre possession de l'acte de naissance. </p>
    <p>Merci de votre confiance.</p>
    <p>Cordialement,<br>L'équipe de l'administration</p>
@endsection
