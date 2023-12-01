import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DetailsPokemonComponent } from './components/details-pokemon/details-pokemon.component';

export const routes: Routes = [
	{path: 'home', component: HomeComponent},
	{path: 'dashboard', component: DashboardComponent},
	{
		path: 'pokemon/:nameID', 
		component: DetailsPokemonComponent
	},
	// {path: 'home', component: HomeComponent},
	
	{ path: '**', component: NotFoundComponent }
];
