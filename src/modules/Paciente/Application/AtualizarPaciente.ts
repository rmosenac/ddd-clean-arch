import { Endereco } from "@/modules/Endereco/Domain/Endereco";
import { PacienteRepository } from "../Infrastructure/PacienteRepository";

export class AtualizarPaciente {

    constructor(private repository = new PacienteRepository()) { }

    async execute(
        id: number,
        nome: string,
        genero: string,
        idade: number,
        peso: number,
        altura: number,
        numeroDocumento: string,
        tipoDocumento: string,
        endereco: Endereco
    ) {

        const pac = await this.repository.buscarPacientePorId(id);

        if (!pac) {
            throw new Error("Paciente não existe!");
        }

        pac.nome = nome;
        pac.genero = genero;
        pac.idade = idade;
        pac.peso = peso;
        pac.altura = altura;

        pac.atualizarDocumento(numeroDocumento, tipoDocumento);
        pac.endereco = endereco;

        await this.repository.atualizarPaciente(pac);
    }
}