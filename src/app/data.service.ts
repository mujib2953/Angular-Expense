import { Injectable } 					from '@angular/core';
import { Http, Headers } 				from '@angular/http';
import { HttpHeaders } 					from '@angular/common/http';

import { API_Ref } 						from './api_ref';

@Injectable()
export class DataService {

	private numArray: number[] = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 0 ];
	API_list: any = {
		signUpApi: '/api/dosignup'
	};
	BASE_URL: string = 'http://localhost:8031';
	constructor(
		private http: Http
	) {

	}
	
	strictTextCheck( p_str: string ): boolean {

		let isFound = true;
		
		for( let i in this.numArray ) {
			if( p_str.indexOf( this.numArray[ i ].toString() ) !== -1 ) {
				isFound = false;
				break;
			}
		}

		return isFound;
	};

	validateEmail( p_email: string ): boolean {
		let isValid: boolean = true;
		const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

		if ( reg.test( p_email ) == false )
			isValid = false 

		// if ( /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test( p_email ) ) {  
		//   isValid = false;
		// }  
		return isValid
	};

	postCall( p_obj: API_Ref ) {

		let httpOptions = {
			headers: new HttpHeaders({ 'Content-Type': 'application/json' })
		};

		if ( typeof p_obj.dataToSend == "undefined" )
			p_obj.dataToSend = "";

		// this.http.get(  )
		return this.http.post( this.BASE_URL + p_obj.url, p_obj.dataToSend, { headers: new Headers() } );
	}
}
