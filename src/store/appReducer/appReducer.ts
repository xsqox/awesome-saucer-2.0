import createInitialState from 'src/store/createInitialState';
import {
    SET_SAUCERS,
    SET_CURRENT_WIN_ID,
    SET_PICKED_ID,
    INCREMENT_PROGRESS,
    DECREMENT_PROGRESS,
    DECREMENT_ROUND,
    SET_ACTIVE_ROUND,
    END_PREPPING,
} from 'src/store/appReducer/appTypes';

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
        case SET_CURRENT_WIN_ID: {
            return {
                ...state,
                currentWinId: action.payload,
            };
        }
        case INCREMENT_PROGRESS: {
            return {
                ...state,
                progress: state.progress + 1,
            };
        }

        case DECREMENT_PROGRESS: {
            return {
                ...state,
                progress: state.progress ? state.progress - 1 : 0,
            };
        }
        case DECREMENT_ROUND: {
            return {
                ...state,
                roundsLeft: state.roundsLeft ? state.roundsLeft - 1 : 0,
            };
        }
        case SET_ACTIVE_ROUND: {
            return {
                ...state,
                isPrepping: true,
                activeRound: action.payload,
            };
        }
        case SET_ACTIVE_ROUND: {
            return {
                ...state,
                isPrepping: true,
                activeRound: action.payload,
            };
        }
        case END_PREPPING: {
            return {
                ...state,
                isPrepping: false,
            };
        }
    }
    return state;
};

export default reducer;
