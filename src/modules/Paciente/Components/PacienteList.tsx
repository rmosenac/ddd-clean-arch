"use client"

import { useEffect, useState } from "react"
import { ListarPacientes } from "../Application/ListarPacientes";
import { Endereco } from "@/modules/Endereco/Domain/Endereco";
import { InserirPaciente } from "../Application/InserirPaciente";
import { RemoverPaciente } from "../Application/RemoverPaciente";
import { PacienteForm } from "./PacienteForm";
import { AtualizarPaciente } from "../Application/AtualizarPaciente";


export function PacienteList() {

    const [pacientes, setPacientes] = useState<any>([]);
    const [contadorId, setContadorId] = useState(1);

    const [pacienteEdicao, setPacienteEdicao] = useState<any>(null);

    async function carregarPacientes() {
        const uc = new ListarPacientes();
        const lista = await uc.execute();

        setPacientes([...(lista || [])]);
    }

    useEffect(() => {
        carregarPacientes();
    }, []);




    async function salvarPaciente(dados: any) {

        try {
            const endereco = new Endereco(1, dados.endereco.logradouro, dados.endereco.numero, dados.endereco.bairro, dados.endereco.cidade, dados.endereco.estado);


            if (dados.id) {
                const uc = new AtualizarPaciente();

                await uc.execute(dados.id, dados.nome, dados.genero, dados.idade, dados.peso, dados.altura, dados.documento.numeroDocumento, dados.documento.tipoDocumento, endereco);

                setPacienteEdicao(null);

            } else {

                const uc = new InserirPaciente();

                await uc.execute(contadorId, dados.nome, dados.genero, dados.idade, dados.peso, dados.altura, 1, dados.documento.numeroDocumento, dados.documento.tipoDocumento, endereco);

                setContadorId(contadorId + 1);

                await carregarPacientes();
            }

        } catch (error) {
            console.log(error);
            alert('Erro ao salvar um paciente!');
        }

    }



    async function removerPaciente(id: number) {

        const uc = new RemoverPaciente();

        await uc.execute(id);

        await carregarPacientes();
    }



    function editarPaciente(p:any) {
        setPacienteEdicao(p);        
    }



    return (
        <div>

            <PacienteForm onSubmit={salvarPaciente} />

            <hr />

            <h2> Lista de Pacientes do Sistema: </h2>

            {pacientes.lenght === 0 && <p> Nenhum paciente foi encontrado no sistema</p>}

            {pacientes.map((p: any) => (
                <div key={p.id}>
                    <strong> ID: </strong> {p.id} - <strong> NOME: </strong> {p.nome} <br />

                    <button onClick={() => editarPaciente(p)}> Editar paciente </button>

                    <button onClick={() => removerPaciente(p.id)}> Remover paciente </button>
                </div>
            ))}

        </div>
    );
}