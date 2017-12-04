const initialState = {
    name: 'Name'
};

export const dataReducer = ( state = initialState, actions ) => {

    switch( actions.type ) {
        case 'CHANGE_NAME':
            state = { ...state, name: actions.payload }
            return state;
        default:
            return state;
    }

};