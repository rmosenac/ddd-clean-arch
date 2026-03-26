import { Endereco } from "@/modules/Endereco/Domain/Endereco";
import { Usuario } from "@/modules/Usuario/Domain/Usuario";


export class Paciente extends Usuario {

    private _idade: number;
    private _peso: number;
    private _altura: number;
    private _endereco: Endereco;

    constructor(id: number, nome: string, genero: string, idade: number, peso: number, altura: number, idDocumento: number, numeroDocumento: string, tipoDocumento: string, endereco: Endereco) {
        super(id, nome, genero, idDocumento, numeroDocumento, tipoDocumento);

        this._idade = idade;
        this._peso = peso;
        this._altura = altura;
        this._endereco = endereco;

        // this.prontuario = new Prontuario(this);
    }

    get id(){
        return super.id;
    }

    
    get idade() {
        return this._idade;
    }

    get peso() {
        return this._peso;
    }

    get altura() {
        return this._altura;
    }

    get endereco() {
        return this._endereco;
    }


    set idade(idade: number) {
        this._idade = idade;
    }

    set peso(peso: number) {
        this._peso = peso;
    }


    set altura(altura: number) {
        this._altura = altura;
    }

    set endereco(endereco: Endereco) {
        this._endereco = endereco;
    }

    toString() {
        return super.toString() + `
        Idade: ${this._idade}
        Peso: ${this._peso}
        Altura: ${this._altura}

        ${this._endereco.toString()}`;
    }
}