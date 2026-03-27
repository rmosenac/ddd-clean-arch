import { PacienteRepository } from "../Infrastructure/PacienteRepository";

export class BuscarDocumentoPorId{

    constructor(private repository = new PacienteRepository())
    {}

    async execute(id: number){

        return this.repository.buscarPacientePorId(id);
    }
}