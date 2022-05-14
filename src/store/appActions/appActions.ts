import { SET_SAUCERS } from '../appReducer/appTypes';

export const setSaucers = (data) => ({
    type: SET_SAUCERS,
    payload: data,
});
