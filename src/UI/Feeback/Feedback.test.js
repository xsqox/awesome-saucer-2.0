import React from 'react';
import configureMockStore from 'redux-mock-store';

import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';

import { ConnectedFeedback } from './Feedback';
import * as appSelectors from '../../store/appSelectors/appSelectors';
import createInitialState from '../../store/createInitialState';

jest.mock('src/store/appSelectors/appSelectors');

describe('ConnectedFeedback component', () => {
    let state;
    let mockStore;
    let store;
    let onClick;
    beforeEach(() => {
        onClick = jest.fn();
        appSelectors.isGuessedRight.mockReturnValue(true);

        mockStore = configureMockStore();

        state = { app: createInitialState() };
        store = mockStore(() => ({ ...state }));
    });

    it('should render win message if currentWinId and pickedID match', () => {
        render(
            <Provider store={store}>
                <ConnectedFeedback onClick={onClick} />
            </Provider>
        );
        expect(screen.getByTestId('win-message')).toBeInTheDocument();
    });

    it('should render lost message if currentWinId and pickedID do not match', () => {
        appSelectors.isGuessedRight.mockReturnValue(false);
        render(
            <Provider store={store}>
                <ConnectedFeedback onClick={onClick} />
            </Provider>
        );
        expect(screen.getByTestId('lost-message')).toBeInTheDocument();
    });

    it('should render nothing if currentWinId or pickedId are not integers', () => {
        appSelectors.isGuessedRight.mockReturnValue(undefined);
        render(
            <Provider store={store}>
                <ConnectedFeedback onClick={onClick} />
            </Provider>
        );
        expect(screen.queryByTestId('lost-message')).not.toBeInTheDocument();
        expect(screen.queryByTestId('win-message')).not.toBeInTheDocument();
    })
});
