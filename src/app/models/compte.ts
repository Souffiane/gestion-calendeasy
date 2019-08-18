export interface Compte {
    id: number; 
    code: string;
    nom: string;
    email: string,
    forfait: string;
    nbManifestation: number;
    nbContact: number;
    dateDerniereConnexion: Date;
    dateCreation: Date;
}
