import { BrowserModule } 					from '@angular/platform-browser';
import { NgModule } 						from '@angular/core';
import { FormsModule } 						from '@angular/forms';
import { HttpModule } 						from '@angular/http';

import { AppComponent } 					from './app.component';
import { CookieService } 					from 'ngx-cookie-service';
import { ChartsModule } 					from 'ng2-charts';

// --- service
import { DataService } 						from './data.service';
import { FooterComponent } 					from './footer/footer.component';
import { LoaderComponent } from './loader/loader.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { DoughnutChartComponent } from './doughnut-chart/doughnut-chart.component';

@NgModule({
	declarations: [
		AppComponent,
		FooterComponent,
		LoaderComponent,
		HomeComponent,
		LoginComponent,
		PageNotFoundComponent,
		LineChartComponent,
		DoughnutChartComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		ChartsModule,
		AppRoutingModule
	],
	providers: [
		CookieService,
		DataService
	],
	bootstrap: [
		AppComponent
	]
})
export class AppModule { }
