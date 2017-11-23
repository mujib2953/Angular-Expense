import { Component } 						from '@angular/core';
import { DataService } 						from './data.service';
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	
	isLoginActive: boolean = true;
	sharedData: any = {
		title: 'ExpenzApp',

		signInData: {
			user_name: '',
			password: '',
			mobile_no: '',
			isPasswordActive: true
		},

		signUpData: {
			// name: '',
			// mobile_no: '',
			// user_name: '',
			// password: '',
			// re_password: '',
			// email_id: '',
			// isPasswordActive: true


			name: 'Test',
			mobile_no: '9876543210',
			user_name: 'test',
			password: '123',
			re_password: '123',
			email_id: 'test@test.com',
			isPasswordActive: true
		},

		errorText: ''
	};

	constructor(
		private dataService: DataService
	) {};

	_doToggleTab( tabId: number ): void {
		this.isLoginActive = !this.isLoginActive;
	}

	_doSignin(): void {
		console.log( 'Will Sign In', this.sharedData );
	};

	_doSignup(): void {
		console.log( 'Will Sign up', this.sharedData );

		const name 		= this.sharedData.signUpData.name.trim(),
			mobile_no 	= this.sharedData.signUpData.mobile_no,
			user_name 	= this.sharedData.signUpData.user_name.trim(),
			password 	= this.sharedData.signUpData.password.trim(),
			re_password = this.sharedData.signUpData.re_password.trim(),
			email_id 	= this.sharedData.signUpData.email_id.trim();

		let msg = '';

		if( name && mobile_no && user_name && password && re_password && email_id ) {

			let isValidName = this.dataService.strictTextCheck( name ),
				isValidEmail = this.dataService.validateEmail( email_id );

			if( !isValidName ) {
				this.sharedData.errorText = 'Please input only text in Name';
				return;
			} else if( mobile_no.toString().length !== 10 ) {
				this.sharedData.errorText = 'Please enter valid mobile number.';
				return;
			} else if( password !== re_password ) {
				this.sharedData.errorText = 'Passwords does not match.';
				return;
			} else if( !isValidEmail ) {
				this.sharedData.errorText = 'Please Enter valid email Id.';
				return;
			} else {
				// --- All is good Now add User will call
				let signUpResp =  this.dataService.postCall( {
					url: this.dataService.API_list.signUpApi,
					dataToSend: {
						mobile_no: mobile_no,
						name: name,
						user_name: user_name,
						password: password,
						email_id: email_id
					}
				} );

				console.log( signUpResp );

				signUpResp.subscribe( data=> {
					console.log( data );
				} )
			}

		} else {
			// --- user has missed some of the fields.
			
			if( name === '' ) {
				msg = 'Name should not be blank.';
			} else if  ( mobile_no === '' ) {
				msg = 'Mobile number should not be blank.';
			} else if ( user_name === '' )  {
				msg = 'User name should not be blank.';
			} else if ( password === '' )  {
				msg = 'Password should not be blank.';
			} else if ( re_password === '' )  {
				msg = 'Confirm password should not be blank.';
			} else if ( email_id === '' )  {
				msg = 'Email_id should not be blank.';
			}
			this.sharedData.errorText = msg;
		}
	};

	_doChangePasswordFeild( p_num: number ): void {
		console.log( 'Will change.' );
		if( p_num === 1 )
			this.sharedData.signInData.isPasswordActive = !this.sharedData.signInData.isPasswordActive;
		else if( p_num === 2 )
		this.sharedData.signUpData.isPasswordActive = !this.sharedData.signUpData.isPasswordActive;
	};
}
