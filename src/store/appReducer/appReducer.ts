import createInitialState from 'src/store/createInitialState';
import { SET_SAUCERS, SET_CURRENT_WIN_ID, SET_PICKED_ID } from 'src/store/appReducer/appTypes';

const INITIAL_STATE = createInitialState();

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_SAUCERS: {
            return {
                ...state,
                saucers: action.payload,
            };
        }
        case SET_PICKED_ID: {
            return {
                ...state,
                pickedId: action.payload,
            };
        }
    }
    return state;
};

export default reducer;
