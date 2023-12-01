import { Component, OnInit, OnDestroy} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {Subscription} from 'rxjs';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { PokemonAbilityComponent } from '../pokemon-ability/pokemon-ability.component';
@Component({
  selector: 'app-details-pokemon',
  standalone: true,
  imports: [ CommonModule,PokemonAbilityComponent],
  templateUrl: './details-pokemon.component.html',
  styleUrl: './details-pokemon.component.scss'
})
export class DetailsPokemonComponent implements OnInit,OnDestroy{
  name:string='';
  data:any=null;
  sprites:any;
  imgSrc='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbAG2BJZnrYWHXAQd1bT6ybZtg3ezGdEQEW3A58dibMTWBVeJ9qhNm6Wa3a4oqWHg7AUg&usqp=CAU'

  selectedAbility:any;
  loading:boolean=false;
  loadingAbility:boolean=false;

  subs:Array<Subscription>=[];

  constructor(
    private route:ActivatedRoute,
    private apiService:ApiService,
    ){}

  ngOnInit(): void {
    this.subs.push(this.route.params
    .subscribe((params:Params)=>{this.getDetail(params['nameID'])}))
  }

  getDetail(nameId:string|number){
    if(this.loading) return;
    this.loading=true;
    this.subs.push(
      this.apiService.getPokemonDetail("https://pokeapi.co/api/v2/pokemon/"+nameId)
      .subscribe((res:any)=>{
        this.name=res.name;
        this.data=res;
        this.sprites=res.sprites;
      })
    )
  }
  getAbilityDetail(url:string){
    this.loadingAbility=true;
    this.subs.push(
      this.apiService.getPokemonAbilityDetail(url)
      .subscribe((res:any)=>{
        this.selectedAbility=res;
        this.loadingAbility=false;
      })
    )
  }
  ngOnDestroy(): void {
    this.subs.forEach(sub=>sub.unsubscribe());
  }
}
