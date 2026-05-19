import { Endereco } from "@/modules/Endereco/Domain/Endereco";
import { AtualizarPaciente } from "@/modules/Paciente/Application/AtualizarPaciente";
import { InserirPaciente } from "@/modules/Paciente/Application/InserirPaciente";
import { ListarPacientes } from "@/modules/Paciente/Application/ListarPacientes";
import { RemoverPaciente } from "@/modules/Paciente/Application/RemoverPaciente";
import { NextRequest, NextResponse } from "next/server";


export async function GET() {
    try {

        const uc = new ListarPacientes();

        const pacientes = await uc.execute();

        return NextResponse.json(pacientes);
    } catch (error) {
        console.log(error);

        return NextResponse.json(
            { erro: "Erro ao listar os pacientes" },
            { status: 500 }
        );
    }
}


export async function POST(request: NextRequest) {

    try {

        const body = await request.json();

        const endereco = new Endereco(
            body.id,
            body.endereco.logradouro,
            body.endereco.numero,
            body.endereco.bairro,
            body.endereco.cidade,
            body.endereco.estado
        );

        const uc = new InserirPaciente();

        await uc.execute(
            body.id,
            body.nome,
            body.genero,
            body.idade,
            body.peso,
            body.altura,
            body.id, // PRECISA RETIRAR PARA BATER COM O SERIAL DO BANCO DE DADOS
            body.documento.numeroDocumento,
            body.tipoDocumento,
            endereco
        );

        return NextResponse.json({
            mensagem: "Paciente inserido com sucesso!"
        });

    } catch (erro) {
        console.log(erro)

        return NextResponse.json(
            { erro: "Erro ao inserir o paciente" },
            { status: 500 }
        );
    }
}




export async function PUT(request: NextRequest) {

    try {

        const body = await request.json();

        const endereco = new Endereco(
            body.id,
            body.endereco.logradouro,
            body.endereco.numero,
            body.endereco.bairro,
            body.endereco.cidade,
            body.endereco.estado
        );

        const uc = new AtualizarPaciente();

        await uc.execute(
            body.id,
            body.nome,
            body.genero,
            body.idade,
            body.peso,
            body.altura,
            body.documento.numeroDocumento,
            body.tipoDocumento,
            endereco
        );

        return NextResponse.json({
            mensagem: "Paciente atualizado com sucesso!"
        });

    } catch (erro) {
        console.log(erro)

        return NextResponse.json(
            { erro: "Erro ao atualizar o paciente" },
            { status: 500 }
        );
    }
}



export async function DELETE(request: NextRequest) {

    try {

        const body = await request.json();

        const uc = new RemoverPaciente();

        await uc.execute(body.id);

        return NextResponse.json(
            { mensagem: "Paciente removido com sucesso!" }
        );

    } catch (erro) {
        console.log(erro);

        return NextResponse.json(
            { erro: "Erro ao deletar o paciente" },
            { status: 500 }
        );
    }
}