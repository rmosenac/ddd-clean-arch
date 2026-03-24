import { EnderecoRepository } from "../Infrastructure/EnderecoRepository";

export class AtualizarEndereco {

    constructor(private repository = new EnderecoRepository()) { }

    async execute(idEndereco: number, logradouro: string, numero: number, bairro: string, cidade: string, estado: string) {

        const end = await this.repository.buscarEnderecoPorId(idEndereco);

        if (!end) {
            console.log('Documento não existe!');
        } else {
            end.logradouro = logradouro;
            end.numero = numero;
            end.bairro = bairro;
            end.cidade = cidade;
            end.estado = estado;
        }

        await this.repository.atualizarEndereco(end!);
    }
}