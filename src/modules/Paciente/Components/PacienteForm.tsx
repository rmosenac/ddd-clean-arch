"use client"

import { DocumentoFieldset } from "@/modules/Documento/Components/DocumentoFieldset";
import { EnderecoFieldset } from "@/modules/Endereco/Components/EnderecoFieldset";
import { TelefoneFieldset } from "@/modules/Telefone/Components/TelefoneFieldset";
import { useEffect, useState } from "react";

export function PacienteForm({ onSubmit, pacienteEdicao }: any) {

    const [chaveFormulario, setChaveFormulario] = useState(0);

    const [nome, setNome] = useState("");
    const [genero, setGenero] = useState("");
    const [idade, setIdade] = useState("");
    const [peso, setPeso] = useState("");
    const [altura, setAltura] = useState("");

    const [documento, setDocumento] = useState<any>({});
    const [endereco, setEndereco] = useState<any>({});
    const [telefone, setTelefone] = useState<any>({});


    /*
    CARREGANDO OS DADOS PARA EDIÇÃO DO PACIENTE.
    NOTE QUE, NO USEEFFECT, HÁ UMA PASSAGEM DE PARÂMETRO ( [pacienteEdicao] ).
    ISSO SIGNIFICA QUE ELE SÓ SERÁ ACIONADO CASO HAJA O PREENCHIMENTO DA VARIÁVEL "PACIENTEEDICAO"
    */
    useEffect(() => {
        if (pacienteEdicao) {
            setNome(pacienteEdicao.nome);
            setGenero(pacienteEdicao.genero);
            setIdade(String(pacienteEdicao.idade));
            setPeso(String(pacienteEdicao.peso));
            setAltura(String(pacienteEdicao.altura));

            setDocumento({
                numeroDocumento: pacienteEdicao.numeroDocumento,
                tipoDocumento: pacienteEdicao.tipoDocumento
            });

            setEndereco(pacienteEdicao.endereco || {});
        }
    }, [pacienteEdicao]);

    return (

        <form

            /* O PREVENTDEFAULT GARANTE QUE APÓS A AÇÃO DE SUBMETER O FORMULÁRIO, A PÁGINA NÃO
                HAVERÁ REFRESH. A VARIÁVEL "e" REPRESENTA UM EVENTO PRÉ-DEFINIDO A SER ACIONADO.
                ELA CHAMA A AÇÃO DO PREVENTDEFAULT.

                COMO NÃO HÁ REFRESH NA PÁGINA, A TENDÊNCIA É QUE A PÁGINA PERMANEÇA ESTÁTICA.
                DESTE MODO, O FORMULÁRIO SERIA SEMPRE O MESMO, JÁ QUE NÃO HÁ REFRESH.

                PARA EVITAR ISSO, UTILIZAMOS UMA A VARIÁVEL "CHAVEFORMULARIO". ELE INICIA COM VALOR
                ZERO E, A CADA AÇÃO DE SUBMIT NO FORMULÁRIO, ESSA VARIÁVEL INCREMENTA "+1". COMO ELA
                É A CHAVE QUE IDENTIFICA O FORMULÁRIO, SE ELA INCREMENTA SEMPRE "+1", DESTA FORMA, MESMO
                SEM REFRESH DA PÁGINA, SABE-SE QUE NÃO SE TRATA DO MESMO FORMULÁRIO.

                EMBORA SEM REFRESH, É COMO SE FOSSE UM NOVO FORMULÁRIO A DADA AÇÃO DE SUBMIT.

                ESTA VARIÁVEL (CHAVEFORMULARIO) É INCREMENTADA LOGO ABAIXO!
            */ 
            key={chaveFormulario}
            onSubmit={(e) => {
                e.preventDefault();

                // VALIDAÇÃO DE CAMPOS
                if (!nome || !genero || !idade || !peso || !altura) {
                    alert('Preencha todos os campos dos dados do paciente!');
                    return;
                }

                /*
                A "?" INDICA QUE A PROPRIEDADE DOCUMENTO NÃO É OBRIGATÓRIA. PORÉM, PERCEBA QUE HÁ
                UMA "!" NO INÍCIO, QUE É O INDICATIVO DE UMA NEGAÇÃO.

                LOGO, A NEGAÇÃO DE "NÃO OBRIGATÓRIO" É OBRIGATÓRIO!

                ESSA OBRIGAÇÃO SE DÁ DEVIDO À RELAÇÃO DE COMPOSIÇÃO ENTRE PACIENTE E DOCUMENTO (LÁ NA
                CLASSE DE DOMÍNIO)
                 */
                if (!documento?.numeroDocumento || !documento?.tipoDocumento) {
                    alert('Preencha todos os campos do Documento!');
                    return;
                }


                // DA MESMA FORMA OCORRE PARA ENDEREÇO (QUE É UMA AGREGAÇÃO).
                if (!endereco?.logradouro || !endereco?.numero) {
                    alert('Preencha os campos necessários do endereço do paciente!');
                    return;
                }


                /*
                PERCEBA QUE O ID PACIENTEEDICAO POSSUI UMA "?", O QUE SIGNIFICA DIZER QUE ELE NÃO É
                OBRIGATÓRIO!

                NOTE QUE, NO PACIENTELIST, HÁ UM CONTADOR PARA O ID DO PACIENTE, QUE INCREMENTA "+1"
                A CADA NOVO PACIENTE INSERIDO.

                COMO O PACIENTEFORM É UTILIZADO TANTO PARA INSERÇÃO COMO PARA ALTERAÇÃO, NO CASO DE 
                INSERÇÃO, NÃO HÁ A NECESSIDADE DE PASSAR UM ID, POIS ELE SERÁ GERADO PELO CONTADOR.

                PARA ALTERAÇÃO, O PACIENTE JÁ POSSUI UM ID VINCULADO A ELE, PORTANTO DEVE SER PASSADO.

                POR ISSO O ID PODE SER PASSADO OU NÃO.
                 */
                onSubmit({
                    id: pacienteEdicao?.id,
                    nome,
                    genero,
                    idade: Number(idade),
                    peso: Number(peso),
                    altura: Number(altura),
                    documento,
                    endereco,
                    telefone
                });

                // APÓS A AÇÃO DE SUBMIT, HÁ A NECESSIDADE DE LIMPAR OS CAMPOS DO FORMULÁRIO
                setNome("");
                setGenero("");
                setIdade("");
                setPeso("");
                setAltura("");
                setDocumento({});
                setEndereco({});
                setTelefone({});


                // INCREMENTANDO A VARIÁVEL CHAVEFORMULÁRIO NO USESTATE
                setChaveFormulario(chaveFormulario + 1);

            }} >

            <h3>{pacienteEdicao ? "Editar Paciente" : "Novo Paciente"}</h3>

            Nome: <input type="text" value={nome} onChange={e => setNome(e.target.value)} /> <br />
            Gênero: <input type="text" value={genero} onChange={e => setGenero(e.target.value)} /> <br />
            Idade: <input type="number" value={idade} onChange={e => setIdade(e.target.value)} /> <br />
            Peso: <input type="number" value={peso} onChange={e => setPeso(e.target.value)} /> <br />
            Altura: <input type="number" value={altura} onChange={e => setAltura(e.target.value)} /> <br />

            <hr />


            {/* TRAZENDO OS CAMPOS DOS COMPONENTES DOCUMENTO, ENDEREÇO E TELEFONE */}

            <DocumentoFieldset dadoInicial={documento} onChange={setDocumento} />

            <hr />

            <EnderecoFieldset dadoInicial={endereco} onChange={setEndereco} />

            <hr />

            <TelefoneFieldset onChange={setTelefone} /> <br />

            <button type="submit">
                {pacienteEdicao ? "Atualizar Paciente" : "Salvar Paciente"}
            </button>
        </form >
    );
}