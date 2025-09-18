import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { Input } from "./ui/input";

interface ComboboxProps {
    options: string[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    maxVisible?: number; 
}

const Combobox: React.FC<ComboboxProps> = ({
    options,
    value,
    onChange,
    placeholder,
    maxVisible = 5,
}) => {
    const [query, setQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const filteredOptions = options.filter((option) =>
        option.toLowerCase().includes(query.toLowerCase())
    );

    // Fermer la liste si clic en dehors
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
                setQuery("");
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={containerRef}>
            <Input
                type="text"
                value={value}
                onFocus={() => setIsOpen(true)}
                onChange={(e) => {
                    setQuery(e.target.value);
                    onChange(e.target.value);
                    setIsOpen(true);
                }}
                placeholder={placeholder}
                className="mt-1 block w-full focus:outline-none focus:ring focus:ring-blue-500"
            />
            {isOpen && filteredOptions.length > 0 && (
                <ul className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded border bg-white shadow-lg">
                    {filteredOptions.slice(0, maxVisible).map((option) => (
                        <li
                            key={option}
                            onClick={() => {
                                onChange(option);
                                setQuery("");
                                setIsOpen(false);
                            }}
                            className="cursor-pointer px-3 py-2 hover:bg-gray-200"
                        >
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

// Liste des nationalités en français
export const nationalites = [
    "Afghane",
    "Albanaise",
    "Algérienne",
    "Allemande",
    "Andorrane",
    "Angolaise",
    "Antiguayenne",
    "Argentine",
    "Arménienne",
    "Australienne",
    "Autrichienne",
    "Azerbaïdjanaise",
    "Bahamas",
    "Bahreïnienne",
    "Bangladaise",
    "Barbadienne",
    "Belge",
    "Bélizienne",
    "Béninoise",
    "Bhoutanaise",
    "Bissaubaise",
    "Bolivienne",
    "Bosnienne",
    "Botswanaise",
    "Brésilienne",
    "Brunéienne",
    "Bulgare",
    "Burkinabé",
    "Burundaise",
    "Cambodgienne",
    "Camerounaise",
    "Canadienne",
    "Cap-verdienne",
    "Centrafricaine",
    "Chilienne",
    "Chinoise",
    "Colombienne",
    "Comorienne",
    "Congolaise",
    "Costaricienne",
    "Croate",
    "Cubaine",
    "Chypriote",
    "Tchèque",
    "Danoise",
    "Djiboutienne",
    "Dominicaine",
    "Équatorienne",
    "Égyptienne",
    "Salvadorienne",
    "Guinéenne",
    "Érythréenne",
    "Estonienne",
    "Éthiopienne",
    "Fidjienne",
    "Finlandaise",
    "Française",
    "Gabonaise",
    "Gambienne",
    "Géorgienne",
    "Allemande",
    "Ghanéenne",
    "Grecque",
    "Grenadienne",
    "Guatémaltèque",
    "Guinéenne-Bissau",
    "Guinéenne équatoriale",
    "Guyanienne",
    "Haïtienne",
    "Hondurienne",
    "Hongroise",
    "Islandaise",
    "Indienne",
    "Indonésienne",
    "Iranienne",
    "Iraqienne",
    "Irlandaise",
    "Israélienne",
    "Italienne",
    "Ivoirienne",
    "Jamaïcaine",
    "Japonaise",
    "Jordanienne",
    "Kazakh",
    "Kényane",
    "Kirghize",
    "Koweïtienne",
    "Laotienne",
    "Lettonne",
    "Libanaise",
    "Libérienne",
    "Libyenne",
    "Liechtensteinoise",
    "Lituanienne",
    "Luxembourgeoise",
    "Macédonienne",
    "Malagasy",
    "Malaisienne",
    "Malawienne",
    "Maldivienne",
    "Mali",
    "Maltaise",
    "Marocaine",
    "Marshallaise",
    "Mauritanienne",
    "Mauricienne",
    "Mexicaine",
    "Micronésienne",
    "Moldave",
    "Monégasque",
    "Mongole",
    "Monténégrine",
    "Mozambicaine",
    "Namibienne",
    "Nauruane",
    "Népalaise",
    "Néerlandaise",
    "Néo-Zélandaise",
    "Nicaraguayenne",
    "Nigérienne",
    "Nigériane",
    "Norvégienne",
    "Omanaise",
    "Pakistanaise",
    "Palauane",
    "Palestinienne",
    "Panaméenne",
    "Papouasienne",
    "Paraguayenne",
    "Péruvienne",
    "Philippine",
    "Polonaise",
    "Portugaise",
    "Qatarienne",
    "Roumaine",
    "Russe",
    "Rwandaise",
    "Saint-Lucienne",
    "Saint-Vincentaise",
    "Samoane",
    "Saint-Marinaise",
    "Sainte-Hélène",
    "Sainte-Kittienne",
    "Sainte-Lucienne",
    "Salomonaise",
    "Sénégalaise",
    "Serbe",
    "Seychelloise",
    "Sierra-Léonaise",
    "Singapourienne",
    "Slovaque",
    "Slovène",
    "Salvadorienne",
    "Somalienne",
    "Sud-africaine",
    "Sud-soudanaise",
    "Espagnole",
    "Sri-lankaise",
    "Soudanaise",
    "Surinamaise",
    "Swazie",
    "Suédoise",
    "Suisse",
    "Syrienne",
    "Taïwanaise",
    "Tadjike",
    "Tanzanienne",
    "Thaïlandaise",
    "Togolaise",
    "Tongaise",
    "Trinidadienne",
    "Tunisienne",
    "Turque",
    "Turkmène",
    "Tuvaluane",
    "Ougandaise",
    "Ukrainienne",
    "Émiratie",
    "Britannique",
    "Américaine",
    "Uruguayenne",
    "Ouzbèke",
    "Vanuatuane",
    "Vaticane",
    "Vénézuélienne",
    "Vietnamienne",
    "Yéménite",
    "Zambienne",
    "Zimbabwéenne",
];

export const villesGabon = [
    "Libreville",
    "Port-Gentil",
    "Franceville",
    "Oyem",
    "Moanda",
    "Lambaréné",
    "Mouila",
    "Koulamoutou",
    "Bitam",
    "Tchibanga",
    "Makokou",
    "Mbigou",
    "Ndjolé",
    "Mimongo",
    "Lastoursville",
];

export default Combobox;
