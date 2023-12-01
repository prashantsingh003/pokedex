import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  constructor(private router:Router){}
  randomPokemon(){
    const id=Math.floor(Math.random()*1000);
    this.router.navigate(['/pokemon',id]);
  }
}
