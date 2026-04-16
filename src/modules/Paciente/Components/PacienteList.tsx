"use client"

import { useEffect, useState } from "react"
import { ListarPacientes } from "../Application/ListarPacientes";
import { Endereco } from "@/modules/Endereco/Domain/Endereco";
import { InserirPaciente } from "../Application/InserirPaciente";
import { RemoverPaciente } from "../Application/RemoverPaciente";
import { AtualizarPaciente } from "../Application/AtualizarPaciente";
import { PacienteForm } from "./PacienteForm";


export function PacienteList() {

    const [pacientes, setPacientes] = useState<any>([]);
    const [contadorId, setContadorId] = useState(1);
    const [pacienteEdicao, setPacienteEdicao] = useState<any>(null);

    async function carregarPacientes() {

        // CHAMANDO A CLASSE LÁ DO PACOTE APPLICATION ATRAVÉS DESSA VARIÁVEL UC
        const uc = new ListarPacientes();
        const lista = await uc.execute();

        /*
        CHAMADO DE SPREAD OPERATOR, OS "..." NADA MAIS É DO QUE A SOLICITAÇÃO DE UMA CÓPIA
        DE UM ARRAY.

        A VARIÁVEL "SETPACIENTES" DO USESTATE ESPERA UM ARRAY.

        APÓS A EXECUÇÃO DA VARIÁVEL UC, ESPERA-SE UMA LISTA OU UM ARRAY VAZIO, CASO NÃO HAJA PACIENTES
        NO SISTEMA.
        
        POR ISSO A EXPRESSÃO "..." PASSA UMA CÓPIA DA LISTA PARA A VARIÁVEL "SETPACIENTES". ESSA CÓPIA
        PODE SER UMA LISTA COM ITENS "OU" UM ARRAY VAZIO (REPRESENTADO PELOS []);
         */
        setPacientes([...(lista || [])]);
    }


    /*
    ESTE USEEFFECT TEM COMO PARÂMETRO "[]". LOGO, O MÉTODO "CARREGARPACIENTES" SERÁ ACIONADO CADA
    VEZ QUE HOUVER UMA "TENTATIVA DE RECARGA DA PÁGINA" (JÁ QUE O PREVENTDEFAULT, EXISTENTE NO 
    PACIENTEFORM, SEGURA ESSE REFRESH DA PÁGINA)
    */
    useEffect(() => {
        carregarPacientes();
    }, []);

    async function salvarPaciente(dados: any) {

        try {

            const endereco = new Endereco(
                1,
                dados.endereco.logradouro,
                dados.endereco.numero,
                dados.endereco.bairro,
                dados.endereco.cidade,
                dados.endereco.estado
            );

            /*
            PRIMEIRAMENTE, O CÓDIGO ANALISA A EXISTÊNCIA DE UM ID. ISSO FAZ COM QUE ELE SAIBA QUE
            O PACIENTE EXISTE NO SISTEMA.
            */


            /*
            CASO EXISTA O PACIENTE JÁ CADASTRADO (NA LISTAGEM DA PÁGINA), ELE SERÁ ENCAMINHADO PARA
            A EDIÇÃO (ISSO OCORRE QUANDO APERTA O BOTÃO "EDITAR PACIENTE")
            */
            if (dados.id) {

                // CHAMANDO A CLASSE LÁ DO PACOTE APPLICATION ATRAVÉS DESSA VARIÁVEL UC
                const uc = new AtualizarPaciente();

                await uc.execute(
                    dados.id,
                    dados.nome,
                    dados.genero,
                    dados.idade,
                    dados.peso,
                    dados.altura,
                    dados.documento.numeroDocumento,
                    dados.documento.tipoDocumento,
                    endereco
                );

                setPacienteEdicao(null);


                /*
                CASO AINDA NÃO EXISTA O PACIENTE CADASTRADO NO SISTEMA (NA LISTAGEM DA PÁGINA), AO PREENCHER
                OS DADOS E APERTAR (SALVAR PACIENTE), ELE SERÁ EXIBIDO NA LISTA
                */
            } else {

                // CHAMANDO A CLASSE LÁ DO PACOTE APPLICATION ATRAVÉS DESSA VARIÁVEL UC
                const uc = new InserirPaciente();

                await uc.execute(
                    contadorId,
                    dados.nome,
                    dados.genero,
                    dados.idade,
                    dados.peso,
                    dados.altura,
                    1,
                    dados.documento.numeroDocumento,
                    dados.documento.tipoDocumento,
                    endereco
                );

                setContadorId(contadorId + 1);
            }

            await carregarPacientes();


            /*
            CASO OCORRA ALGUM PROBLEMA NA INSERÇÃO DO PACIENTE, O SISTEMA CAPTURA O ERRO E LANÇA NO
            TERMINAL. TAMBÉM IRÁ ALERTAR NA TELA COM OU POPUP DIZENDO QUE HOUVE UM ERRO!
            o PROGRAMADOR DEVE VERIFICAR O TERMINAL PARA OBSERVAR O ERRO QUE OCORREU.
            */
        } catch (error) {
            console.log(error);
            alert('Erro ao salvar paciente!');
        }

    }

    /*
    ESSA É A FUNÇÃO ACIONADA NO BOTÃO REMOVER PACIENTE, QUE EXISTE NA LISTAGEM PARA CADA PACIENTE.
    ELA É ASSÍNCRONA, POIS REQUER PROCESSAMENTO
    */
    async function removerPaciente(id: number) {

        // CHAMANDO A CLASSE LÁ DO PACOTE APPLICATION ATRAVÉS DESSA VARIÁVEL UC
        const uc = new RemoverPaciente();

        await uc.execute(id);

        await carregarPacientes();
    }


    /*
    ESSA É A FUNÇÃO ACIONADA NO BOTÃO EDITAR PACIENTE, QUE EXISTE NA LISTAGEM PARA CADA PACIENTE.
    ELA NÃO É ASSÍNCRONA, POIS NÃO REQUER UM PROCESSAMENTO. APENAS ENVIA O PACIENTE EXISTENTE DE
    VOLTA AOS CAMPOS DO FORMULÁRIO PARA EDIÇÃO.

    SETPACIENTEEDICAO, PERTENCENTE AO USESTATE, É QUEM MONITORA O ESTADO DE PACIENTEEDICAO. 
    PASSANDO O PACIENTE, REPRESENTADO PELA VARIÁVEL "P", PARA ELE, LOGO ELE ALTERA O ESTADO DO
    USESTATE
    */
    function editarPaciente(p: any) {
        setPacienteEdicao(p);
    }


    // AQUI COMEÇA MONTAGEM DO FORMULÁRIO
    return (
        <div>

            {/* CHAMANDO O FORMUÁLRIO DE INSERÇÃO / ALTERAÇÃO DE PACIENTES  */}
            <PacienteForm
                onSubmit={salvarPaciente}
                pacienteEdicao={pacienteEdicao}
            />

            <hr />

            {/* INICIANDO A LISTAGEM DE PACIENTES */}
            <h2> Lista de Pacientes do Sistema: </h2>

            {pacientes.length === 0 && <p> Nenhum paciente foi encontrado no sistema</p>}


            {/* PERCORRENDO O ARRAY DE PACIENTES QUE É MONITORADO PELO USESTATE, DECLARADO
            LÁ NO INÍCIO DO CÓDIGO E QUE É UTILIZADO EM TODO PROCESSAMENTO.

            A VARIÁVEL "P", EMBORA DO TYPO "ANY", É A REPRESENTAÇÃO DE UM PACIENTE COMPLETO
            
            PARA CADA USUÁRIO ENCONTRADO NAS POSIÇÕES DO ARRAY SERÁ GERADA UMA DIV TENDO COMO 
            IDENTIFICADOR CHAVE (KEY) O PRÓPRIO ID DO PACIENTE, UM BOTÃO PARA EDITAR E OUTRO
            PARA REMOVER 
            
            ESSES BOTÕES CHAMAM SUAS RESPECTIVAS AÇÕES PROGRAMADAS NESTE CÓDIGO */}
            {pacientes.map((p: any) => (

                <div key={p.id}>
                    <strong> ID: </strong> {p.id} - <strong> NOME: </strong> {p.nome} <br />

                    <button onClick={() => editarPaciente(p)}>
                        Editar paciente
                    </button>

                    <button onClick={() => removerPaciente(p.id)}>
                        Remover paciente
                    </button>
                </div>
            ))}

        </div>
    );
}