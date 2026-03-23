import { Documento } from "../Domain/Documento";
import { DocumentoRepository } from "../Infrastructure/DocumentoRepository";

export class inserirDocumento{

    constructor(private repository = new DocumentoRepository())
    {}

    async execute(idDocumento: number, numeroDocumento: string, tipoDocumento: string){

        const doc = new Documento(idDocumento, numeroDocumento, tipoDocumento);

        await this.repository.inserirDocumento(doc);
    }
}