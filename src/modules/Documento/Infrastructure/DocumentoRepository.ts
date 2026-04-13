import { Documento } from "../Domain/Documento";

export class DocumentoRepository {

    private static documentos: Documento[] = [];

    async listarDocumentos() {
        return DocumentoRepository.documentos;
    }

    async inserirDocumento(documento: Documento) {
        DocumentoRepository.documentos.push(documento);
    }

    async buscarDocumentoPorId(idDocumento: number) {
        return DocumentoRepository.documentos.find(doc => doc.idDocumento === idDocumento);
    }

    async removerDocumento(idDocumento: number) {
        DocumentoRepository.documentos =
            DocumentoRepository.documentos.filter(doc => doc.idDocumento !== idDocumento);
    }

    async atualizarDocumento(documento: Documento) {
        const indice = DocumentoRepository.documentos
            .findIndex(doc => doc.idDocumento === documento.idDocumento);

        if (indice !== -1) {
            DocumentoRepository.documentos[indice] = documento;
        } else {
            throw new Error("Documento não encontrado!");
        }
    }
}