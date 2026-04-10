"use client"

import { DocumentoFieldset, DocumentoForm } from "@/modules/Documento/Components/DocumentoForm";
import { EnderecoFieldset, EnderecoForm } from "@/modules/Endereco/Components/EnderecoForm";
import { TelefoneFieldset, TelefoneForm } from "@/modules/Telefone/Components/TelefoneForm";
import { useState } from "react"

export function PacienteForm({ onSubmit }: any) {

    const [nome, setNome] = useState("");
    const [genero, setGenero] = useState("");
    const [idade, setIdade] = useState("");
    const [peso, setPeso] = useState("");
    const [altura, setAltura] = useState("");

    const [documento, setDocumento] = useState<any>(null);
    const [endereco, setEndereco] = useState<any>(null);
    const [telefone, setTelefone] = useState<any>(null);

    return (
        <div>

            Nome: <input type="text" value={nome} onChange={e => setNome(e.target.value)} /><br />
            Gênero: <input type="text" value={genero} onChange={e => setGenero(e.target.value)} /><br />
            Idade: <input type="number" value={idade} onChange={e => setIdade(e.target.value)} /><br />
            Peso: <input type="number" value={peso} onChange={e => setPeso(e.target.value)} /><br />
            Altura: <input type="number" value={altura} onChange={e => setAltura(e.target.value)} /><br />

            <hr />

            <DocumentoFieldset onSubmit={(numeroDocumento: string, tipoDocumento: string) => {
                setDocumento({ numeroDocumento, tipoDocumento })
            }} />

            <EnderecoFieldset onSubmit={(logradouro: string, numero: number, bairro: string, cidade: string, estado: string) => {
                setEndereco({ logradouro, numero, bairro, cidade, estado })
            }} />

            <TelefoneFieldset onSubmit={(ddd: string, numeroTelefone: string, tipoTelefone: string, ativo: boolean) => {
                setTelefone({ ddd, numeroTelefone, tipoTelefone, ativo })
            }} />

            <button type="submit"> Salvar paciente </button>

        </div>
    );
}