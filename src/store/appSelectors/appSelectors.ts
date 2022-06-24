import { createSelector } from 'reselect';

const doIdsMatch = (state) => {
    if (!Number.isFinite(state.app.currentWinId) || !Number.isFinite(state.app.pickedID)) {
        return undefined;
    }
    return state.app.currentWinId === state.app.pickedID;
}
export const isGuessedRight = createSelector(doIdsMatch, (result) => result);
