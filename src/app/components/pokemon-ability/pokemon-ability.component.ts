import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-pokemon-ability',
  standalone:true,
  imports:[CommonModule],
  templateUrl: './pokemon-ability.component.html',
  styleUrls: ['./pokemon-ability.component.scss']
})
export class PokemonAbilityComponent implements OnInit, AfterViewInit{
  @Input() ability:any;
  @Output() closeEmmitter=new EventEmitter<any>();
  constructor(){}
  ngOnInit(): void {
    console.log(this.ability)
  }
  ngAfterViewInit(): void {
    const el=document.getElementById('comp-test');
    el?.scrollIntoView({ behavior: "smooth", });
  }
}
