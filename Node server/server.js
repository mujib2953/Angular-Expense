/*
* @Author: mujibur
* @Date:   2017-11-16 14:09:46
* @Last Modified by:   mujibur
* @Last Modified time: 2017-11-23 19:22:36
*/
( function() {
	
	var fs 				= require( 'fs' ),
		
		bodyParse		= require( 'body-parser' ),

		firebase		= require( 'firebase' ),
		express 		= require( 'express' ),
		app 			= new express(),

		bcrypt			= require( 'bcrypt' ),

		cors			= require( 'cors' ),

		morgan			= require( 'morgan' ),

		admin 			= require("firebase-admin"),
		serviceAccount 	= require("./serviceAccountKey.json"),
		db,
		_ref			= 'expense-manger/',
		port 			= 8031;

	var oAllUsers,
		LoadedTransData;

	const saltRounds 	= 10,
		transFilePath 	= 'Translations/trans.json';

	// --- Support for the JSON data in API
	app.use( bodyParse.json() );
	app.use( bodyParse.urlencoded( { extended: true } ) );

	// --- For cross Origin Resource Sharing
	app.use( cors() );

	// --- Will logs the API calls to server
	app.use( morgan( 'dev' ) );

	// --- Initialization of Firebase
	admin.initializeApp({
		credential: admin.credential.cert(serviceAccount),
		databaseURL: "https://expense-manger.firebaseio.com"
	});
	// --- DB refrence
	db = admin.database();
	
	
	// --- will give All user
	function getAllUser( p_fCallback ) {

		if( oAllUsers ) {
			if( p_fCallback )
				p_fCallback();
		} else {
			
			var _userRef = db.ref('/all_users');
			
			_userRef.on('value', function(snapshot) {
				oAllUsers = snapshot.val();
				if( p_fCallback )
					p_fCallback();

			}, function (errorObject) {
				console.log("The read failed: " + errorObject.code);
			});
		}
	};

	// --- will add User to db
	function addNewUser( p_obj, p_fCallback ) {

		var _userRef = db.ref( '/all_users/' ),
			_rootRef = db.ref( '/' ),
			sentData = {
				status: 1
			},
			key = p_obj.mobile_no;

		
		
		_userRef.child( key ).set({
			status: 0,
			change_count: 0
		});
		
		bcrypt.hash( p_obj.password, saltRounds, function(err, hash) {
			
			if( err ) {
				if( p_fCallback )
					p_fCallback( false );
			}
			
			// Store hash in your password DB.
			_rootRef.child( key ).set({
				name			: p_obj.name,
				user_name		: p_obj.user_name,
				password		: p_obj.password,
				// password_hash	: p_obj.password,
				password_hash	: hash,
				email_id		: p_obj.email_id,
				currency		: 'USD',
				initial_balance	: 0.0,
				registered_time : new Date(),
				data 			: "dummyNode"

			});
			
			if( p_fCallback )
				p_fCallback( true );

		});
	};

	
	app.listen( port, function() {
		console.log( 'server is running on : ', port );
	} );
	getAllUser( function() {
		console.log( 'Now we can start.' );
	} );
	

	/*******************************************************************************
	*******************************************************************************
	********************* All the API's available for the APP *********************
	*******************************************************************************
	*******************************************************************************/
	
	/*==================================================================================
	* API Count : 01
	* API Name : /api/dosignup
	* API Type : POST
	* Parameters : { name, user_name, password, mobile_no, email_id } all are mandatory
	* will check if mobile_no is already existing then not allowed to enter new user
	==================================================================================*/
	app.post( '/api/dosignup', ( req, res ) => {
		
		var mobile_no = req.body.mobile_no,
			responseData = {
				success: false,
				message: '',
				data: null
			};
		
		if( oAllUsers[ mobile_no ] === undefined ) {
			addNewUser( req.body, function( p_bool ) {
				if( p_bool ) {
					responseData.message = 'New user is added.';
					responseData.success = true;
				} else 
					responseData.message = 'Unable to add new user.';
					
				res.send( responseData );
			} )
		} else {
			responseData.message = 'Already Mobile Number is registered.';
			res.send( responseData );
		}

	} );

	/*==================================================================================
	* API Count : 02
	* API Name : /api/currencies
	* API Type : GET
	* Parameters : N/A
	* will return all the currencies available in firebase
	==================================================================================*/
	app.get( '/api/currencies', function( req, res ) {

		var responseData = {
				success: false,
				message: '',
				data: null
			},
			_currencyRef;

		_currencyRef = db.ref('/currencies');
		_currencyRef.on('value', function(snapshot) {
			
			responseData.data = snapshot.val();
			responseData.success = true;
			responseData.message = 'Success';
			
			res.send( responseData );

		}, function ( errorObject ) {

			responseData.message = 'Unable to read currencies data.';
			
			res.send( responseData );

		});

	} );

	/*==================================================================================
	* API Count : 03
	* API Name : /api/lang
	* API Type : GET
	* Parameters : N/A
	* will return all the supported language
	==================================================================================*/
	app.get( '/api/lang', function( req, res ) {

		var responseData = {
				success: false,
				message: '',
				data: null
			},
			_langRef;

		_langRef = db.ref('/lang');
		_langRef.on('value', function(snapshot) {
			
			responseData.data = snapshot.val();
			responseData.success = true;
			responseData.message = 'Success';
			
			res.send( responseData );

		}, function ( errorObject ) {

			responseData.message = 'Unable to read supported language data.';
			
			res.send( responseData );

		});

	} );

	/*==================================================================================
	* API Count : 03
	* API Name : /api/lang
	* API Type : GET
	* Parameters : N/A
	* will return all the supported language
	==================================================================================*/
	app.post( '/api/dosignin', function( req, res ) {

		var mobile_no = req.body.mobile_no,
			user_name = req.body.user_name,
			password = req.body.password,
			responseData = {
				success: false,
				message: '',
				data: null
			};

		getAllUser( function() {
			if( oAllUsers[ mobile_no ] === undefined ) {
				responseData.message = 'No such user, Please Signup.';
				res.send( responseData );
			} else {
				var _userRef = db.ref('/' + mobile_no);

				_userRef.on('value', function(snapshot) {
					
					let db_data = snapshot.val();



					bcrypt.compare( password, db_data.password_hash, function(err, bcrypt_res) {
						// res == true
						if( bcrypt_res === true ) {
							delete db_data.password;
							delete db_data.password_hash;
							
							responseData.data = db_data;
							responseData.success = true;
							responseData.message = 'Successfuuly Login.';
							res.send( responseData );
						} else {
							responseData.message = 'User name or Password is not correct.';
							res.send( responseData );
						}

					});

				}, function (errorObject) {
					console.log("The read failed: " + errorObject.code);
					responseData.message = "The read failed: " + errorObject.code;
					res.send( responseData );
				});
					

			}

		} );

		
	} );

	/*==================================================================================
	* API Count : 04
	* API Name : /api/trans/{ param }
	* API Type : GET
	* Parameters : N/A
	* will return all the supported language
	==================================================================================*/
	app.get( '/api/trans/:lang_name', function( req, res ) {
		
		var param = req.params.lang_name,
			responseData = {
				success: false,
				message: '',
				data: null
			};

		if( LoadedTransData ) {

			let activeLanguageData = LoadedTransData[ param ];

			if( activeLanguageData ) {
				responseData.data = activeLanguageData;
				responseData.success = true;
				responseData.message = 'Success';

				res.send( responseData );
			} else {
				responseData.message = 'Sorry this language is not supported.';
				res.send( responseData );
			}

		} else {
			fs.readFile( transFilePath, function( p_fileReadError, p_fileData ) {
				if( p_fileReadError ) {
					responseData.message = 'Unable to read file. Please try after some time';
					res.send( responseData );
				}

				LoadedTransData = JSON.parse( p_fileData );
				
				let activeLanguageData = LoadedTransData[ param ];

				if( activeLanguageData ) {
					responseData.data = activeLanguageData;
					responseData.success = true;
					responseData.message = 'Success';

					res.send( responseData );
				} else {
					responseData.message = 'Sorry this language is not supported.';
					res.send( responseData );
				}
				
			} );
		}
	} );
}() );