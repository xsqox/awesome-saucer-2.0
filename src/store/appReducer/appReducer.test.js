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

    it('should increment progress', () => {
        const newState = appReducer(state, {
            type: types.INCREMENT_PROGRESS,
        });
        expect(newState.progress).toEqual(1);
    });

    it('should decrement progress', () => {
        const firstUpdate = appReducer(state, {
            type: types.INCREMENT_PROGRESS,
        });
        const newState = appReducer(firstUpdate, {
            type: types.DECREMENT_PROGRESS,
        });
        expect(newState.progress).toEqual(0);
    });

    it('should decrement progress not more that 0', () => {
        const newState = appReducer(state, {
            type: types.DECREMENT_PROGRESS,
        });
        expect(newState.progress).toEqual(0);
    });

    it('should decrement rounds', () => {
        state.roundsLeft = 9;
        const newState = appReducer(state, {
            type: types.DECREMENT_ROUND,
        });
        expect(newState.roundsLeft).toEqual(8);
    });

    it('should decrement rounds not more that 0', () => {
        state.roundsLeft = 0;
        const newState = appReducer(state, {
            type: types.DECREMENT_ROUND,
        });
        expect(newState.roundsLeft).toEqual(0);
    });

    it('should set active round', () => {
        const newState = appReducer(state, {
            type: types.SET_ACTIVE_ROUND,
            payload: true,
        });
        expect(newState.activeRound).toEqual(true);
        expect(newState.isPrepping).toEqual(true);
    });

    it('should end prepping', () => {
        state.isPrepping = true;
        state.activeRound = true;

        const newState = appReducer(state, {
            type: types.END_PREPPING,
            payload: true,
        });
        expect(newState.activeRound).toEqual(true);
        expect(newState.isPrepping).toEqual(false);
    });
});
