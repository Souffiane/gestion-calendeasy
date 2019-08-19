export interface Compte {
    id: number; 
    code: string;
    password: string,
    nom: string;
    email: string,
    forfait: string;
    nbManifestation: number;
    nbContact: number;
    dateDerniereConnexion: Date;
    dateCreation: Date;
}
