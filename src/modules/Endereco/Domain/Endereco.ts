export class Endereco {

    private readonly _idEndereco: number;
    private _logradouro: string;
    private _numero: number;
    private _bairro: string;
    private _cidade: string;
    private _estado: string;

    constructor(
        idEndereco: number,
        logradouro: string,
        numero: number,
        bairro: string,
        cidade: string,
        estado: string
    ) {
        this._idEndereco = idEndereco;
        this._logradouro = logradouro;
        this._numero = numero;
        this._bairro = bairro;
        this._cidade = cidade;
        this._estado = estado;
    }

    get idEndereco() {
        return this._idEndereco;
    }

    get logradouro() {
        return this._logradouro;
    }

    get numero() {
        return this._numero;
    }

    get bairro() {
        return this._bairro;
    }

    get cidade() {
        return this._cidade;
    }

    get estado() {
        return this._estado;
    }

    set logradouro(logradouro: string) {
        if (!logradouro || logradouro.trim() === "") {
            throw new Error("Logradouro inválido");
        }
        this._logradouro = logradouro;
    }

    set numero(numero: number) {
        if (numero <= 0) {
            throw new Error("Número inválido");
        }
        this._numero = numero;
    }

    set bairro(bairro: string) {
        if (!bairro || bairro.trim() === "") {
            throw new Error("Bairro inválido");
        }
        this._bairro = bairro;
    }

    set cidade(cidade: string) {
        if (!cidade || cidade.trim() === "") {
            throw new Error("Cidade inválida");
        }
        this._cidade = cidade;
    }

    set estado(estado: string) {
        if (!estado || estado.trim() === "") {
            throw new Error("Estado inválido");
        }
        this._estado = estado;
    }

    toString() {
        return `
        ID Endereco: ${this._idEndereco}
        Logradouro: ${this._logradouro}
        Numero: ${this._numero}
        Bairro: ${this._bairro}
        Cidade: ${this._cidade}
        Estado: ${this._estado}`;
    }
}