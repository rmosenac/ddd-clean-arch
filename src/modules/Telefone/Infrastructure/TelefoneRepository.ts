import { pool } from "@/database/database";
import { Telefone } from "../Domain/Telefone";

export class TelefoneRepository {

    async listarTelefones() {

        const resultado = await pool.query(
            `SELECT * FROM telefone ORDER BY id_telefone`
        );

        return resultado.rows.map(tel =>
            new Telefone(tel.id_telefone, tel.ddd, tel.numero_telefone, tel.tipo_telefone, tel.ativo)
        );
    }


    async buscarTelefonePorId(idTelefone: number) {

        const resultado = await pool.query(
            `SELECT * FROM telefone WHERE id_telefone = $1`[idTelefone]
        );

        if (resultado.rows.length === 0) {
            return null;
        }

        const tel = resultado.rows[0];

        return new Telefone(tel.id_telefone, tel.ddd, tel.numero_telefone, tel.tipo_telefone, tel.ativo);
    }



    async buscarTelefonePorNumero(numeroTelefone: string) {

        const resultado = await pool.query(
            `SELECT * FROM telefone WHERE numero_telefone = $1`, [numeroTelefone]
        );

        if (resultado.rows.length === 0) {
            return null;
        }

        const tel = resultado.rows[0];

        return new Telefone(tel.id_telefone, tel.ddd, tel.numero_telefone, tel.tipo_telefone, tel.ativo);
    }


    async inserirTelefone(telefone: Telefone) {

        await pool.query(
            `INSERT INTO telefone (id_telefone, ddd, numero_telefone, tipo_telefone, ativo)
            VALUES ($1, $2, $3, $4, $5)`, [telefone.idTelefone, telefone.ddd, telefone.numeroTelefone, telefone.tipoTelefone, telefone.ativo]
        );
    }


    async removerTelefone(idTelefone: number) {
    
        await pool.query(
            `DELETE FROM telefone WHERE id_telefone = $1`, [idTelefone]
        );
    }
    

    /*
    private static telefones: Telefone[] = [];

    async listarTelefones() {
        return TelefoneRepository.telefones;
    }

    async buscarTelefonePorId(idTelefone: number) {
        return TelefoneRepository.telefones
            .find(telefone => telefone.idTelefone === idTelefone);
    }

    async buscarTelefonePorNumero(numeroTelefone: string) {
        return TelefoneRepository.telefones
            .find(telefone => telefone.numeroTelefone === numeroTelefone);
    }

    async inserirTelefone(telefone: Telefone) {
        TelefoneRepository.telefones.push(telefone);
    }

    async removerTelefone(idTelefone: number) {
        TelefoneRepository.telefones =
            TelefoneRepository.telefones
                .filter(telefone => telefone.idTelefone !== idTelefone);
    }

    async atualizarTelefone(telefone: Telefone) {

        const indice = TelefoneRepository.telefones
            .findIndex(t => t.idTelefone === telefone.idTelefone);

        if (indice !== -1) {
            TelefoneRepository.telefones[indice] = telefone;
        } else {
            throw new Error("Telefone não encontrado!");
        }
    }*/
}