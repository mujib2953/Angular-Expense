const initialState = {
    name: 'Name',
    isLoader: false
};

export const dataReducer = ( state = initialState, actions ) => {

    switch( actions.type ) {
        case 'CHANGE_NAME':
            state = { ...state, name: actions.payload }
            return state;
        case 'SHOW_LOADER':
            state = { ...state, isLoader: true }
            return state;
        case 'HIDE_LOADER':
            state = { ...state, isLoader: true }
            return state;
        default:
            return state;
    }

};