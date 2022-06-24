import configureMockStore from 'redux-mock-store';

import { Provider } from 'react-redux';
import { render, screen, fireEvent } from '@testing-library/react';
import { ConnectedActions } from './Actions';
import createInitialState from '../../store/createInitialState';
import * as appActions from '../../store/appActions/appActions';

jest.mock('../../store/appActions/appActions');

describe('ConnectedActions', () => {
    let mockStore;
    let state;
    let store;
    let onClick;
    beforeEach(() => {
        onClick = jest.fn();
        appActions.setActiveRound.mockReturnValue({ type: 'MOCKED' });

        mockStore = configureMockStore();

        state = { app: createInitialState() };
        store = mockStore(() => ({ ...state }));
    });

    describe('when game has not yet started', () => {
        it('should render Start the game button', () => {
            render(
                <Provider store={store}>
                    <ConnectedActions onClick={onClick} />
                </Provider>
            );
            expect(screen.getByTestId('start-button')).toBeInTheDocument();
        });

        it('should start the round when button is clicked', () => {
            render(
                <Provider store={store}>
                    <ConnectedActions onClick={onClick} />
                </Provider>
            );
            fireEvent.click(screen.getByTestId('start-button'));
            expect(appActions.setActiveRound).toHaveBeenCalledWith(true);
        });

        it('should call onClick callback when button is clicked', () => {
            render(
                <Provider store={store}>
                    <ConnectedActions onClick={onClick} />
                </Provider>
            );
            fireEvent.click(screen.getByTestId('start-button'));
            expect(onClick).toHaveBeenCalled();
        });
    });

    describe('when game has started', () => {
        it('should not render Start the game button', async () => {
            state = {
                app: {
                    activeRound: true,
                },
            };
            await store.dispatch({ type: 'Mocked' });
            render(
                <Provider store={store}>
                    <ConnectedActions />
                </Provider>
            );
            expect(screen.queryByTestId('start-button')).not.toBeInTheDocument();
        });

        it('should show nothing if round isPrepping', async () => {
            state = {
                app: {
                    activeRound: true,
                    isPrepping: true,
                },
            };
            await store.dispatch({ type: 'Mocked' });
            render(
                <Provider store={store}>
                    <ConnectedActions />
                </Provider>
            );
            expect(screen.queryByTestId('start-button')).not.toBeInTheDocument();
            expect(screen.queryByTestId('hint')).not.toBeInTheDocument();
        });
    });
});
