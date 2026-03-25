import { TelefoneRepository } from "../Infrastructure/TelefoneRepository";

export class RemoverTelefone {

    constructor(private repository = new TelefoneRepository()) { }

    async execute(idTelefone: number) {

        await this.repository.removerTelefone(idTelefone);

    }
}