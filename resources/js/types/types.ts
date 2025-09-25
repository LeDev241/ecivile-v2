// ===================== USERS & AGENTS =====================
export interface User {
    id: number;
    name: string;
    email: string;
    role?: string;
    mairie_id?: number;
    hopital_id?: number;
    created_at?: string;
    updated_at?: string;

    mairie?: Mairie | null;
    hopital?: Hopital | null;
}

export interface Agent {
    id: number;
    name: string;
    email: string;
}

// ===================== LOCALISATION =====================
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

// ===================== STRUCTURES =====================
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
    created_at: string;
    updated_at: string;

    province?: Province;
    commune?: Commune;
    arrondissement?: Arrondissement;
}

export interface Hopital {
    id: number;
    nom: string;
    email: string;
    adresse_complete: string;
    description_courte: string;
    telephone_principal: string;
    type_etablissement: string;
    code_postal: string;
    user_id: number;
    mairie_id: number;
    created_at: string;
    updated_at: string;

    mairie?: Mairie;
}

// ===================== DECLARATION =====================
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
    motif_rejet: string | null;

    agent_hopital_id: number;
    agent_mairie_id: number;
    hopital_id: number;
    mairie_id: number;

    created_at: string;
    updated_at: string;

    // Relations et formats
    agent: string;
    date_naissance_formatted: string;
    created_at_formatted: string;
    hopital?: string;
    mairie?: string;
    agent_hopital?: { name: string };
    agent_mairie?: { name: string };
}

// ===================== HELPERS =====================
export interface Flash {
    success?: string;
    error?: string;
}

export interface BySex {
    masculin: number;
    feminin: number;
}

export interface ByStatus {
    validee?: number;
    rejetee?: number;
    envoyee?: number;
    en_attente?: number;
    [key: string]: number | undefined; // permet flexibilité
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

// ===================== PROPS =====================
export interface HopitalDashboardProps {
    declarationsCount: number;
    newDeclarationsCount: number;
    recentDeclarations: Declaration[];
    user: User;
    bySex: BySex;
    byStatus: ByStatus;
    mostActiveAgent: string | null;
}

export interface MairieDashboardProps {
    statusCounts: StatusCounts;
    newDeclarationsCount: number;
    recentDeclarations: Declaration[];
    user: User;
    bySex: BySex;
    byStatus: ByStatus;
    totalDeclarations: number;
    byMonth: Record<string, number>;
    byCreator: Record<string, number>;
    byYear: Record<string, number>

}


export interface AdminPageProps {
    mairiesCount: number;
    hopitauxCount: number;
    usersCount: number;
    recentEntities: RecentEntity[];
}

export interface ShowProps {
    mairie: Mairie;
    hopital: Hopital;
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
    flash: Flash;
    mairies: PaginationData<Mairie>;
    hopitaux: PaginationData<Hopital>;
}

export interface StatisticProps {
    totalDeclarations: number;
    totalPending: number;
    bySex: Record<string, number>;
    byCreator: Record<string, number>;
    byYear: Record<string, number>;
    byMonth: Record<string, number>;
    byStatus: Record<string, number>;
}