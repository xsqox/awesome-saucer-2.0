import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { render, screen, fireEvent } from '@testing-library/react';
import { ConnectedApp } from './App';
import createInitialState from './store/createInitialState';
import * as appActions from './store/appActions/appActions';
import * as timeUtils from 'src/utils/time.utils';
import { setUserPickId } from './store/appActions/appActions';

jest.useFakeTimers();

jest.mock('./utils/list.utils', () => ({
    shuffle: () => [[2, 0, 1], jest.fn()],
}));

jest.mock('./utils/time.utils', () => ({
    asyncTimeout: () =>
        new Promise((resolve) => {
            resolve();
        }),
}));

jest.mock('./store/appActions/appActions');

describe('<App>', () => {
    describe('Connected App', () => {
        let mockStore;
        let state;
        let store;
        beforeEach(() => {
            appActions.setSaucers.mockReturnValue({ type: 'MOCKED' });
            appActions.setCurrentWinId.mockReturnValue({ type: 'MOCKED' });
            appActions.setActiveRound.mockReturnValue({ type: 'MOCKED' });
            appActions.endPrepping.mockReturnValue({ type: 'MOCKED' });

            mockStore = configureMockStore();

            state = { app: createInitialState() };
            store = mockStore(() => ({ ...state }));
        });

        it('should read `saucers` prop from the store', () => {
            render(
                <Provider store={store}>
                    <ConnectedApp />
                </Provider>
            );
            expect(screen.getByTestId('saucer-1')).toBeInTheDocument();
            expect(screen.getByTestId('saucer-2')).toBeInTheDocument();
            expect(screen.getByTestId('saucer-0')).toBeInTheDocument();
        });

        it('should pick and set current win id  when start button is clicked', () => {
            render(
                <Provider store={store}>
                    <ConnectedApp />
                </Provider>
            );
            fireEvent.click(screen.getByTestId('start-button'));
            jest.runAllTimers();
            expect(appActions.setCurrentWinId).toHaveBeenCalled();
        });

        it('should shuffle saucers when start button is clicked', async () => {
            const callback = async () => {
                await timeUtils.asyncTimeout();
                expect(appActions.setSaucers).toHaveBeenCalled();
            };
            render(
                <Provider store={store}>
                    <ConnectedApp />
                </Provider>
            );
            fireEvent.click(screen.getByTestId('start-button'));
            await callback();
        });

        it('should end prepping after shuffling', async () => {
            const callback = async () => {
                for (let i = 0; i < 20; i += 1) {
                    await timeUtils.asyncTimeout();
                }
                expect(appActions.endPrepping).toHaveBeenCalled();
            };
            render(
                <Provider store={store}>
                    <ConnectedApp />
                </Provider>
            );
            fireEvent.click(screen.getByTestId('start-button'));
            await callback();
        });

        describe('when the game has started', () => {
            const setupRound = () => {
                render(
                    <Provider store={store}>
                        <ConnectedApp />
                    </Provider>
                );
                fireEvent.click(screen.getByTestId('start-button'));
                const callback = async () => {
                    for (let i = 0; i < 20; i += 1) {
                        await timeUtils.asyncTimeout();
                    }
                };
                callback();
                fireEvent.click(screen.getByTestId('saucer-2'));
            };

            beforeEach(() => {
                appActions.setUserPickId.mockReturnValue({ type: 'MOCKED' });
            });

            afterEach(() => {
                appActions.setUserPickId.mockClear();
            });

            it('should dispatch `setUserPickId` when user picks a saucer', () => {
                setupRound();
                expect(appActions.setUserPickId).toHaveBeenCalled();
            });

            it('should dispatch `setRoundActive(false)` after user picks a saucer', () => {
                setupRound();
                expect(appActions.setActiveRound).toHaveBeenCalledWith(false);
            });

            it('should dispatch `setCurrentWinId(null)` after user picks a saucer and timeout expires', () => {
                setupRound();
                jest.runAllTimers();
                expect(appActions.setCurrentWinId).toHaveBeenCalledWith(null);
            });

            it('should dispatch `setUserPickId(null)` after user picks a saucer and timeout expires', () => {
                setupRound();
                jest.runAllTimers();
                expect(appActions.setUserPickId).toHaveBeenCalledWith(null);
            });
        });
    });
});
