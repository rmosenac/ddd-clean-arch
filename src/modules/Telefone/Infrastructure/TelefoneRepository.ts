import { pool } from "@/database/database";
import { Telefone } from "../Domain/Telefone";

export class TelefoneRepository {

    async listarTelefones() {

        const resultado = await pool.query(
            "SELECT * FROM telefone ORDER BY id_telefone"
        );

        return resultado.rows;
    }

    async buscarTelefonePorId(idTelefone: number) {

        const resultado = await pool.query(
            `
            SELECT * FROM telefone
            WHERE id_telefone = $1
            `,
            [idTelefone]
        );

        return resultado.rows[0];
    }

    async buscarTelefonePorNumero(numeroTelefone: string) {

        const resultado = await pool.query(
            `
            SELECT * FROM telefone
            WHERE numero_telefone = $1
            `,
            [numeroTelefone]
        );

        return resultado.rows[0];
    }

    async inserirTelefone(telefone: Telefone) {

        await pool.query(
            `
            INSERT INTO telefone
            (ddd, numero_telefone, tipo_telefone, ativo)
            VALUES ($1, $2, $3, $4)
            `,
            [
                telefone.ddd,
                telefone.numeroTelefone,
                telefone.tipoTelefone,
                telefone.ativo
            ]
        );
    }

    async removerTelefone(idTelefone: number) {

        await pool.query(
            `
            DELETE FROM telefone
            WHERE id_telefone = $1
            `,
            [idTelefone]
        );
    }

    async atualizarTelefone(telefone: Telefone) {

        await pool.query(
            `
            UPDATE telefone
            SET ddd = $1,
                numero_telefone = $2,
                tipo_telefone = $3,
                ativo = $4
            WHERE id_telefone = $5
            `,
            [
                telefone.ddd,
                telefone.numeroTelefone,
                telefone.tipoTelefone,
                telefone.ativo,
                telefone.idTelefone
            ]
        );
    }
}
