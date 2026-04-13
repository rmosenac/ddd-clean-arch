"use client"

import { useState, useEffect } from "react";

export function DocumentoFieldset({ dadoInicial, onChange }: any) {

    const [numeroDocumento, setNumeroDocumento] = useState("");
    const [tipoDocumento, setTipoDocumento] = useState("");

    useEffect(() => {
        if (dadoInicial) {
            setNumeroDocumento(dadoInicial.numeroDocumento || "");
            setTipoDocumento(dadoInicial.tipoDocumento || "");
        }
    }, [dadoInicial]);

    useEffect(() => {
        onChange?.({
            numeroDocumento,
            tipoDocumento
        });
    }, [numeroDocumento, tipoDocumento]);

    return (
        <fieldset>
            <legend>Dados do documento</legend>

            Número:
            <input
                type="text"
                value={numeroDocumento}
                onChange={e => setNumeroDocumento(e.target.value)}
            /><br />

            Tipo:
            <input
                type="text"
                value={tipoDocumento}
                onChange={e => setTipoDocumento(e.target.value)}
            /><br />
        </fieldset>
    );
}