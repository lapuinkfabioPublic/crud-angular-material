import { Component } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { FormsModule} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field' ;
import { MatInputModule } from '@angular/material/input' ;
import { MatIconModule } from '@angular/material/icon' ;
import { MatButtonModule } from '@angular/material/button' ;
import { Client } from './cliente';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-cadastro',
  imports: [FlexLayoutModule,
            MatInputModule,
            MatCardModule, 
            MatFormFieldModule, 
            MatIconModule,
            MatButtonModule,
            FormsModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent {
    cliente: Client = Client.newClient();

    constructor(private service: ClienteService){

    }

    salvar(){
      this.service.salvar(this.cliente);
      this.cliente = Client.newClient();
    }

}
