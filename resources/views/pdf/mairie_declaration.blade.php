<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <title>Acte de naissance - {{ $declaration->nom_enfant ?? '' }} {{ $declaration->prenom_enfant ?? '' }}</title>
    <style>
        @page {
            size: A4;
            margin: 15mm;
        }

        body {
            font-family: 'DejaVu Sans', Arial, sans-serif;
            font-size: 11px;
            color: #000;
            line-height: 1.3;
        }

        .acte-container {
            width: 80mm;
            padding: 4mm;
            padding-top: 10mm;
            margin: auto;
            border: 0.05mm solid #000
        }

        .header {
            text-align: center;
            margin-bottom: 10px;
        }

        .header p {
            margin: 0;
            font-weight: bold;
        }

        h1 {
            text-align: center;
            font-size: 14px;
            text-decoration: underline;
            margin: 8px 0;
        }

        .line {
            margin: 4px 0;
        }

        .label {
            font-weight: bold;
        }

        .fill {
            display: inline-block;
            min-width: 57mm;
            border-bottom: 1px dotted #000;
            padding: 0 2mm;
        }

        .fill-short {
            display: inline-block;
            min-width: 27mm;
            border-bottom: 1px dotted #000;
            padding: 0 2mm;
        }

        .signature {
            margin-top: 30px;
            text-align: center;
        }

        .signature p {
            margin: 5px 0;
        }

        .footer {
            margin-top: 20mm;
            text-align: center;
            font-style: italic;
            font-size: 9px;
            color: #444;
        }

        .divider {
            width: 30%;
            height: 0.2mm;
            margin: auto;
            background-color: #000
        }

    </style>
</head>

<body>
    <div class="acte-container">

        <!-- En-tête officiel -->
        <div class="header">
            <p>RÉPUBLIQUE GABONAISE</p>
            <div class="divider"></div>
            <p>PROVINCE DE L’ESTUAIRE</p>
            <div class="divider"></div>
            <p>COMMUNE DE LIBREVILLE</p>
            <div class="divider"></div>
            <p>CENTRE D'ÉTAT CIVIL DE LIBREVILLE</p>
            <div class="divider"></div>
        </div>

        <h1 style="margin-bottom: 6mm">ACTE DE NAISSANCE</h1>
        

        <!-- Numéro -->
        <div class="line">
            N° <span class="fill-short">{{ $declaration->code_nuin }}</span>
            du <span class="fill-short">{{ \Carbon\Carbon::now()->translatedFormat('d/m/Y') }}</span>
        </div>

        <!-- Déclarant -->
        <div class="line">
            Le (1) <span class="fill">{{ $declaration->declarant_nom ?? '' }}</span>
        </div>

        <div class="line">
            Qui a déclaré la naissance survenue:
            <p>à<span class="fill"> {{ $declaration->lieu_naissance ?? '' }}</span></p>
            <p>le<span
                    class="fill">{{ \Carbon\Carbon::parse($declaration->date_naissance)->translatedFormat('d/m/Y') }}</span>
            </p>
            <p>à<span class="fill-short"> {{ $declaration->heure_naissance ?? '' }}</span> heures</p>
        </div>



        <!-- Enfant -->
        <div class="line">
            D’un enfant de sexe : <span class="fill-short">{{ ucfirst($declaration->sexe ?? '') }}</span>
        </div>
        <div class="line">
            Nommé : <span class="fill">{{ strtoupper($declaration->nom_enfant) }}
            {{ $declaration->prenom_enfant }}</span>
        </div>

        <!-- Père -->
        <div class="line">
            Né de (4) <span class="fill">{{ strtoupper($declaration->nom_pere) }}
                {{ $declaration->prenom_pere }}</span>
        </div>
        <div class="line">
            Date de naissance : <span class="fill-short">{{ $declaration->date_naissance_pere ?? '' }}</span>
        </div>
        <div class="line">
            Lieu : <span class="fill">{{ $declaration->lieu_naissance_pere ?? '' }}</span>
        </div>
        <div class="line">
            Domicilié à : <span class="fill">{{ $declaration->domicile_pere ?? '' }}</span>
        </div>
        <div class="line">
            Profession : <span class="fill">{{ $declaration->profession_pere ?? '' }}</span>
        </div>
        <div class="line">
            Nationalité : <span class="fill">{{ $declaration->nationalite_pere ?? '' }}</span>
        </div>
        <div class="line">
            Coutume : <span class="fill">{{ $declaration->coutume_pere ?? '' }}</span>
        </div>

        <!-- Mère -->
        <div class="line">
            Et de (5) <span class="fill">{{ strtoupper($declaration->nom_mere) }}
                {{ $declaration->prenom_mere }}</span>
        </div>
        <div class="line">
            Date de naissance : <span class="fill-short">{{ $declaration->date_naissance_mere ?? '' }}</span>
        </div>
        <div class="line">
            Lieu : <span class="fill">{{ $declaration->lieu_naissance_mere ?? '' }}</span>
        </div>
        <div class="line">
            Domiciliée à : <span class="fill">{{ $declaration->domicile_mere ?? '' }}</span>
        </div>
        <div class="line">
            Profession : <span class="fill">{{ $declaration->profession_mere ?? '' }}</span>
        </div>
        <div class="line">
            Nationalité : <span class="fill">{{ $declaration->nationalite_mere ?? '' }}</span>
        </div>
        <div class="line">
            Coutume : <span class="fill">{{ $declaration->coutume_mere ?? '' }}</span>
        </div>

        <!-- Signature -->
        <div class="signature">
            <p>L’Officier d’État-Civil</p>
            <p>(Signature et timbre)</p>
        </div>

        <!-- Pied de page -->
        <div class="footer">
            <p>Note très importante - Aucune rectification matérielle de cet acte n’est valable si elle n’est
                contresignée par l’Officier d’État Civil.</p>
        </div>
    </div>
</body>

</html>
