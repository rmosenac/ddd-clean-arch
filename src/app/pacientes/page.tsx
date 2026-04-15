import "@/app/estilo.css"
import { PacienteList } from "@/modules/Paciente/Components/PacienteList";

export default function PagePacientes() {

    return (
        <div>
            <h1> Cadastro de Pacientes </h1>
            <PacienteList />
        </div>
    );
}