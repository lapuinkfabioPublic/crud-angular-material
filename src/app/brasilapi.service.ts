import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Estado, Municipio} from './brasilapi.models'
@Injectable({
  providedIn: 'root'
})
export class BrasilapiService {

  baseURL: string = 'https://brasilapi.com.br/api';

  constructor(private http: HttpClient) { }
  
    listarUfs(): Observable<Estado[]>{
      const path = '/ibge/uf/v1/'

      //this.baseURL  + path
      const local = 'http://localhost:8000/api/ibge/uf/v1/'
      
      return this.http.get<Estado[]>(local);
    }

    
    listarMunicipios(uf: string): Observable<Municipio[]>{
      //const path = '/ibge/municipios/v1/'+uf

      //this.baseURL  + path
      const local = 'http://localhost:8000/api/ibge/municipios/v1/'+uf
      
      return this.http.get<Municipio[]>(local);
    }


  
}
