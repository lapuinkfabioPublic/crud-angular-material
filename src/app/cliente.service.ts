import { Injectable } from '@angular/core';
import { Client } from './cadastro/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  static REPO_CLIENTES = "_CLIENTES";

  constructor() { }
  salvar(cliente: Client){
    const storage = this.obterStorage();
    storage.push(cliente);
    localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(storage));
  }

  atualizar(cliente: Client){
    const storage = this.obterStorage();
    storage.forEach( c => {
      if(c.id === cliente.id)
      {
        Object.assign(c, cliente);
      }
    })
    localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(storage));
  }

  deletar(cliente: Client)
  {
    const storage = this.obterStorage();
    const novaLista = storage.filter(c=>c.id !==cliente.id)
    localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(novaLista));
  }

 pesquisarClientes(nome: string):Client[]
  {
    const clientes = this.obterStorage();

    if(!nome){
      return clientes;
    }

    return clientes.filter(cliente => cliente.nome?.indexOf(nome)!== -1)

  }
  
  buscarClientePorId(id: string) : Client | undefined{
    const clientes= this.obterStorage();
    return clientes.find(cliente => cliente.id === id)
  }

  private obterStorage() : Client[]{
    const repositorioClientes =  localStorage.getItem(ClienteService.REPO_CLIENTES);
    if(repositorioClientes){
      const clientes: Client[]= JSON.parse(repositorioClientes);
      return clientes;
    }

    const clientes : Client[]= [];
    localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(clientes));
    return clientes;

  }  

}
