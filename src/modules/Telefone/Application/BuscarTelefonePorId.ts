import { TelefoneRepository } from "../Infrastructure/TelefoneRepository";

export class BuscarTelefonePorId {

    constructor(private repository = new TelefoneRepository()) { }

    async execute(idTelefone: number) {
        return this.repository.buscarTelefonePorId(idTelefone);
    }
}