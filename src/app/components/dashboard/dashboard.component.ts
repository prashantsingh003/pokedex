import { Component,OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../../services/api.service';
import {Subscription} from 'rxjs'
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import {pageLimit} from '../../utils/constants'

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit,OnDestroy{
  sub:Subscription|undefined;
  pokemons:Array<any>=[];
  getNext:string|null=null;
  getPrev:string|null=null;
  loading:boolean=false;

  totalPages:number=0;
  
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
      this.pokemons=res.results;
      this.loading=false;
      this.setPagination(res.count)
    });
  };
  setPagination(count:number){
    this.totalPages=Math.ceil(count/pageLimit);
  }
  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
