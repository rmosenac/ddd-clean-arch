export class Documento {

    private readonly _idDocumento: number;
    private _numeroDocumento: string;
    private _tipoDocumento: string;

    constructor(idDocumento: number, numeroDocumento: string, tipoDocumento: string) {
        this._idDocumento = idDocumento;
        this._numeroDocumento = numeroDocumento; // usa setter (validação)
        this._tipoDocumento = tipoDocumento;
    }

    get idDocumento() {
        return this._idDocumento;
    }

    get numeroDocumento() {
        return this._numeroDocumento;
    }

    get tipoDocumento() {
        return this._tipoDocumento;
    }

    set numeroDocumento(numeroDocumento: string) {
        if (!numeroDocumento || numeroDocumento.trim() === "") {
            throw new Error("Número do documento inválido");
        }
        this._numeroDocumento = numeroDocumento;
    }

    set tipoDocumento(tipoDocumento: string) {
        if (!tipoDocumento || tipoDocumento.trim() === "") {
            throw new Error("Tipo do documento inválido");
        }
        this._tipoDocumento = tipoDocumento;
    }

    toString() {
        return `
        ID Documento: ${this._idDocumento}
        Numero Doc: ${this._numeroDocumento}
        Tipo Doc: ${this._tipoDocumento}`;
    }
}