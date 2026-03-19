export class Telefone {

    private readonly _idTelefone: number;
    private _ddd: string;
    private _numeroTelefone: string;
    private _tipoTelefone: string;
    private _ativo: boolean;

    constructor(idTelefone: number, ddd: string, numeroTelefone: string, tipoTelefone: string, ativo: boolean) {
        this._idTelefone = idTelefone;
        this._ddd = ddd;
        this._numeroTelefone = numeroTelefone;
        this._tipoTelefone = tipoTelefone;
        this._ativo = ativo;
    }



    get idTelefone() {
        return this._idTelefone;
    }

    get ddd() {
        return this._ddd;
    }

    get numeroTelefone() {
        return this._numeroTelefone;
    }

    get tipoTelefone() {
        return this._tipoTelefone;
    }

    get ativo() {
        return this._ativo;
    }



    set ddd(ddd: string) {
        this._ddd = ddd
    }

    set numeroTelefone(numeroTelefone: string) {
        this._numeroTelefone = numeroTelefone
    }

    set tipoTelefone(tipoTelefone: string) {
        this._tipoTelefone = tipoTelefone
    }

    set ativo(ativo: boolean) {
        this._ativo = ativo
    }



    toString() {
        return `
        Id Telefone: ${this._idTelefone}
        DDD: ${this._ddd}
        Numero: ${this._numeroTelefone}
        Tipo: ${this._tipoTelefone}
        Ativo? ${this._ativo}`;
    }
}