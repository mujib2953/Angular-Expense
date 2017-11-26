import { BrowserModule } 					from '@angular/platform-browser';
import { NgModule } 						from '@angular/core';
import { FormsModule } 						from '@angular/forms';
import { HttpModule } 						from '@angular/http';

import { AppComponent } 					from './app.component';

// --- service
import { DataService } 						from './data.service';
import { FooterComponent } 					from './footer/footer.component';
import { LoaderComponent } from './loader/loader.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { LoginComponent } from './login/login.component';

@NgModule({
	declarations: [
		AppComponent,
		FooterComponent,
		LoaderComponent,
		HomeComponent,
		LoginComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		AppRoutingModule
	],
	providers: [
		DataService
	],
	bootstrap: [
		AppComponent
	]
})
export class AppModule { }
