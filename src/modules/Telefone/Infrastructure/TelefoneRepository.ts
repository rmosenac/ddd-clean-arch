import { Telefone } from "../Domain/Telefone";

export class TelefoneRepository {

    private static telefones: Telefone[] = [];

    // LISTAR TELEFONES:
    async listarTelefones() {
        return TelefoneRepository.telefones;
    }


    // BUSCAR TELEFONE POR ID:
    async buscarTelefonePorId(idTelefone: number) {
        return TelefoneRepository.telefones.find(telefone => telefone.idTelefone === idTelefone);
    }


    // BUSCAR TELEFONE POR NUMERO:
    async buscarTelefonePorNumero(numeroTelefone: string) {
        return TelefoneRepository.telefones.find(telefone => telefone.numeroTelefone === numeroTelefone);
    }


    // INSERIR NOVO TELEFONE
    async inserirTelefone(telefone: Telefone) {
        TelefoneRepository.telefones.push(telefone);
    }


    // REMOVER TELEFONE:
    async removerTelefone(idTelefone: number) {
        TelefoneRepository.telefones = TelefoneRepository.telefones.filter(telefone => telefone.idTelefone !== idTelefone);
    }


    // ATUALIZAR TELEFONE:
    async atualizarTelefone(telefone: Telefone) {

        // Buscando a posição em que o telefone solicitado para autualizar está dentro do array.
        const indice = TelefoneRepository.telefones.findIndex(telefone => telefone.idTelefone === telefone.idTelefone);

        if (indice !== -1) {
            TelefoneRepository.telefones[indice] = telefone;
        } else {
            console.log('Endereço não encontrado!');
        }
    }
}