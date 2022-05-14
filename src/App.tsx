import React, { useState, useCallback, FC } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setCurrentWinId, setSaucers } from './store/appActions/appActions';
import FlipMove from 'react-flip-move';
import Saucer from './UI/Saucer/Saucer';
import { shuffle } from 'src/utils/list.utils';
import s from './App.module.css';
import { ConnectedActions } from 'src/UI/Actions/Actions';

//@TODO render progress and rounds
// clicking and update state
// show ufo under saucer that has been selected as win id
// win animation

interface IAppProps {
    saucers: number[];
    currentWinId: number | null;
    updateCurrentWinId: Function;
    updateSaucers: Function;
}

const App: FC<IAppProps> = ({ saucers, updateSaucers, currentWinId, updateCurrentWinId }) => {
    const renderSaucers = useCallback(() => {
        return saucers.map((s: number) => (
            <Saucer key={s} id={s} testId={`saucer-${s}`} onClick={() => {}} />
        ));
    }, [saucers]);

    const shuffleSaucers = useCallback(() => {
        for (let i = 0; i < 50; i += 1) {
            setTimeout(() => {
                updateSaucers(shuffle(saucers));
            });
        }
    }, [saucers, updateSaucers]);

    const startRound = useCallback(() => {
        updateCurrentWinId(Math.floor(Math.random() * saucers.length));
        shuffleSaucers();
    }, [saucers, shuffleSaucers, updateCurrentWinId]);

    return (
        <div className={s.App}>
            <header>
                <p>Pick the right saucer, win the game!</p>
            </header>
            <main>
                {/* @ts-ignore */}
                <FlipMove duration={250} easing="ease-out" className={s.main}>
                    {renderSaucers()}
                </FlipMove>
            </main>
            <ConnectedActions onClick={startRound} />
        </div>
    );
};

export default App;

const mapStateToProps = (state) => {
    const {
        app: { saucers, currentWinId },
    } = state;
    return { saucers, currentWinId };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            updateSaucers: setSaucers,
            updateCurrentWinId: setCurrentWinId,
        },
        dispatch
    );
};

export const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
