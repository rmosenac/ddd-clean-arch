export class Documento {

    private readonly _idDocumento: number;
    private _numeroDocumento: string;
    private _tipoDocumento: string;

    constructor(idDocumento: number, numeroDoc: string, tipoDoc: string) {
        this._idDocumento = idDocumento;
        this._numeroDocumento = numeroDoc;
        this._tipoDocumento = tipoDoc;
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
        this._numeroDocumento = numeroDocumento;
    }

    set tipoDocumento(tipoDocumento: string) {
        this._tipoDocumento = tipoDocumento;
    }



    toString() {
        return `
        ID Documento: ${this._idDocumento}
        Numero Doc: ${this._numeroDocumento}
        Tipo Doc: ${this._tipoDocumento}`;
    }
}