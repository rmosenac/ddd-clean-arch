import { Endereco } from "@/modules/Endereco/Domain/Endereco";
import { PacienteRepository } from "../Infrastructure/PacienteRepository";
import { Paciente } from "../Domain/Paciente";

export class InserirPaciente{

    constructor(private repository = new PacienteRepository())
    {}

    async execute(id: number, nome: string, genero: string, idade: number, peso: number, altura: number, idDocumento: number, numeroDocumento: string, tipoDocumento: string, endereco: Endereco){

        const pac = new Paciente(id, nome, genero, idade, peso, altura, idDocumento, numeroDocumento, tipoDocumento, endereco);

        await this.repository.inserirPaciente(pac);
    }
}