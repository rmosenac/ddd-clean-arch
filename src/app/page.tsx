import Link from "next/link";
import "@/app/estilo.css"

export default function Home(){
    return(

        <div>
            <h1> Sistema de Saúde Senac </h1>
            <Link href={"/pacientes"}> Página de pacientes </Link>
        </div>
    );
}