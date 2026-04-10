import "@/app/estilo.css"
import { PacienteList } from "@/modules/Paciente/Components/PacienteList";

export default function PacientesPage() {

    return (
        <div>
            <h1> Página de Pacientes </h1>
            <hr />
            <PacienteList />
        </div>
    );
}