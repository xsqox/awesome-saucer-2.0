import appReducer from './appReducer';
import createInitialState from '../createInitialState';
import * as types from './appTypes';

describe('appReducer', () => {
    let action;
    let state;

    beforeEach(() => {
        state = createInitialState();
        const saucers = [1, 2, 3];
        action = {
            type: {},
            data: saucers,
        };
    });

    it('should return the default state', () => {
        expect(appReducer(undefined, {})).toEqual(state);
    });

    it('should update saucers', () => {
        const newState = appReducer(state, {
            type: types.SET_SAUCERS,
            payload: [1, 2, 3],
        });
        expect(newState.saucers).toEqual([1, 2, 3]);
    });

    it('should update pickedId', () => {
        const newState = appReducer(state, {
            type: types.SET_PICKED_ID,
            payload: 3,
        });
        expect(newState.pickedId).toEqual(3);
    });

    it('should update currentWinId', () => {
        const newState = appReducer(state, {
            type: types.SET_CURRENT_WIN_ID,
            payload: 2,
        });
        expect(newState.currentWinId).toEqual(2);
    });
});
