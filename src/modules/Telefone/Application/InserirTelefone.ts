import { Telefone } from "../Domain/Telefone";
import { TelefoneRepository } from "../Infrastructure/TelefoneRepository";

export class InserirTelefone {

    constructor(private repository = new TelefoneRepository()) { }

    async execute(idTelefone: number, ddd: string, numeroTelefone: string, tipoTelefone: string, ativo: boolean) {

        const telefone = new Telefone(idTelefone, ddd, numeroTelefone, tipoTelefone, ativo);

        await this.repository.inserirTelefone(telefone);
    }
}