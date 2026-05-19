import { pool } from "@/database/database";
import { Endereco } from "@/modules/Endereco/Domain/Endereco";
import { Paciente } from "../Domain/Paciente";

export class PacienteRepository {


    // LISTAR PACIENTES
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


        return resultado.rows.map(pac => {

            const endereco = new Endereco(
                pac.id_endereco,
                pac.logradouro,
                pac.numero,
                pac.bairro,
                pac.cidade,
                pac.estado
            );


            return new Paciente(
                pac.id,
                pac.nome,
                pac.genero,
                pac.idade,
                pac.peso,
                pac.altura,
                pac.id_documento,
                pac.numero_documento,
                pac.tipo_documento,
                endereco
            );
        });
    }





    // INSERIR PACIENTE
    async inserirPaciente(paciente: Paciente) {


        /*
        COMO O DOCUMENTO E ENDEREÇO SÃO RELACIONADOS AO PACIENTE,
        PRIMEIRO INSERIMOS ELES.
        */



        // INSERIR DOCUMENTO
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
                paciente.id,
                paciente.numeroDocumento,
                paciente.tipoDocumento
            ]
        );



        // INSERIR ENDEREÇO
        await pool.query(
            `
            INSERT INTO endereco
            (
                id_endereco,
                logradouro,
                numero,
                bairro,
                cidade,
                estado
            )
            VALUES ($1, $2, $3, $4, $5, $6)
            `,
            [
                paciente.id,
                paciente.endereco.logradouro,
                paciente.endereco.numero,
                paciente.endereco.bairro,
                paciente.endereco.cidade,
                paciente.endereco.estado
            ]
        );



        // INSERIR PACIENTE
        await pool.query(
            `
            INSERT INTO paciente
            (
                id,
                nome,
                genero,
                idade,
                peso,
                altura,
                id_documento,
                id_endereco
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            `,
            [
                paciente.id,
                paciente.nome,
                paciente.genero,
                paciente.idade,
                paciente.peso,
                paciente.altura,
                paciente.id,
                paciente.id
            ]
        );
    }





    // BUSCAR PACIENTE POR ID
    async buscarPacientePorId(idPaciente: number) {

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

            WHERE p.id = $1
            `,
            [idPaciente]
        );

        if (resultado.rows.length === 0) {
            return null;
        }

        const pac = resultado.rows[0];

        const endereco = new Endereco(
            pac.id_endereco,
            pac.logradouro,
            pac.numero,
            pac.bairro,
            pac.cidade,
            pac.estado
        );

        return new Paciente(
            pac.id,
            pac.nome,
            pac.genero,
            pac.idade,
            pac.peso,
            pac.altura,
            pac.id_documento,
            pac.numero_documento,
            pac.tipo_documento,
            endereco
        );
    }





    // REMOVER PACIENTE
    async removerPaciente(idPaciente: number) {

        /*
        PRIMEIRO REMOVE O PACIENTE
        POR CAUSA DAS CHAVES ESTRANGEIRAS.
        */

        await pool.query(
            `
            DELETE FROM paciente
            WHERE id = $1
            `,
            [idPaciente]
        );

        await pool.query(
            `
            DELETE FROM documento
            WHERE id_documento = $1
            `,
            [idPaciente]
        );

        await pool.query(
            `
            DELETE FROM endereco
            WHERE id_endereco = $1
            `,
            [idPaciente]
        );
    }





    // ATUALIZAR PACIENTE
    async atualizarPaciente(paciente: Paciente) {


        // ATUALIZAR DOCUMENTO
        await pool.query(
            `
            UPDATE documento
            SET
                numero_documento = $1,
                tipo_documento = $2
            WHERE id_documento = $3
            `,
            [
                paciente.numeroDocumento,
                paciente.tipoDocumento,
                paciente.id
            ]
        );



        // ATUALIZAR ENDEREÇO
        await pool.query(
            `
            UPDATE endereco
            SET
                logradouro = $1,
                numero = $2,
                bairro = $3,
                cidade = $4,
                estado = $5
            WHERE id_endereco = $6
            `,
            [
                paciente.endereco.logradouro,
                paciente.endereco.numero,
                paciente.endereco.bairro,
                paciente.endereco.cidade,
                paciente.endereco.estado,
                paciente.id
            ]
        );



        // ATUALIZAR PACIENTE
        await pool.query(
            `
            UPDATE paciente
            SET
                nome = $1,
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





    // EXEMPLO RODANDO EM MEMÓRIA ATRAVÉS DE ARRAYS:

    /*
    private static pacientes: Paciente[] = [];

    async listarPacientes() {
        return PacienteRepository.pacientes;
    }

    async inserirPaciente(paciente: Paciente) {
        PacienteRepository.pacientes.push(paciente);
    }

    async buscarPacientePorId(idPaciente: number) {
        return PacienteRepository.pacientes
            .find(pac => pac.id === idPaciente);
    }

    async removerPaciente(idPaciente: number) {
        PacienteRepository.pacientes =
            PacienteRepository.pacientes
                .filter(pac => pac.id !== idPaciente);
    }

    async atualizarPaciente(paciente: Paciente) {

        const indice = PacienteRepository.pacientes
            .findIndex(pac => pac.id === paciente.id);

        if (indice !== -1) {
            PacienteRepository.pacientes[indice] = paciente;
        } else {
            throw new Error("Paciente não encontrado!");
        }
    }

    */
}