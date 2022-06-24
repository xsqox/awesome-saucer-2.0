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

    it('should return true if currentWinId does not match userPickId', () => {
        expect(
            isGuessedRight({
                app: {
                    currentWinId: 1,
                    pickedID: 2,
                },
            })
        ).toBeFalsy();
    });
});
