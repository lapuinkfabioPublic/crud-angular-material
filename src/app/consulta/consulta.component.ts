import { Component, OnInit , inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule} from '@angular/material/input'
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { ClienteService } from '../cliente.service';
import { Client } from '../cadastro/cliente';
import { Router } from '@angular/router';
import { provideNgxMask} from 'ngx-mask'
import { MatSnackBar} from '@angular/material/snack-bar'

@Component({
  selector: 'app-consulta',
  imports: [ MatInputModule,
             MatCardModule,
             MatIconModule,
             MatTableModule,
             FlexLayoutModule,
             MatButtonModule,
             FormsModule,
             CommonModule
             
  ],
  providers: [provideNgxMask()],
  templateUrl: './consulta.component.html',
  styleUrl: './consulta.component.scss'
})
export class ConsultaComponent implements OnInit{

    nomeBusca: string = '';
    listaClientes: Client[] = [];
    colunasTable: string[]= [ "id", "nome" , "cpf", "dataNascimento" , "email", "acoes"]
    snack: MatSnackBar = inject(MatSnackBar);

    constructor(private service:ClienteService ,
      private router: Router
    )
    {
    }

    ngOnInit(){
      this.listaClientes = this.service.pesquisarClientes('');
    }

    pesquisar(){
      this.listaClientes = this.service.pesquisarClientes(this.nomeBusca) ;
    }

    preparaEditar(id: string)
    {
       this.router.navigate(['/cadastro'],{queryParams: {"id" : id}})
    }

    preparaDeletar(cliente: Client)
    {
      cliente.deletando = true;

    }

    deletar(cliente: Client)
    {
      this.service.deletar(cliente);
      this.listaClientes = this.service.pesquisarClientes('');
      this.mostrarMensagem('Deletado com sucesso!')
    }

    mostrarMensagem(mensagem: string)
    {
      this.snack.open(mensagem, "OK")
    }

}
