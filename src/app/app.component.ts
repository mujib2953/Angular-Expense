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
		isModalActive: false,
		signInData: {
			// user_name: '',
			// password: '',
			// mobile_no: '',
			// isPasswordActive: true
			
			user_name: 'test',
			password: '123',
			mobile_no: '9876543210',
			isPasswordActive: true
		},

		signUpData: {
			name: '',
			mobile_no: '',
			user_name: '',
			password: '',
			re_password: '',
			email_id: '',
			isPasswordActive: true


			// name: 'Test',
			// mobile_no: '9876543210',
			// user_name: 'test',
			// password: '123',
			// re_password: '123',
			// email_id: 'test@test.com',
			// isPasswordActive: true
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

		const user_name 	= this.sharedData.signInData.user_name.trim(),
			password 		= this.sharedData.signInData.password.trim(),
			mobile_no 		= this.sharedData.signInData.mobile_no.trim();

		let msg: string = '';

		if( user_name && password && mobile_no ) {
			// --- will call Api for sign in
			let signInResp = this.dataService.postCall({
				url: this.dataService.API_list.signInApi,
				dataToSend: {
					user_name	: user_name,
					password	: password,
					mobile_no	: mobile_no
				}
			});

			signInResp.subscribe( data => {
				console.log( data );
			} )

		} else {
			if ( user_name === '' )  {
				msg = 'User name should not be blank.';
			} else if ( password === '' )  {
				msg = 'Password should not be blank.';
			} else if  ( mobile_no === '' ) {
				msg = 'Mobile number should not be blank.';
			}

			this.sharedData.errorText = msg;
		}
	};

	_doSignup(): void {
		console.log( 'Will Sign up', this.sharedData );

		const name 		= this.sharedData.signUpData.name.trim(),
			mobile_no 	= this.sharedData.signUpData.mobile_no,
			user_name 	= this.sharedData.signUpData.user_name.trim(),
			password 	= this.sharedData.signUpData.password.trim(),
			re_password = this.sharedData.signUpData.re_password.trim(),
			email_id 	= this.sharedData.signUpData.email_id.trim();

		let msg: string = '';

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
						mobile_no	: mobile_no,
						name		: name,
						user_name	: user_name,
						password	: password,
						email_id	: email_id
					}
				} );

				signUpResp.subscribe( data=> {
					
					if( data.success ) {
						this.sharedData.isModalActive = true;
					} else {
						this.sharedData.errorText = ( data.message.trim() !== '' ) ? data.message.trim() : "Something wrong happend, Please try agin."
					}

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

	_doCloseModal(): void {
		this.sharedData.isModalActive = false;
	};

	_doRefreshPage(): void {
		window.location.reload();
	}
}
