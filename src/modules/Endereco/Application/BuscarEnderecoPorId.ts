import { EnderecoRepository } from "../Infrastructure/EnderecoRepository";

export class BuscarEnderecoPorId {

    constructor(private repository = new EnderecoRepository()) { }

    async execute(idEndereco: number) {
        return this.repository.buscarEnderecoPorId(idEndereco);
    }
}