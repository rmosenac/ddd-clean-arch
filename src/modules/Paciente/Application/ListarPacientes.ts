import { PacienteRepository } from "../Infrastructure/PacienteRepository";

export class ListarPacientes{

    constructor(private repository = new PacienteRepository())
    {}

    async execute(){
        return this.repository.listarPacientes();
    }
}