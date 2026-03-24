import { EnderecoRepository } from "../Infrastructure/EnderecoRepository";

export class ListarEnderecos{

    constructor(private repository = new EnderecoRepository())
    {}

    async execute(){
       return this.repository.listarEnderecos; 
    }
}