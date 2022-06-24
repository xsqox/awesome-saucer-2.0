import { createSelector } from 'reselect';

const doIdsMatch = (state) => state.app.currentWinId === state.app.pickedID;
export const isGuessedRight = createSelector(doIdsMatch, (result) => result);
