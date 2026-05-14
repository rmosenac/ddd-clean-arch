import { pool } from "@/database/database";
import { Endereco } from "../Domain/Endereco";

export class EnderecoRepository {


    async listarEnderecos() {
        const resultado = await pool.query(
            `SELECT * FROM endereco ORDER BY id_endereco`
        )

        return resultado.rows.map(end =>
            new Endereco(end.id_endereco, end.logradouro, end.numero, end.bairro, end.cidade, end.estado)
        );
    }


    async buscarEnderecoPorId(idEndereco: number) {

        const resultado = await pool.query(
            `SELECT * FROM endereco WHERE id_endereco = $1`, [idEndereco]
        );

        if (resultado.rows.length === 0) {
            return null;
        }

        const end = resultado.rows[0];

        return new Endereco(end.id_endereco, end.logradouro, end.numero, end.bairro, end.cidade, end.estado);
    }


    async inserirEndereco(endereco: Endereco) {

        await pool.query(
            `ÌNSERT INTO endereco (id_endereco, logradouro, numero, bairro, cidade, estado)
            VALUES ($1, $2, $3, $4, $5, $6)`, [endereco.idEndereco, endereco.logradouro, endereco.numero, endereco.bairro, endereco.cidade, endereco.estado]
        );
    }


    async removerEndereco(idEndereco: number) {

        await pool.query(
            `DELETE FROM endereco WHERE id_endereco = $1`, [idEndereco]
        );

    }


    async atualizarEndereco(endereco: Endereco) {

        await pool.query(
            `UPDATE endereco SET logradouro = $1, numero = $2, bairro = $3, cidade = $4, estado = $5 WHERE id_endereco = $6`,
            [endereco.logradouro, endereco.numero, endereco.bairro, endereco.cidade, endereco.estado, endereco.idEndereco]
        );
    }


    /*
    private static enderecos: Endereco[] = [];

    async listarEnderecos() {
        return EnderecoRepository.enderecos;
    }

    async buscarEnderecoPorId(idEndereco: number) {
        return EnderecoRepository.enderecos
            .find(endereco => endereco.idEndereco === idEndereco);
    }

    async inserirEndereco(endereco: Endereco) {
        EnderecoRepository.enderecos.push(endereco);
    }

    async removerEndereco(idEndereco: number) {
        EnderecoRepository.enderecos =
            EnderecoRepository.enderecos
                .filter(endereco => endereco.idEndereco !== idEndereco);
    }

    async atualizarEndereco(endereco: Endereco) {
        const indice = EnderecoRepository.enderecos
            .findIndex(end => end.idEndereco === endereco.idEndereco);

        if (indice !== -1) {
            EnderecoRepository.enderecos[indice] = endereco;
        } else {
            throw new Error("Endereço não encontrado!");
        }
    }
    */
}