import { Documento } from "@/modules/Documento/Domain/Documento";
import { Telefone } from "@/modules/Telefone/Domain/Telefone";


export abstract class Usuario {

    private readonly _id: number;
    private _nome: string;
    private _genero: string;
    private _documento: Documento;
    private _telefones: Telefone[];


    constructor(id: number, nome: string, genero: string, idDocumento: number, numeroDocumento: string, tipoDocumento: string) {
        this._id = id;
        this._nome = nome;
        this._genero = genero;
        this._documento = new Documento(idDocumento, numeroDocumento, tipoDocumento)

        this._telefones = [];
    }



    get id() {
        return this._id;
    }

    get nome() {
        return this._nome;
    }

    get genero() {
        return this._genero;
    }

    get numeroDocumento() {
        return this._documento.numeroDocumento;
    }

    get tipoDocumento() {
        return this._documento.tipoDocumento;
    }



    set nome(nome: string) {
        this._nome = nome;
    }

    set genero(genero: string) {
        this._genero = genero;
    }



    atualizarDocumento(numeroDocumento: string, tipoDocumento: string) {
        this._documento.numeroDocumento = numeroDocumento;
        this._documento.tipoDocumento = tipoDocumento;
    }

    adicionarTelefone(telefone: Telefone) {
        this._telefones.push(telefone);
    }

    removerTelefone(numeroTelefone: string) {
        this._telefones = this._telefones.filter(telefone => telefone.numeroTelefone = numeroTelefone);
    }

    toString(){
        return `
        Id: ${this._id}
        Nome: ${this._nome}
        Genero: ${this._genero}
        
        Documento:
        ${this._documento.toString()}

        Telefones:
        ${this._telefones.join(' - ')}
        `;
    }
}