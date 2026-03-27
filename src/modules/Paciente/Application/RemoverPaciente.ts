import { PacienteRepository } from "../Infrastructure/PacienteRepository";

export class RemoverPaciente{

    constructor(private repository = new PacienteRepository())
    {}

    async execute(id: number){

        await this.repository.removerPaciente(id);
    }
}