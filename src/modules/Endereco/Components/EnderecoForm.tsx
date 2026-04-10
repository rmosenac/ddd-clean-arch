"use client"

import { useState } from "react"

export function EnderecoFieldset({ dadoInicial, onSubmit }: any) {

    const [logradouro, setLogradouro] = useState(dadoInicial?.logradouro || "");
    const [numero, setNumero] = useState(dadoInicial?.numero || "");
    const [bairro, setBairro] = useState(dadoInicial?.bairro || "");
    const [cidade, setCidade] = useState(dadoInicial?.cidade || "");
    const [estado, setEstado] = useState(dadoInicial?.estado || "");

    return (
        <form onSubmit={async e => {
            e.preventDefault();
            await onSubmit(logradouro, numero, bairro, cidade, estado);
        }
        } >

            <fieldset>
                <legend> Endereço </legend>
                Logradouro: <input type="text" value={logradouro}
                    onChange={e => setLogradouro(e.target.value)} /><br />

                Numero: <input type="number" value={numero}
                    onChange={e => setNumero(e.target.value)} /><br />

                Bairro: <input type="text" value={bairro}
                    onChange={e => setBairro(e.target.value)} /><br />

                Cidade: <input type="text" value={cidade}
                    onChange={e => setCidade(e.target.value)} /><br />

                Estado: <input type="text" value={estado}
                    onChange={e => setEstado(e.target.value)} /><br />
            </fieldset>

        </form>
    );
}

export function EnderecoForm(){

    return(

        <div>
            <EnderecoFieldset />
            <button type="submit"> Salvar endereço </button>
        </div>
    );
}