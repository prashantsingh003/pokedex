import { Component,OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../../services/api.service';
import {Subscription} from 'rxjs'
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit,OnDestroy{
  sub:Subscription|undefined;
  pokemons:Array<any>=[];
  totalPokemons:number=0;
  getNext:string|null=null;
  getPrev:string|null=null;
  loading:boolean=false;
  
  constructor(private apiService:ApiService){};
  ngOnInit(){
    this.getPokemons();
  }
  nextPage(){
    this.getPokemons(this.getNext)
  }
  prevPage(){
    this.getPokemons(this.getPrev)
  }
  getPokemons(url:null|string=null){
    if(this.loading) return;
    this.loading=true;
    this.sub=this.apiService.getPokemons(url)
    .subscribe((res:any)=>{
      console.log(res)
      this.getNext=res.next;
      this.getPrev=res.previous;
      this.totalPokemons=res.count;
      this.pokemons=res.results;
      this.loading=false;
    });
  };
  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
