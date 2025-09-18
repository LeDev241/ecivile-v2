<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="utf-8">
    <title>Certificat de Déclaration de Naissance</title>
    <style>
        /* --- Page A4 + base --- */
        @page {
            size: A4;
            margin: 12mm;
        }

        * {
            box-sizing: border-box;
        }

        html,
        body {
            margin: 0;
            padding: 0;
        }

        body {
            font-family: "DejaVu Sans", "Segoe UI", Tahoma, Arial, sans-serif;
            color: #111827;
            line-height: 1.35;
            background: #fff;
            font-size: 11px;
        }

        .container {
            width: 100%;
            margin: 0 auto;
        }

        /* --- Header (solide pour compat PDF) --- */
        .header {
            background: #1e3a8a;
            color: #fff;
            text-align: center;
            padding: 9mm 2mm 6mm;
        }

        .header h1 {
            font-size: 20px;
            letter-spacing: .5px;
            margin: 0 0 4px;
        }

        .header .subtitle {
            font-size: 14px;
            margin: 0 0 2px;
        }

        .header .small {
            font-size: 11px;
            opacity: .95;
        }

        /* --- Bandes admin: table 2 colonnes --- */
        .admin {
            background: #eef4ff;
            border: 1px solid #e5e7eb;
            padding: 6mm 8mm;
            margin: 0
        }

        .admin table {
            width: 100%;
            border-collapse: collapse;
            table-layout: fixed;
        }

        .admin td {
            vertical-align: top;
            width: 50%;
            padding: 0 6mm 0 0;
        }

        .dot {
            display: inline-block;
            width: 6px;
            height: 6px;
            background: #2563eb;
            border-radius: 50%;
            margin-right: 6px;
            position: relative;
            top: -1px;
        }

        .admin-label {
            color: #1e40af;
            text-transform: uppercase;
            font-weight: 700;
            letter-spacing: .4px;
            margin-bottom: 2mm;
        }

        .admin-value {
            font-weight: 700;
            color: #111827;
        }

        /* --- Cartes (tables pour compat) --- */
        .card {
            border: 1px solid #e5e7eb;
            margin-bottom: 3mm;
            padding: 3mm;
            
        }

        .card.blue {
            border-left: 3px solid #2563eb;
        }

        .card.green {
            border-left: 3px solid #059669;
        }

        .card.pink {
            border-left: 3px solid #d61f69;
        }

        .card.gray {
            background: #f8fafc;
        }

        .card-header {
            width: 100%;
        }

        .card-header table {
            width: 100%;
            border-collapse: collapse;
        }

        .card-title {
            font-size: 14px;
            font-weight: 700;
            color: #1d4ed8;
        }

        .badge {
            text-align: right;
        }

        .pill {
            display: inline-block;
            padding: 3px 8px;
            border: 1px solid #bfdbfe;
            background: #eef4ff;
            color: #1e40af;
            border-radius: 999px;
            font-weight: 600;
            font-size: 10px;
        }

        /* --- Info grid -> table 2 colonnes --- */
        .info2col {
            width: 100%;
            border-collapse: separate;
            border-spacing: 6mm 0;
        }

        .info-block {}

        .field {
            margin: 0 0 4mm;
        }

        .label {
            color: #6b7280;
            font-weight: 600;
            margin: 0 0 1mm;
        }

        .value {
            font-weight: 700;
            color: #0b0f19;
        }

        .value.big {
            font-size: 13px;
        }

        /* --- Parents: 2 colonnes via table --- */
        .two-col {
            width: 100%;
            border-collapse: separate;
            border-spacing: 1mm 0;
        }

        .col {
            width: 50%;
            vertical-align: top;
        }

        .section-title {
            font-size: 13px;
            font-weight: 700;
            margin-bottom: 3mm;
        }

        .father .section-title {
            color: #047857;
        }

        .mother .section-title {
            color: #d61f69;
        }

        /* --- Signature zone --- */
        .sig-wrap {
            margin-top: 6mm;
        }

        .sig-grid {
            width: 100%;
            border-collapse: separate;
            border-spacing: 6mm 0;
        }

        .sig-cell {
            width: 50%;
            vertical-align: top;
            text-align: center;
        }

        .sig-label {
            color: #6b7280;
            margin-bottom: 3mm;
        }

        .sig-area {
            height: 18mm;
            border: 2px dashed #cfd6dd;
            border-radius: 8px;
            text-align: center;
            padding-top: 11mm;
            color: #9ca3af;
            font-weight: 600;
        }

        .sig-name {
            margin-top: 3mm;
            font-weight: 700;
        }

        .divider {
            height: 1px;
            background: #e5e7eb;
            margin: 0;
        }

        /* --- Footer --- */
        .foot.card {
            text-align: center;
        }

        .foot .who {
            margin: 0 0 2mm;
        }

        .muted {
            color: #6b7280;
        }

        .legal {
            color: #9ca3af;
            font-size: 10px;
            margin-top: 2mm;
        }

        /* Eviter les césures bizarres et rester sur 1 page */
        .card,
        .admin,
        .sig-grid,
        .two-col,
        .info2col {
            page-break-inside: avoid;
        }
    </style>
</head>

<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <h1>RÉPUBLIQUE GABONAISE</h1>
            <div class="subtitle">CERTIFICAT DE DÉCLARATION DE NAISSANCE</div>
            <div class="small">Document officiel</div>
        </div>

        <!-- Admin strip -->
        <div class="admin">
            <table>
                <tr>
                    <td>
                        <div class="admin-label"><span class="dot"></span> Établissement émetteur</div>
                        <div class="admin-value">{{ $declaration->hopital->nom }}</div>
                    </td>
                    <td>
                        <div class="admin-label"><span class="dot"></span> Mairie destinataire</div>
                        <div class="admin-value">{{ $declaration->mairie->nom }}</div>
                    </td>
                </tr>
            </table>
        </div>

        <!-- Enfant -->
        <div class="card blue">
            <div class="card-header">
                <table>
                    <tr>
                        <td class="card-title">Informations de l'enfant</td>
                    </tr>
                </table>
            </div>

            <table class="info2col">
                <tr>
                    <td class="info-block">
                        <div class="field">
                            <div class="label">Code NUIN</div>
                            <div class="value big">{{ $declaration->code_nuin }}</div>
                        </div>
                        <div class="field">
                            <div class="label">Nom de famille</div>
                            <div class="value big">{{ $declaration->nom_enfant }}</div>
                        </div>
                        <div class="field">
                            <div class="label">Prénom(s)</div>
                            <div class="value big">{{ $declaration->prenom_enfant }}</div>
                        </div>
                    </td>
                    <td class="info-block">
                        <div class="field">
                            <div class="label">Sexe</div>
                            <div class="value">{{ $declaration->sexe }}</div>
                        </div>
                        <div class="field">
                            <div class="label">Date de naissance</div>
                            <div class="value big">
                                {{ \Carbon\Carbon::parse($declaration->date_naissance)->locale('fr')->isoFormat('DD/MM/YYYY') }}
                            </div>
                        </div>
                        <div class="field">
                            <div class="label">Lieu de naissance</div>
                            <div class="value">{{ $declaration->lieu_naissance }}</div>
                        </div>
                    </td>
                </tr>
            </table>
        </div>

        <!-- Parents (2 colonnes) -->
        <table class="two-col">
            <tr>
                <td class="col">
                    <div class="card green father">
                        <div class="section-title">Père</div>
                        <div class="field">
                            <div class="label">Nom et prénom</div>
                            <div class="value">{{ $declaration->nom_pere }} {{ $declaration->prenom_pere }}</div>
                        </div>
                        <div class="field">
                            <div class="label">Profession</div>
                            <div class="value">{{ $declaration->profession_pere ?? 'N/A' }}</div>
                        </div>
                        <div class="field">
                            <div class="label">Nationalité</div>
                            <div class="value">{{ $declaration->nationalite_pere ?? 'N/A' }}</div>
                        </div>
                    </div>
                </td>
                <td class="col">
                    <div class="card pink mother">
                        <div class="section-title">Mère</div>
                        <div class="field">
                            <div class="label">Nom et prénom</div>
                            <div class="value">{{ $declaration->nom_mere }} {{ $declaration->prenom_mere }}</div>
                        </div>
                        <div class="field">
                            <div class="label">Profession</div>
                            <div class="value">{{ $declaration->profession_mere ?? 'N/A' }}</div>
                        </div>
                        <div class="field">
                            <div class="label">Nationalité</div>
                            <div class="value">{{ $declaration->nationalite_mere ?? 'N/A' }}</div>
                        </div>
                    </div>
                </td>
            </tr>
        </table>

        <!-- Contact -->
        <div class="card gray">
            <div class="section-title" style="color:#0b0f19; margin-bottom:2mm;">Contact</div>
            <div class="field">
                <span class="label">Email des parents</span>
                <span class="value">{{ $declaration->email_parent ?? 'N/A' }}</span>
            </div>
        </div>

        <div class="divider"></div>

        <!-- Signatures -->
        <div class="sig-wrap">
            <table class="sig-grid">
                <tr>
                    <td class="sig-cell">
                        <div class="sig-label">Signature de l'agent hospitalier</div>
                        <div class="sig-area">Zone de signature</div>
                        <div class="sig-name">{{ $declaration->agentHopital->name ?? 'N/A' }}</div>
                    </td>
                    <td class="sig-cell">
                        <div class="sig-label">Cachet de l'établissement</div>
                        <div class="sig-area">Zone de cachet</div>
                    </td>
                </tr>
            </table>
        </div>

        <!-- Footer -->
        <div class="card foot gray">
            <p class="who">
                <span class="muted">Déclaration enregistrée par</span>
                <strong> {{ $declaration->agentHopital->name ?? 'N/A' }}</strong>
            </p>
            <p class="muted">
                le {{ $declaration->created_at->locale('fr')->isoFormat('DD/MM/YYYY') }}
                à {{ $declaration->created_at->format('H:i:s') }}
            </p>
            <p class="legal">
                Ce document est un certificat de déclaration de naissance conformément aux dispositions légales en
                vigueur.
            </p>
        </div>
    </div>
</body>

</html>
