import { createStore }              from 'redux';

const store = createStore();

store.subscribe( () => {
    console.log( 'Store is Changed', store.getState() );
} );
export default store;