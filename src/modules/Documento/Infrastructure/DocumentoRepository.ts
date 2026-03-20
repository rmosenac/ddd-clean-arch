import { Documento } from "../Domain/Documento";

export class DocumentoRepository{

    private static documentos: Documento[] = [];


    // LISTAR DOCUMENTOS:
    async listarDocumentos(){
        return DocumentoRepository.documentos;
    }


    // INSERIR DOCUMENTO:
    async inserirDocumento(documento: Documento){
        DocumentoRepository.documentos.push(documento);
    }


    // BUSCAR POR ID:
    async buscarDocumentoPorId(idDocumento: number){
        return DocumentoRepository.documentos.find(doc => doc.idDocumento === idDocumento);
    }

    // REMOVER DOCUMENTO:
    async removerDocumento(idDocumento: number){
        DocumentoRepository.documentos = DocumentoRepository.documentos.filter(doc => doc.idDocumento !== idDocumento);
    }

    // ATUALIZAR DOCUMENTO:
    async atualizarDocumento(documento: Documento){

        // Buscando a posição em que o documento solicitado para autualizar está dentro do array.
        const indice = DocumentoRepository.documentos.findIndex(doc => doc.idDocumento === documento.idDocumento);

        if(indice !== -1){
            DocumentoRepository.documentos[indice] = documento;
        } else{
            console.log('Documento não encontrado!');
        }
    }
}