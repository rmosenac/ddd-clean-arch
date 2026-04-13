import { Telefone } from "../Domain/Telefone";

export class TelefoneRepository {

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
    }
}