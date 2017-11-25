import { Injectable } 					from '@angular/core';
import { Http, Headers, Response } 		from '@angular/http';
import { HttpHeaders } 					from '@angular/common/http';

import { POST_API_Ref } 				from './api_ref';
import { GET_API_Ref }					from './api_ref';
import { Cookies } 						from 'cookies-js';

import 'rxjs/Rx';

@Injectable()
export class DataService {

	private numArray: number[] = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 0 ];
	API_list: any = {

		currencies: 	'/api/currencies',
		languages: 		'/api/lang',

		signUpApi: 		'/api/dosignup',
		signInApi: 		'/api/dosignin'
	};
	BASE_URL: string = 'http://localhost:8031';

	serviceShareData: any =  {};

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
			isValid = false; 
		
		return isValid;
	};

	postCall( p_obj: POST_API_Ref ) {

		let httpOptions = {
			headers: new HttpHeaders({ 'Content-Type': 'application/json' })
		};

		if ( typeof p_obj.dataToSend == "undefined" )
			p_obj.dataToSend = "";

		return this.http.post( this.BASE_URL + p_obj.url, p_obj.dataToSend, { headers: new Headers() } ).map( ( res: Response ) => res.json() )
	};

	getCall( p_obj: GET_API_Ref ) {
		return this.http.get( this.BASE_URL + p_obj.url ).map( ( res: Response ) => res.json() );
	};

	getCookies( p_name: string ): any {
		return decodeURIComponent( Cookies.get( p_name ) );
	};

	setCookie( p_obj: any ): void {
		Cookies.set( p_obj.key, p_obj.value );
	};

	readAvaliableCurrency(): void {
		let all_currencies: any = this.getCall({ url: this.API_list.currencies });
		
		all_currencies.subscribe( resp => {
		
			if( resp.success ) {
				this.serviceShareData.currencies = resp.data;
			} else {
				console.warn( 'Currencies Data is not Loaded.' );
			}

		} );
	};

	readAvailableLanguage(): void {
		let langResp: any = this.getCall({
			url: this.API_list.languages
		});

		langResp.subscribe( resp => {
			
			if( resp.success ) {
				this.serviceShareData.languages = resp.data;
			} else {
				console.warn( 'Languages Data is not Loaded.' );
			}
		} );
	};

	/*************************************************************************
	 ************************* Private Functions *****************************
	**************************************************************************/
	
}
