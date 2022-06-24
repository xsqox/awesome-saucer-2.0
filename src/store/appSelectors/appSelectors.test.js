import { isGuessedRight } from './appSelectors';

describe('isGuessedRight selector', () => {
    it('should return true if currentWinId matches userPickId', () => {
        expect(
            isGuessedRight({
                app: {
                    currentWinId: 1,
                    pickedID: 1,
                },
            })
        ).toBeTruthy();
    });

    it('should return false if currentWinId does not match userPickId', () => {
        expect(
            isGuessedRight({
                app: {
                    currentWinId: 1,
                    pickedID: 2,
                },
            })
        ).toBeFalsy();
    });

    it('should return undefined if both ids are not integers', () => {
        expect(
            isGuessedRight({
                app: {
                    currentWinId: null,
                    pickedID: null,
                },
            })
        ).toBe(undefined);
    });

    it('should return undefined if any id is not integer', () => {
        expect(
            isGuessedRight({
                app: {
                    currentWinId: 1,
                    pickedID: null,
                },
            })
        ).toBe(undefined);
    });
});
