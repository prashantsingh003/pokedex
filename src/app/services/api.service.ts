import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {getPokemonsApi} from "../utils/urls";
import { map } from "rxjs";
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http:HttpClient) { }

  getPokemons(url:any){
    url=url?url:getPokemonsApi;
    return this.http.get(url)
  }
  /**
   * @param url 
   * @returns formatted data 
   */
  getPokemonDetail(url:string){
    return this.http.get(url)
    .pipe(map(((res:any)=>{
      const moves=res.moves.map((el:any) => {
        return {
          name:el.move.name.split("-").map((e:string)=>e[0].toUpperCase() + e.substr(1)).join(" "),
          color:this.gerRandomColor()
        }
      });
      const abilities=res.abilities.map((el:any)=>{
        return {
          name:el.ability.name,
          url:el.ability.url,
          is_hidden:el.is_hidden,
          slot:el.slot
        }
      })
      const stats=res.stats.map((el:any) =>{
        let name=el.stat.name;
        name=name.split("-").map((e:string)=>e[0].toUpperCase() + e.substr(1)).join(" ");
        return{name:name,val:el.base_stat}
      });
      return{
        id:res.id,
        name:res.name,
        height:parseInt(String(res.height/10)), //decimeters to cm
        weight:parseInt(String(res.weight/10)), // hectograms to kg
        species:res.species.name,
        // base_experience:res.base_experience,
        moves,
        stats,
        abilities,
      }
    })))
  }

  /**
   * @param url 
   * @returns formatted data about ability
   */
  getPokemonAbilityDetail(url:string){
    return this.http.get(url)
    .pipe(map((res:any)=>{
      let effect=res.effect_entries.find(((e:any)=>e.language.name=='en'));
      effect=effect?effect.effect:null;
      let generation=res.generation.name;
      return {
        id:res.id,
        name:res.name,
        effect,
        generation
      };
    }))
  }
  gerRandomColor(){
    let color = '#';
    for (var i = 0; i < 6; i++) {
        color += Math.floor(Math.random() * 10);
    }
    return color;
  }
}
