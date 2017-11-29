import { Component, OnInit } 			from '@angular/core';
import { Router } from '@angular/router';
import { DataService } 					from '../data.service';
@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	constructor(
		private router: Router,
		private dataService: DataService
	) { }

	ngOnInit() {
		let userCookie = this.dataService.getCookies( 'userData' ),
			oScope: any = this;
		if( userCookie.trim() === '' ) {
			this.router.navigate(['/login']);
		}
		
		this.dataService.toggleLoader( true );

		if( this.dataService.serviceShareData.languages === null ) {
			this.dataService.readAvailableLanguage( function() {
				oScope.dataService.readAvailableTrans();
			} );
			this.dataService.readAvaliableCurrency();
		}
		
		this.dataService.toggleLoader( false );

	}

}
