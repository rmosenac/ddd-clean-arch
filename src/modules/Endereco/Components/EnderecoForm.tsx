"use client"

import { useState } from "react"
import { EnderecoFieldset } from "./EnderecoFieldset"

export function EnderecoForm({ onSubmit, dadoInicial }: any) {

    const [endereco, setEndereco] = useState<any>(dadoInicial || {});

    return (
        <form onSubmit={async (e) => {
            e.preventDefault();
            await onSubmit(endereco);
        }}>
            <EnderecoFieldset
                dadoInicial={dadoInicial}
                onChange={setEndereco}
            />

            <button type="submit">Salvar endereço</button>
        </form>
    );
}