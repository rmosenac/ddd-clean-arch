import { pool } from "@/database/database";
import { Endereco } from "../Domain/Endereco";

export class EnderecoRepository {

    async listarEnderecos() {

        const resultado = await pool.query(
            "SELECT * FROM endereco ORDER BY id_endereco"
        );

        return resultado.rows;
    }

    async buscarEnderecoPorId(idEndereco: number) {

        const resultado = await pool.query(
            `
            SELECT * FROM endereco
            WHERE id_endereco = $1
            `,
            [idEndereco]
        );

        return resultado.rows[0];
    }

    async inserirEndereco(endereco: Endereco) {

        await pool.query(
            `
            INSERT INTO endereco
            (logradouro, numero, bairro, cidade, estado)
            VALUES ($1, $2, $3, $4, $5)
            `,
            [
                endereco.logradouro,
                endereco.numero,
                endereco.bairro,
                endereco.cidade,
                endereco.estado
            ]
        );
    }

    async removerEndereco(idEndereco: number) {

        await pool.query(
            `
            DELETE FROM endereco
            WHERE id_endereco = $1
            `,
            [idEndereco]
        );
    }

    async atualizarEndereco(endereco: Endereco) {

        await pool.query(
            `
            UPDATE endereco
            SET logradouro = $1,
                numero = $2,
                bairro = $3,
                cidade = $4,
                estado = $5
            WHERE id_endereco = $6
            `,
            [
                endereco.logradouro,
                endereco.numero,
                endereco.bairro,
                endereco.cidade,
                endereco.estado,
                endereco.idEndereco
            ]
        );
    }
}
