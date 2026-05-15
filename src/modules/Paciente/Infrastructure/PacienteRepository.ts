import { pool } from "@/database/database";
import { Paciente } from "../Domain/Paciente";
import { Endereco } from "@/modules/Endereco/Domain/Endereco";

export class PacienteRepository {

    async listarPacientes() {
    
        const resultado = await pool.query(
            `SELECT 
            p.id, p.nome, p.genero, p.idade, p.peso, p.altura,
            d.id_documento, d.numero_documento, d.tipo_documento,
            e.id_endereco, e.logradouro, e.numero, e.bairro, e.cidade, e.estado

            FROM paciente AS p
            INNER JOIN documento AS d ON p.id_documento = d.id_documento
            INNER JOIN endereco AS e ON p.id_endereco = e.id_endereco

            ORDER BY p.id;
            `
        );

        return resultado.rows.map(pac => {
            const endereco = new Endereco(pac.id_endereco, pac.logradouro, pac.numero, pac.bairro, pac.cidade, pac.estado);

            return new Paciente(pac.id, pac.nome, pac.genero, pac.idade, pac.peso, pac.altura, pac.id_documento, pac.numero_documento, pac.tipo_documento, endereco);
        });
    }


    async inserirPaciente(paciente: Paciente) {

        await pool.query(
            `INSERT INTO documento (numero_documento, tipo_documento, id_paciente)
            VALUES ($1, $2, $3)`, [paciente.numeroDocumento, paciente.tipoDocumento, paciente.id]
        );

        await pool.query(
            `INSERT INTO endereco (logradouro, numero, bairro, cidade, estado, id_paciente)
            VALUES ($1, $2, $3, $4, $5, $6)`, [paciente.endereco.logradouro, paciente.endereco.numero, paciente.endereco.bairro, paciente.endereco.cidade, paciente.endereco.estado, paciente.id]
        );


        // AJUSTAR A TABELA PACIENTE NO BANCO DE DADOS PARA QUE HAJA AS CHAVES ESTRANGEIRAS!

        await pool.query(
            `INSERT INTO paciente (nome, genero, idade, peso, altura, id_documento, id_endereco)
            VALUES($1, $2, $3, $4, $5, $6, $7)`, [paciente.nome, paciente.genero, paciente.idade, paciente.peso, paciente.altura, null, null]
        );
    }

    async removerPaciente(idPaciente: number) {

        await pool.query(
            `DELETE FROM paciente WHERE id = $1`, [idPaciente]
        );

        await pool.query(
            `DELETE FROM documento WHERE id_documento = $1`, [idPaciente]
        );

        await pool.query(
            `DELETE FROM endereco WHERE id_endereco = $1`, [idPaciente]
        )
    }


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