import { CookieService } 				from 'ngx-cookie-service';

import { Injectable } 					from '@angular/core';
import { Http, Headers, Response } 		from '@angular/http';
import { HttpHeaders } 					from '@angular/common/http';
import { Router } 						from '@angular/router';

import { POST_API_Ref } 				from './api_ref';
import { GET_API_Ref }					from './api_ref';

import 'rxjs/Rx';


@Injectable()
export class DataService {

	private numArray: number[] = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 0 ];
	API_list: any = {

		currencies		: '/api/currencies',
		languages		: '/api/lang',
		trans			: '/api/trans/',

		signUpApi		: '/api/dosignup',
		signInApi		: '/api/dosignin'
	};
	BASE_URL: string = 'http://localhost:8031';
	isLoader: boolean = false;
	serviceShareData: any =  {
		actual_languages_lis		: null,
		languages					: null,
		transData					: {},

		currencies					: null,
		actual_currency_lis			: null,

		active_lang					: 'English',
		
	};

	constructor(
		private router				: Router,
		private http				: Http,
		private cookieService		: CookieService
	) {

	}
	
	readAvaliableCurrency(): void {
		let all_currencies: any = this.getCall({ url: this.API_list.currencies });
		
		all_currencies.subscribe( resp => {
		
			if( resp.success ) {
				let tempCurr = [];
				for( let i in resp.data ) {
					tempCurr.push( resp.data[ i ] );
				}
				this.serviceShareData.currencies = tempCurr;
				this.serviceShareData.actual_currency_lis = resp.data;
			} else {
				console.warn( 'Currencies Data is not Loaded.' );
			}

		} );
	};

	readAvailableLanguage( p_fcallback: any ): void {
		let langResp: any = this.getCall({
			url: this.API_list.languages
		});

		langResp.subscribe( resp => {
			
			if( resp.success ) {
				let tempLang = [];
				for( let i in resp.data ) {
					tempLang.push( resp.data[ i ] );
				}
				this.serviceShareData.languages = tempLang;
				this.serviceShareData.actual_languages_lis = resp.data;

				if( p_fcallback )
					p_fcallback();
			} else {
				console.warn( 'Languages Data is not Loaded.' );
			}
		} );
	};

	readAvailableTrans(): void {
		let transResp = this.getCall({
			url: this.API_list.trans + this.getActiveLangCode()
		});

		transResp.subscribe( resp => {
			if( resp.success ) {
				this.serviceShareData.transData = resp.data;
			} else {
				console.warn( 'Translation Data is not Loaded.' );
			}
		} );
	};

	toggleLoader( p_status: boolean ): void {
		this.isLoader = p_status;
	};

	routeToHome(): void {
		if( this.isCookieExist( 'userData' ) )
			this.router.navigate( [ '/home' ] );
	};

	/*************************************************************************
	 ******************** Cookies functions starts here **********************
	**************************************************************************/
	isCookieExist( p_name: string ): boolean {
		return this.cookieService.check( p_name );
	};

	getCookies( p_name: string ): any {
		if( this.isCookieExist( p_name ) ) {
			return decodeURIComponent( this.cookieService.get( p_name ) );
		} else {
			return '';
		}
	};

	getAllCookies(): any {
		return this.cookieService.getAll();
	};

	// set( name: string, value: string, expires?: number | Date, path?: string, domain?: string, secure?: boolean ): void;
	setCookie( p_obj: any ): void {
		this.cookieService.set( p_obj.key, p_obj.value );
	};

	deleteCookie( p_name ): void {
		if( this.isCookieExist( p_name ) ) {
			this.cookieService.delete( p_name );
		}
	};

	deleteAllCookie(): void {
		this.cookieService.deleteAll();
	};
	// --------------- Cookies functions ends here ---------------------------

	/*************************************************************************
	 ******************** API calls starts from here **********************
	**************************************************************************/
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
	// --------------- API calls ends here -----------------------------------

	/*************************************************************************
	 ******************** Some forms validation functions ********************
	**************************************************************************/
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
	// ----------------- Forms validation function ends here -----------------

	/*************************************************************************
	 ************************* Private Functions *****************************
	**************************************************************************/
	private getActiveLangCode(): string {
		return this.serviceShareData.actual_languages_lis[ this.serviceShareData.active_lang ].code;
	};
}
