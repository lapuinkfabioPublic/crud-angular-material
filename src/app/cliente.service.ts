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

  obterStorage() : Client[]{
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
