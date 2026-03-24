import { EnderecoRepository } from "../Infrastructure/EnderecoRepository";

export class RemoverEndereco {

    constructor(private repository = new EnderecoRepository()) { }

    async execute(idEndereco: number) {

        await this.repository.removerEndereco(idEndereco);

    }
}