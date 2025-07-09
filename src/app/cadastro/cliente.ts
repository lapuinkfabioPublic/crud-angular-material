import {v4 as uuid} from 'uuid';


export class Client
{
    id ?: string;
    nome?: string;
    cpf?: string;
    dataNascimento?: string;
    email?: string;
    deletando: boolean = false;
    uf?: string;
    municipio?:string;

    static newClient(){
        const cliente = new Client();
        cliente.id = uuid();
        return cliente;
    }
  

}