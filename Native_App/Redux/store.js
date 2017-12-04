import { createStore }              from 'redux';
import { customReducers }           from './Reducers/index';

const store = createStore( customReducers );

store.subscribe( () => {
    console.log( 'Store is Changed', store.getState() );
} );
export default store;