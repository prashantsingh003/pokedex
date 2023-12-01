import { Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DetailsPokemonComponent } from './components/details-pokemon/details-pokemon.component';

export const routes: Routes = [
	{path: 'home', redirectTo: '/dashboard'},
	{path: 'dashboard', component: DashboardComponent},
	{
		path: 'pokemon/:nameID', 
		component: DetailsPokemonComponent
	},
	// {path: 'home', component: HomeComponent},
	
	{ path: '**', component: NotFoundComponent }
];
