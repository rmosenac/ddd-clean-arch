"use client";

import { useState } from "react";

export function DocumentoForm({dadoInicial, onSubmit}: any){

    const [numeroDocumento, setNumeroDocumento] = useState(dadoInicial?.numeroDocumento || "");
    const [tipoDocumento, setTipoDocumento] = useState(dadoInicial?.tipoDocumento || "");

    return(

        <form onSubmit = {async e => {
                e.preventDefault();
                await onSubmit(numeroDocumento, tipoDocumento);
            }
        } >
            <fieldset>
                <legend> Dados do documento</legend>
                Número do documento: <input type="text" value={numeroDocumento} 
                onChange={e => setNumeroDocumento(e.target.value)} /><br />
                
                Tipo do documento: <input type="text" value={tipoDocumento}
                onChange={e => setTipoDocumento(e.target.value)} /> <br />
                
                <button type="submit"> Salvar documento </button>
            </fieldset>
        </form>
    );
}