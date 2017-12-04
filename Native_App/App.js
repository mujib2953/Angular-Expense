import React 							from 'react';
import store 							from './Redux/store';
import { 
	ActivityIndicator, 
	StyleSheet, 
	Text, 
	View 
} 										from 'react-native';
import { Provider } 					from 'react-redux';

// --- custom
import Loader from './Components/Loader';

export default class App extends React.Component {
	render() {
		return (
			<Provider store={ store } >
				<View style={styles.container}>
					<Loader />
				</View>
			</Provider>
			
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	}
});
store.dispatch( { type: 'CHANGE_NAME', payload: 'Salim Ansari' } );