export const initialState = {
    user:null,
    id:23,
};

export const actionTypes = {
    SET_USER : "SET_USER",
    SET_ID : "SET_ID",
};

const reducer = (state, action) => {
    switch(action.type){
        case actionTypes.SET_USER:
            return {
                ...state,
                user: action.user,
            };
        case actionTypes.SET_ID:
            return {
                ...state,
                id: action.id,
            };
        
        default:
            return state;
    }
};

export default reducer;