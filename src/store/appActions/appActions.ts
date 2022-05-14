import {
    SET_SAUCERS,
    SET_CURRENT_WIN_ID,
    SET_ACTIVE_ROUND,
    END_PREPPING,
} from '../appReducer/appTypes';

export const setSaucers = (data) => ({
    type: SET_SAUCERS,
    payload: data,
});

export const setCurrentWinId = (id) => ({
    type: SET_CURRENT_WIN_ID,
    payload: id,
});

export const setActiveRound = (active) => ({
    type: SET_ACTIVE_ROUND,
    payload: active,
});

export const endPrepping = () => ({
    type: END_PREPPING,
});
