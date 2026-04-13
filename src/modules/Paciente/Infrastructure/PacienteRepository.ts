import { Paciente } from "../Domain/Paciente";

export class PacienteRepository {

    private static pacientes: Paciente[] = [];

    async listarPacientes() {
        return PacienteRepository.pacientes;
    }

    async inserirPaciente(paciente: Paciente) {
        PacienteRepository.pacientes.push(paciente);
    }

    async buscarPacientePorId(idPaciente: number) {
        return PacienteRepository.pacientes
            .find(pac => pac.id === idPaciente);
    }

    async removerPaciente(idPaciente: number) {
        PacienteRepository.pacientes =
            PacienteRepository.pacientes
                .filter(pac => pac.id !== idPaciente);
    }

    async atualizarPaciente(paciente: Paciente) {

        const indice = PacienteRepository.pacientes
            .findIndex(pac => pac.id === paciente.id);

        if (indice !== -1) {
            PacienteRepository.pacientes[indice] = paciente;
        } else {
            throw new Error("Paciente não encontrado!");
        }
    }
}