import { TelefoneRepository } from "../Infrastructure/TelefoneRepository";

export class ListarTelefones {

    constructor(private repository = new TelefoneRepository()) { }

    async execute() {
        return this.repository.listarTelefones(); // corrigido
    }
}