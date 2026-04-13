"use client"

import { useState } from "react"
import { TelefoneFieldset } from "./TelefoneFieldset"

export function TelefoneForm({ onSubmit, dadoInicial }: any) {

    const [telefone, setTelefone] = useState<any>(dadoInicial || {});

    return (
        <form onSubmit={async (e) => {
            e.preventDefault();
            await onSubmit(telefone);
        }}>
            <TelefoneFieldset
                dadoInicial={dadoInicial}
                onChange={setTelefone}
            />

            <button type="submit">Salvar telefone</button>
        </form>
    );
}