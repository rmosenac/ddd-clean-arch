"use client"

import { useState, useEffect } from "react"

export function TelefoneFieldset({ dadoInicial, onChange }: any) {

    const [ddd, setDdd] = useState("");
    const [numeroTelefone, setNumeroTelefone] = useState("");
    const [tipoTelefone, setTipoTelefone] = useState("");
    const [ativo, setAtivo] = useState(false);

    // carregar dados iniciais (edição)
    useEffect(() => {
        if (dadoInicial) {
            setDdd(dadoInicial.ddd || "");
            setNumeroTelefone(dadoInicial.numeroTelefone || "");
            setTipoTelefone(dadoInicial.tipoTelefone || "");
            setAtivo(dadoInicial.ativo ?? false);
        }
    }, [dadoInicial]);

    // enviar dados para o componente pai
    useEffect(() => {
        onChange?.({
            ddd,
            numeroTelefone,
            tipoTelefone,
            ativo
        });
    }, [ddd, numeroTelefone, tipoTelefone, ativo]);

    return (
        <fieldset>
            <legend>Telefone</legend>

            DDD:
            <input
                type="text"
                value={ddd}
                onChange={e => setDdd(e.target.value)}
            /><br />

            Número:
            <input
                type="text"
                value={numeroTelefone}
                onChange={e => setNumeroTelefone(e.target.value)}
            /><br />

            Tipo:
            <input
                type="text"
                value={tipoTelefone}
                onChange={e => setTipoTelefone(e.target.value)}
            /><br />

            Ativo?
            <input
                type="checkbox"
                checked={ativo}
                onChange={e => setAtivo(e.target.checked)}
            /><br />
        </fieldset>
    );
}