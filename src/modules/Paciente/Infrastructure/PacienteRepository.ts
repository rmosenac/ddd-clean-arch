import { pool } from "@/database/database";
import { Endereco } from "@/modules/Endereco/Domain/Endereco";
import { Paciente } from "../Domain/Paciente";

export class PacienteRepository {

    async listarPacientes() {

        const resultado = await pool.query(
            `
            SELECT
                p.id,
                p.nome,
                p.genero,
                p.idade,
                p.peso,
                p.altura,

                d.id_documento,
                d.numero_documento,
                d.tipo_documento,

                e.id_endereco,
                e.logradouro,
                e.numero,
                e.bairro,
                e.cidade,
                e.estado

            FROM paciente p

            INNER JOIN documento d
                ON p.id_documento = d.id_documento

            INNER JOIN endereco e
                ON p.id_endereco = e.id_endereco

            ORDER BY p.id
            `
        );

        return resultado.rows.map((row: any) => {

            const endereco = new Endereco(
                row.id_endereco,
                row.logradouro,
                row.numero,
                row.bairro,
                row.cidade,
                row.estado
            );

            return new Paciente(
                row.id,
                row.nome,
                row.genero,
                row.idade,
                row.peso,
                row.altura,
                row.id_documento,
                row.numero_documento,
                row.tipo_documento,
                endereco
            );
        });
    }

    async inserirPaciente(paciente: Paciente) {

        const documentoResultado = await pool.query(
            `
            INSERT INTO documento
            (numero_documento, tipo_documento)
            VALUES ($1, $2)
            RETURNING id_documento
            `,
            [
                paciente.numeroDocumento,
                paciente.tipoDocumento
            ]
        );

        const idDocumento = documentoResultado.rows[0].id_documento;

        const enderecoResultado = await pool.query(
            `
            INSERT INTO endereco
            (logradouro, numero, bairro, cidade, estado)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id_endereco
            `,
            [
                paciente.endereco.logradouro,
                paciente.endereco.numero,
                paciente.endereco.bairro,
                paciente.endereco.cidade,
                paciente.endereco.estado
            ]
        );

        const idEndereco = enderecoResultado.rows[0].id_endereco;

        await pool.query(
            `
            INSERT INTO paciente
            (nome, genero, idade, peso, altura, id_documento, id_endereco)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            `,
            [
                paciente.nome,
                paciente.genero,
                paciente.idade,
                paciente.peso,
                paciente.altura,
                idDocumento,
                idEndereco
            ]
        );
    }

    async buscarPacientePorId(idPaciente: number) {

        const pacientes = await this.listarPacientes();

        return pacientes.find(p => p.id === idPaciente);
    }

    async removerPaciente(idPaciente: number) {

        await pool.query(
            `
            DELETE FROM paciente
            WHERE id = $1
            `,
            [idPaciente]
        );
    }

    async atualizarPaciente(paciente: Paciente) {

        await pool.query(
            `
            UPDATE paciente
            SET nome = $1,
                genero = $2,
                idade = $3,
                peso = $4,
                altura = $5
            WHERE id = $6
            `,
            [
                paciente.nome,
                paciente.genero,
                paciente.idade,
                paciente.peso,
                paciente.altura,
                paciente.id
            ]
        );
    }
}
