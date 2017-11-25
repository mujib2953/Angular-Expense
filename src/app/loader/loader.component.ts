import { Component, OnInit } 	from '@angular/core';

import { DataService } 			from '../data.service';

@Component({
	selector: 'app-loader',
	templateUrl: './loader.component.html',
	styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

	constructor(
		public dataService: DataService
	) {}

	ngOnInit() {
	}

}
