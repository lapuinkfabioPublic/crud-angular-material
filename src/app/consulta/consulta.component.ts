import { Component, OnInit } from '@angular/core';
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
  templateUrl: './consulta.component.html',
  styleUrl: './consulta.component.scss'
})
export class ConsultaComponent implements OnInit{

    listaClientes: Client[] = [];
    colunasTable: string[]= [ "id", "nome" , "cpf", "dataNascimento" , "email"]
    
    constructor(private service:ClienteService )
    {
    }

    ngOnInit(){
      this.listaClientes = this.service.pesquisarClientes('');
    }

}
