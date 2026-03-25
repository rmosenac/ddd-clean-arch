import { TelefoneRepository } from "../Infrastructure/TelefoneRepository";

export class BuscarTelefonePorNumero {

    constructor(private repository = new TelefoneRepository()) { }

    async execute(numeroTelefone: string) {
        return this.repository.buscarTelefonePorNumero(numeroTelefone);
    }
}