export interface User {
    id: number;
    name: string;
    email: string;
    role?: string;
    created_at?: string;
    updated_at?: string;
    mairie_id?: number;
    hopital_id?: number;

    mairie?: {
        id: number;
        nom: string;
        adresse_complete?: string;
    } | null;

    hopital?: {
        id: number;
        nom: string;
        adresse_complete?: string;
    } | null;
}

export interface Mairie {
    id: number;
    nom: string;
    email: string;
    adresse_complete: string;
    description_courte: string;
    telephone_principal: string;
    code_postal: string;
    user_id: number;
    province_id: number;
    commune_id: number;
    arrondissement_id: number;

    province?: {
        id: number;
        nom: string;
    };
    commune?: {
        id: number;
        nom: string;
    };
    arrondissement?: {
        id: number;
        nom: string;
    };

    created_at: string;
    updated_at: string;
}

export interface Hopital {
    id: number;
    nom: string;
    email: string;
    adresse_complete: string;
    description_courte: string;
    telephone_principal: string;
    type_etablissement: string,
    code_postal: string;
    mairie?: Mairie
    user_id: number;
    mairie_id: number;

    created_at: string;
    updated_at: string;
}

export interface Province {
    id: number;
    nom: string;
}

export interface Commune {
    id: number;
    province_id: number;
    nom: string;
}

export interface Arrondissement {
    id: number;
    commune_id: number;
    nom: string;
}

export interface Declaration {
    id: number;
    nom_enfant: string;
    prenom_enfant: string;
    code_nuin: string;
    date_naissance: string;
    sexe: string;
    lieu_naissance: string;
    nom_pere: string;
    prenom_pere: string;
    profession_pere: string;
    nationalite_pere: string;
    nom_mere: string;
    prenom_mere: string;
    profession_mere: string;
    nationalite_mere: string;
    email_parent: string;
    acte_naissance_pere: File | string | null;
    acte_naissance_mere: File | string | null;
    statut: string;
    motif_rejet: string;
    agent_hopital_id: number;
    agent_mairie_id: number;
    hopital_id: number;
    mairie_id: number;
    created_at: string;
    updated_at: string;

    agent: string;
    date_naissance_formatted: string;
    created_at_formatted: string;
    hopital?: string;
    mairie?: string;
    agent_hopital?: {
        name: string;
    };
    agent_mairie?: string;
}

export interface Agent {
    id: number;
    name: string;
    email: string;
}

export interface Flash {
    success?: string;
    error?: string;
}

export interface PaginationData<T> {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    data: T[];
    next_page_url: string | null;
    prev_page_url: string | null;
}



export interface StatusCounts {
    recues_en_attente: number;
    validees: number;
    rejetees: number;
}


export interface RecentEntity {
    id: number;
    nom: string;
    adresse_complete?: string | null;
    type: 'mairie' | 'hopital' | 'user';
    created_at: string;
}



export interface HopitalDashboardProps {
    declarationsCount: number;
    newDeclarationsCount: number;
    recentDeclarations: Declaration[];
    user: User;
}

export interface MairieDashboardProps {
    statusCounts: StatusCounts;
    newDeclarationsCount: number;
    recentDeclarations: Declaration[];
    user: User;
}

export interface AdminPageProps {
    mairiesCount: number;
    hopitauxCount: number;
    usersCount: number;
    recentEntities: RecentEntity[];
}



export interface ShowProps {
    mairie: Mairie;
    hopital: Hopital,
    agents: Agent[];
    flash: Flash;
}

export interface PageProps {
    declaration: Declaration;
    provinces: Province[];
    communes: Commune[];
    arrondissements: Arrondissement[];
    mairie: Mairie;
    user: User;
    hopital: Hopital;
}

export interface IndexProps {
    declarations: PaginationData<Declaration>;
    filters: {
        field?: string;
        query?: string;
        status?: string;
    };
    flash: Flash,
    mairies: PaginationData<Mairie>;
    hopitaux: PaginationData<Hopital>
}

