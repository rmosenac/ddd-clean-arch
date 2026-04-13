import { Endereco } from "../Domain/Endereco";

export class EnderecoRepository {

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
}