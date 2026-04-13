"use client";

import { useState } from "react";
import { DocumentoFieldset } from "./DocumentoFieldset";

export function DocumentoForm({ onSubmit, dadoInicial }: any) {

    const [documento, setDocumento] = useState<any>(dadoInicial || {});

    return (
        <form onSubmit={async (e) => {
            e.preventDefault();
            await onSubmit(documento);
        }}>
            <DocumentoFieldset
                dadoInicial={dadoInicial}
                onChange={setDocumento}
            />

            <button type="submit">Salvar documento</button>
        </form>
    );
}