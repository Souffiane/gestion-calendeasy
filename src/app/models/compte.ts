export class Compte {
    constructor(
        private id:number, 
        private codeClient:string,
        private nom:string,
        private typeAbo:string,
        private dateCreation:Date,
        ) {
    }
}
