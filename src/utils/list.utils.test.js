import { shuffle } from './list.utils';

describe('Shuffle util method', () => {
    it('should return array with the same items', () => {
        const initial = [1, 2, 3, 4, 5];
        const result = shuffle(initial);
        expect(result.length).toEqual(initial.length);
        for (let i = 0; i < initial.length; i++) {
            expect(result.indexOf(initial[i])).not.toEqual(-1);
        }
    });
});
