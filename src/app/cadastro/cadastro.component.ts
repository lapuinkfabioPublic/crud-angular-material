import { Component , OnInit, inject} from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { FormsModule} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field' ;
import { MatInputModule } from '@angular/material/input' ;
import { MatIconModule } from '@angular/material/icon' ;
import { MatButtonModule } from '@angular/material/button' ;
import { MatSnackBar} from '@angular/material/snack-bar'
import { Client } from './cliente';
import { ClienteService } from '../cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxMaskDirective, provideNgxMask} from 'ngx-mask';
import { BrasilapiService } from '../brasilapi.service';
import { Municipio } from '../brasilapi.models';
import { Estado } from '../brasilapi.models';
import { MatSelectChange, MatSelectModule } from '@angular/material/select'
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-cadastro',
  imports: [FlexLayoutModule,
            MatInputModule,
            MatCardModule, 
            MatFormFieldModule, 
            CommonModule,
            MatSelectModule,
            MatIconModule,
            MatButtonModule,
            FormsModule,
            NgxMaskDirective
          ],
  providers: [provideNgxMask()],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent implements OnInit {
    cliente: Client = Client.newClient();
    atualizando: boolean = false;
    snack: MatSnackBar = inject(MatSnackBar);
    estados: Estado[] = []; 
    municipios:  Municipio[] = [];

    constructor(private service: ClienteService,
      private brasilApiService: BrasilapiService,
      private route: ActivatedRoute,
      private router: Router

    ){

    }

  carregarUFs(){
    this.estados  = []
    
    //observable subcriber
    this.brasilApiService.listarUfs().subscribe({
      next: (ufs) => {
        console.log("lista estados", ufs),
        this.estados = ufs;
      },
      error: (error) => {
        console.log(error);
      }

    });

  }

  carregarMunicipios(event: MatSelectChange){
    const ufSelectionada = event.value;
    this.brasilApiService.listarMunicipios(ufSelectionada).subscribe({
      next: (listarMunicipios) =>  this.municipios = listarMunicipios,
      error: (error) => {
        console.log('Ocorreu um erro: ' + error);
      }
    }

    );

  }


  ngOnInit(): void {
    this.route.queryParamMap.subscribe( (query : any) => {
        const params = query['params'];
        const id = params['id'];
        
        if(id){
          let clienteEncontrado = this.service.buscarClientePorId(id) 
          if(clienteEncontrado){
            this.atualizando = true;
            this.cliente = clienteEncontrado;
          }
        }
      }
    )  
    this.carregarUFs();
  }

    salvar(){
      if(!this.atualizando)
      {
        this.service.salvar(this.cliente)
        this.cliente = Client.newClient()
        this.mostrarMensagem('Salvo com sucesso!')  
      }
      else{

        this.service.atualizar(this.cliente)
        this.router.navigate(['/consulta'])
        this.mostrarMensagem('Atualizado com sucesso!')
      }
    }

    mostrarMensagem(mensagem: string)
    {
      this.snack.open(mensagem, "OK")
    }

}
