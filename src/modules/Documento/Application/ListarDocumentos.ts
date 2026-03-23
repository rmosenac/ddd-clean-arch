import { DocumentoRepository } from "../Infrastructure/DocumentoRepository";

export class ListarDocumentos{

    constructor(private repository = new DocumentoRepository())
    {}

    async execute(){
        return this.repository.listarDocumentos();
    }
}