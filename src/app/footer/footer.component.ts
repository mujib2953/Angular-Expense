import { Component, OnInit } from '@angular/core';

import { DataService } from '../data.service';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

	footerData: any = {
		isLangActive: false
	}

  	constructor(
		public dataService: DataService	
	) {
		console.log( this.dataService.serviceShareData.languages )
	}

	ngOnInit() {
	}

	_doToggleLangauage() {
		this.footerData.isLangActive = !this.footerData.isLangActive;
	};

	_doSelectLanguage( p_name: string ) {
		this.footerData.isLangActive = false;
		this.dataService.serviceShareData.active_lang = p_name.toUpperCase();
	};
}
