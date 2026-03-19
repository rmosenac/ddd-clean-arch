import { Endereco } from "./Endereco";
import { Usuario } from "./Usuario";


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

    toString() {
        return super.toString() + `
        Idade: ${this._idade}
        Peso: ${this._peso}
        Altura: ${this._altura}

        ${this._endereco.toString()}`;
    }
}