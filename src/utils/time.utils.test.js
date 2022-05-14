import { asyncTimeout } from './time.utils';

jest.useFakeTimers();

describe('asyncTimeout method', () => {
    it('should resolve after specified timeout', async () => {
        const result = asyncTimeout(15);
        expect(result).toBeTruthy();
    });
});
