import { DocumentoRepository } from "../Infrastructure/DocumentoRepository";

export class AtualizarDocumento {

    constructor(private repository = new DocumentoRepository()) { }

    async execute(idDocumento: number, numeroDocumento: string, tipoDocumento: string) {

        const doc = await this.repository.buscarDocumentoPorId(idDocumento);

        if (!doc) {
            throw new Error("Documento não existe!");
        }

        doc.numeroDocumento = numeroDocumento;
        doc.tipoDocumento = tipoDocumento;

        await this.repository.atualizarDocumento(doc);
    }
}