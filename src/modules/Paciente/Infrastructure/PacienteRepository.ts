import { Paciente } from "../Domain/Paciente";

export class PacienteRepository {

    private static pacientes: Paciente[] = [];


    // LISTAR PACIENTES:
    async listarPacientes() {
        return PacienteRepository.pacientes;
    }


    // INSERIR PACIENTE:
    async inserirPaciente(paciente: Paciente) {
        PacienteRepository.pacientes.push(paciente);
    }


    // BUSCAR POR ID:
    async buscarPacientePorId(idPaciente: number) {
        return PacienteRepository.pacientes.find(pac => pac.id === idPaciente);
    }

    // REMOVER DOCUMENTO:
    async removerPaciente(idPaciente: number) {
        PacienteRepository.pacientes = PacienteRepository.pacientes.filter(pac => pac.id !== idPaciente);
    }

    // ATUALIZAR DOCUMENTO:
    async atualizarPaciente(paciente: Paciente) {

        // Buscando a posição em que o documento solicitado para autualizar está dentro do array.
        const indice = PacienteRepository.pacientes.findIndex(pac => pac.id === paciente.id);

        if (indice !== -1) {
            PacienteRepository.pacientes[indice] = paciente;
        } else {
            console.log('Documento não encontrado!');
        }
    }
}