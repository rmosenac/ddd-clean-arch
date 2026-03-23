import { DocumentoRepository } from "../Infrastructure/DocumentoRepository";

export class BuscarDocumentoPorId{

    constructor(private repository = new DocumentoRepository())
    {}

    async execute(idDocumento: number){

        return this.repository.buscarDocumentoPorId(idDocumento);
    }
}