import { Component, OnInit, OnDestroy} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {Subscription} from 'rxjs';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-details-pokemon',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './details-pokemon.component.html',
  styleUrl: './details-pokemon.component.scss'
})
export class DetailsPokemonComponent implements OnInit,OnDestroy{
  name:string='';
  data:any=null;
  sprites:any;

  loading:boolean=false;

  paramSub:Subscription|undefined;
  apiSub:Subscription|undefined;

  constructor(private route:ActivatedRoute,private apiService:ApiService){}

  ngOnInit(): void {
    this.paramSub=this.route.params
    .subscribe((params:Params)=>{this.getDetail(params['nameID'])})
  }

  getDetail(nameId:string|number){
    if(this.loading) return;
    this.loading=true;
    this.apiService.getPokemonDetail("https://pokeapi.co/api/v2/pokemon/"+nameId)
    .subscribe((res:any)=>{
      console.log(res)
      this.name=res.name;
      this.data=res;
      this.sprites=res.sprites;
    })
  }

  ngOnDestroy(): void {
    this.paramSub?.unsubscribe();
    this.apiSub?.unsubscribe();
  }
}
