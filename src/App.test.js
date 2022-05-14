import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { render, screen, fireEvent } from '@testing-library/react';
import App, { ConnectedApp } from './App';
import createInitialState from './store/createInitialState';
import * as appActions from './store/appActions/appActions';

jest.useFakeTimers();

jest.mock('./utils/list.utils', () => ({
    shuffle: () => [[3, 1, 2], jest.fn()],
}));

jest.mock('./store/appActions/appActions');

describe('<App>', () => {
    let setSaucers;
    beforeEach(() => {
        setSaucers = jest.fn();
    });

    describe('Connected App', () => {
        let mockStore;
        let state;
        let store;
        beforeEach(() => {
            appActions.setSaucers.mockReturnValue({ type: 'MOCKED' });
            appActions.setCurrentWinId.mockReturnValue({ type: 'MOCKED' });
            appActions.setActiveRound.mockReturnValue({ type: 'MOCKED' });

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
            expect(screen.getByTestId('saucer-3')).toBeInTheDocument();
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

        it('should shuffle saucers when start button is clicked', () => {
            render(
                <Provider store={store}>
                    <ConnectedApp />
                </Provider>
            );
            fireEvent.click(screen.getByTestId('start-button'));
            jest.runAllTimers();
            expect(appActions.setSaucers).toHaveBeenCalled();
        });
    });
});
