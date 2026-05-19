import { pool } from "@/database/database";
import { Documento } from "../Domain/Documento";

export class DocumentoRepository {

    async listarDocumentos() {

        const resultado = await pool.query(
            "SELECT * FROM documento ORDER BY id_documento"
        );

        return resultado.rows;
    }

    async inserirDocumento(documento: Documento) {

        await pool.query(
            `
            INSERT INTO documento
            (numero_documento, tipo_documento)
            VALUES ($1, $2)
            `,
            [
                documento.numeroDocumento,
                documento.tipoDocumento
            ]
        );
    }

    async buscarDocumentoPorId(idDocumento: number) {

        const resultado = await pool.query(
            `
            SELECT * FROM documento
            WHERE id_documento = $1
            `,
            [idDocumento]
        );

        return resultado.rows[0];
    }

    async removerDocumento(idDocumento: number) {

        await pool.query(
            `
            DELETE FROM documento
            WHERE id_documento = $1
            `,
            [idDocumento]
        );
    }

    async atualizarDocumento(documento: Documento) {

        await pool.query(
            `
            UPDATE documento
            SET numero_documento = $1,
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
}
