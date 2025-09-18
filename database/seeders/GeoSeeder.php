<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Province;
use App\Models\Commune;
use App\Models\Arrondissement;

class GeoSeeder extends Seeder
{
    public function run()
    {
        // -------------------
        // Provinces
        // -------------------
        $estuaire = Province::create(['nom' => 'Estuaire']);
        $hautOgooue = Province::create(['nom' => 'Haut-Ogooué']);
        $moyenOgooue = Province::create(['nom' => 'Moyen-Ogooué']);
        $ngounie = Province::create(['nom' => 'Ngounié']);
        $nyanga = Province::create(['nom' => 'Nyanga']);
        $ogooueIvindo = Province::create(['nom' => "Ogooué-Ivindo"]);
        $ogooueLolo = Province::create(['nom' => "Ogooué-Lolo"]);
        $ogooueMaritime = Province::create(['nom' => "Ogooué-Maritime"]);
        $woleuNtem = Province::create(['nom' => "Woleu-Ntem"]);

        // -------------------
        // Communes - Estuaire
        // -------------------
        $libreville = Commune::create(['nom' => 'Libreville', 'province_id' => $estuaire->id]);
        $kango = Commune::create(['nom' => 'Kango', 'province_id' => $estuaire->id]);
        $ntoum = Commune::create(['nom' => 'Ntoum', 'province_id' => $estuaire->id]);
        $owendo = Commune::create(['nom' => 'Owendo', 'province_id' => $estuaire->id]);
        $portGentil = Commune::create(['nom' => 'Port-Gentil', 'province_id' => $estuaire->id]); 

        // -------------------
        // Arrondissements de Libreville
        // -------------------
        Arrondissement::create(['nom' => 'Premier Arrondissement', 'commune_id' => $libreville->id]);
        Arrondissement::create(['nom' => 'Deuxième Arrondissement', 'commune_id' => $libreville->id]);
        Arrondissement::create(['nom' => 'Troisième Arrondissement', 'commune_id' => $libreville->id]);
        Arrondissement::create(['nom' => 'Quatrième Arrondissement', 'commune_id' => $libreville->id]);
        Arrondissement::create(['nom' => 'Cinquième Arrondissement', 'commune_id' => $libreville->id]);
        Arrondissement::create(['nom' => 'Sixième Arrondissement', 'commune_id' => $libreville->id]);

        // -------------------
        // Arrondissements de Kango
        // -------------------
        Arrondissement::create(['nom' => 'Kango Centre', 'commune_id' => $kango->id]);
        Arrondissement::create(['nom' => 'Kango Nord', 'commune_id' => $kango->id]);
        Arrondissement::create(['nom' => 'Kango Sud', 'commune_id' => $kango->id]);

        // -------------------
        // Arrondissements de Ntoum
        // -------------------
        Arrondissement::create(['nom' => 'Ntoum Centre', 'commune_id' => $ntoum->id]);
        Arrondissement::create(['nom' => 'Ntoum Nord', 'commune_id' => $ntoum->id]);
        Arrondissement::create(['nom' => 'Ntoum Sud', 'commune_id' => $ntoum->id]);

        // -------------------
        // Arrondissements de Owendo
        // -------------------
        Arrondissement::create(['nom' => 'Owendo Centre', 'commune_id' => $owendo->id]);
        Arrondissement::create(['nom' => 'Owendo Nord', 'commune_id' => $owendo->id]);

        // -------------------
        // Arrondissements de Port-Gentil 
        // -------------------
        Arrondissement::create(['nom' => 'Port-Gentil Centre', 'commune_id' => $portGentil->id]);
        Arrondissement::create(['nom' => 'Port-Gentil Ouest', 'commune_id' => $portGentil->id]);
        Arrondissement::create(['nom' => 'Port-Gentil Est', 'commune_id' => $portGentil->id]);

        


       

        
    }
}
