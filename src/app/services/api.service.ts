import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {getPokemonsApi} from "../utils/urls";

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http:HttpClient) { }

  getPokemons(url:any){
    url=url?url:getPokemonsApi;
    return this.http.get(url)
  }
  getPokemonDetail(url:string){
    return this.http.get(url)
  }
}
