import { NgModule } 					from '@angular/core';
import { RouterModule, Routes } 		from '@angular/router';

// --- my compoenents
import { HomeComponent } 				from '../home/home.component';
import { LoginComponent } 				from '../login/login.component';
import { PageNotFoundComponent } 		from '../page-not-found/page-not-found.component';

const routes: Routes = [
	
	{ path: 'login', component: LoginComponent },
	{ path: 'home', component: HomeComponent },
	{ path: '', redirectTo: '/login', pathMatch: 'full' },
	{ path: '**', component: PageNotFoundComponent },
];


@NgModule({
	exports: [
		RouterModule
	],
	imports: [
		RouterModule.forRoot( routes )
	]
})
export class AppRoutingModule { }
