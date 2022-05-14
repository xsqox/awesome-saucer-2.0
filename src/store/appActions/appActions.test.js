import configureStore from 'redux-mock-store';

import { setSaucers, setCurrentWinId, setActiveRound } from './appActions';
import { SET_SAUCERS, SET_CURRENT_WIN_ID, SET_ACTIVE_ROUND } from '../appReducer/appTypes';

const mockStore = configureStore();
const store = mockStore();

describe('App actions', () => {
    beforeEach(() => {
        store.clearActions();
    });

    it('should dispatch "SET_SAUCERS" type and payload', () => {
        const expectedActions = [
            {
                type: SET_SAUCERS,
                payload: [2, 3, 1],
            },
        ];

        store.dispatch(setSaucers([2, 3, 1]));
        expect(store.getActions()).toEqual(expectedActions);
    });

    it('should dispatch "SET_CURRENT_WIN_ID" type and payload', () => {
        const expectedActions = [
            {
                type: SET_CURRENT_WIN_ID,
                payload: 11,
            },
        ];

        store.dispatch(setCurrentWinId(11));
        expect(store.getActions()).toEqual(expectedActions);
    });

    it('should dispatch "SET_ACTIVE_ROUND" type and payload', () => {
        const expectedActions = [
            {
                type: SET_ACTIVE_ROUND,
                payload: true,
            },
        ];

        store.dispatch(setActiveRound(true));
        expect(store.getActions()).toEqual(expectedActions);
    });
});
