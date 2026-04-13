"use client"

import { useState, useEffect } from "react"

export function EnderecoFieldset({ dadoInicial, onChange }: any) {

    const [logradouro, setLogradouro] = useState("");
    const [numero, setNumero] = useState<number | "">("");
    const [bairro, setBairro] = useState("");
    const [cidade, setCidade] = useState("");
    const [estado, setEstado] = useState("");

    useEffect(() => {
        if (dadoInicial) {
            setLogradouro(dadoInicial.logradouro || "");
            setNumero(dadoInicial.numero || "");
            setBairro(dadoInicial.bairro || "");
            setCidade(dadoInicial.cidade || "");
            setEstado(dadoInicial.estado || "");
        }
    }, [dadoInicial]);

    useEffect(() => {
        onChange?.({
            logradouro,
            numero: Number(numero),
            bairro,
            cidade,
            estado
        });
    }, [logradouro, numero, bairro, cidade, estado]);

    return (
        <fieldset>
            <legend>Endereço</legend>

            Logradouro:
            <input value={logradouro} onChange={e => setLogradouro(e.target.value)} /><br />

            Número:
            <input
                type="number"
                value={numero}
                onChange={e => setNumero(e.target.value === "" ? "" : Number(e.target.value))}
            /><br />

            Bairro:
            <input value={bairro} onChange={e => setBairro(e.target.value)} /><br />

            Cidade:
            <input value={cidade} onChange={e => setCidade(e.target.value)} /><br />

            Estado:
            <input value={estado} onChange={e => setEstado(e.target.value)} /><br />
        </fieldset>
    );
}