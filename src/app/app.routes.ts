import { Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DetailsPokemonComponent } from './components/details-pokemon/details-pokemon.component';
import { AboutComponent } from './components/about/about.component';

export const routes: Routes = [
	{path: 'home', redirectTo: '/dashboard'},
	{path: 'dashboard', component: DashboardComponent},
	{
		path: 'pokemon/:nameID', 
		component: DetailsPokemonComponent
	},
	{path: 'about', component: AboutComponent},
	
	{ path: '**', component: NotFoundComponent }
];
