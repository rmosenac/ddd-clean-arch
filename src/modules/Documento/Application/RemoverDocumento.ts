import { DocumentoRepository } from "../Infrastructure/DocumentoRepository";

export class RemoverDocumento{

    constructor(private repository = new DocumentoRepository())
    {}

    async execute(idDocumento: number){

        await this.repository.removerDocumento(idDocumento);
    }
}