"use client"

import { useState } from "react"

export function TelefoneForm({ dadoInicial, onSubmit }: any) {

    const [ddd, setDdd] = useState(dadoInicial?.ddd || "");
    const [numeroTelefone, setNumeroTelefone] = useState(dadoInicial?.numeroTelefone || "");
    const [tipoTelefone, setTipoTelefone] = useState(dadoInicial?.tipoTelefone || "");
    const [ativo, setAtivo] = useState(dadoInicial?.ativo || "");

    return (

        <form onSubmit={async e => {
            e.preventDefault();
            await onSubmit(ddd, numeroTelefone, tipoTelefone, ativo);
        }
        }>
            <fieldset>
                <legend> Telefone </legend>
                DDD: <input type="text" value={ddd}
                    onChange={e => setDdd(e.target.value)} /><br />

                Número: <input type="text" value={numeroTelefone}
                    onChange={e => setNumeroTelefone(e.target.value)} /> <br />

                Tipo: <input type="text" value={tipoTelefone}
                    onChange={e => setTipoTelefone(e.target.value)} /> <br />

                Ativo? <input type="checkbox" checked={ativo}
                    onChange={e => setAtivo(e.target.checked)} /> <br />

                <button type="submit"> Salvar telefone </button>
            </fieldset>
        </form>
    );
}