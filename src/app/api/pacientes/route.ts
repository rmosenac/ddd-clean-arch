import { ListarPacientes } from "@/modules/Paciente/Application/ListarPacientes";
import { NextResponse } from "next/server";


export async function GET(){
    try{

        const uc = new ListarPacientes();

        const pacientes = await uc.execute();

        return NextResponse.json(pacientes);
    } catch(error){
        console.log (error);

        return NextResponse.json(
            {erro: "Erro ao listar os pacientes"},
            {status: 500}
        );
    }
}