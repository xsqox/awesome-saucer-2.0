import configureStore from 'redux-mock-store';

import { setSaucers } from './appActions';
import { SET_SAUCERS } from '../appReducer/appTypes';

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
});
