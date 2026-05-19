
import { pool } from "@/database/database";
import { Documento } from "../Domain/Documento";


export class DocumentoRepository {


    // LISTAR DOCUMENTOS
    async listarDocumentos() {

        const resultado = await pool.query(
            `SELECT * FROM documento ORDER BY id_documento`
        );

        return resultado.rows.map(doc =>
            new Documento(
                doc.id_documento,
                doc.numero_documento,
                doc.tipo_documento
            )
        );
    }





    // INSERIR DOCUMENTO
    async inserirDocumento(documento: Documento) {

        await pool.query(
            `
            INSERT INTO documento
            (
                id_documento,
                numero_documento,
                tipo_documento
            )
            VALUES ($1, $2, $3)
            `,
            [
                documento.idDocumento,
                documento.numeroDocumento,
                documento.tipoDocumento
            ]
        );
    }





    // BUSCAR DOCUMENTO POR ID
    async buscarDocumentoPorId(idDocumento: number) {

        const resultado = await pool.query(
            `
            SELECT * FROM documento
            WHERE id_documento = $1
            `,
            [idDocumento]
        );

        // SE NÃO ENCONTRAR
        if (resultado.rows.length === 0) {
            return null;
        }

        const doc = resultado.rows[0];

        return new Documento(
            doc.id_documento,
            doc.numero_documento,
            doc.tipo_documento
        );
    }





    // REMOVER DOCUMENTO
    async removerDocumento(idDocumento: number) {

        await pool.query(
            `
            DELETE FROM documento
            WHERE id_documento = $1
            `,
            [idDocumento]
        );
    }





    // ATUALIZAR DOCUMENTO
    async atualizarDocumento(documento: Documento) {

        await pool.query(
            `
            UPDATE documento
            SET
                numero_documento = $1,
                tipo_documento = $2
            WHERE id_documento = $3
            `,
            [
                documento.numeroDocumento,
                documento.tipoDocumento,
                documento.idDocumento
            ]
        );
    }





    // EXEMPLO RODANDO EM MEMÓRIA ATRAVÉS DE ARRAYS:

    /*
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
 
    */

}