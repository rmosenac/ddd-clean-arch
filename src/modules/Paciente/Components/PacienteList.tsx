"use client"

import { useEffect, useState } from "react"
import { ListarPacientes } from "../Application/ListarPacientes";
import { Endereco } from "@/modules/Endereco/Domain/Endereco";
import { InserirPaciente } from "../Application/InserirPaciente";
import { RemoverPaciente } from "../Application/RemoverPaciente";
import { PacienteForm } from "./PacienteForm";
import { Paciente } from "../Domain/Paciente";

export function PacienteList() {

    async function carregarPacientes() {

        const [pacientes, setPacientes] = useState<any[]>([]);

        const uc = new ListarPacientes();
        const lista = await uc.execute();

        setPacientes(lista);
    }

    useEffect(()=>{
        carregarPacientes();
    }, []);


    async function inserirPaciente(dados: any) {
        const endereco = new Endereco(1, dados.endereco.logradouro, dados.endereco.numero, dados.endereco.bairro, dados.endereco.cidade, dados.endereco.estado);
        
        const uc = new InserirPaciente();

        await uc.execute(
            dados.id, 
            dados.nome,
            dados.genero,
            dados.idade,
            dados.peso,
            dados.altura,
            1,
            dados.numeroDocumento,
            dados.tipoDocumento,
            endereco
        );

        await carregarPacientes();
    }


    async function removerPaciente(id: number) {

        const uc = new RemoverPaciente();

        await uc.execute(id);

        await carregarPacientes();  
    }

    return(

        <div>

            <PacienteForm onSubmit={inserirPaciente} />
            <hr />

            <h2> LISTA DE PACIENTES: </h2>

        </div>

    );
}