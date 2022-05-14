import React, { useState, useCallback, FC } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setSaucers } from './store/appActions/appActions';
import FlipMove from 'react-flip-move';
import Saucer from './UI/Saucer/Saucer';
import { shuffle } from 'src/utils/list.utils';
import s from './App.module.css';

//@TODO render progress and rounds
// shuffling
// clicking and update state
// show ufo under saucer that has been selected as win id
// win animation

interface IAppProps {
    saucers: number[];
    updateSaucers: Function;
}
const App: FC<IAppProps> = ({ saucers, updateSaucers }) => {
    const renderSaucers = useCallback(() => {
        return saucers.map((s: number) => (
            <Saucer key={s} id={s} testId={`saucer-${s}`} onClick={() => {}} />
        ));
    }, [saucers]);

    const startRound = useCallback(() => {
        for (let i = 0; i < 50; i += 1) {
            setTimeout(() => {
                updateSaucers(shuffle(saucers));
            });
        }
    }, [saucers, updateSaucers]);

    return (
        <div className={s.App}>
            <header>
                <p>Pick the right saucer, win the game!</p>
            </header>
            <main>
                {/* @ts-ignore */}
                <FlipMove duration={150} easing="ease-out" className={s.main}>
                    {renderSaucers()}
                </FlipMove>
            </main>
            <button data-testid="start-button" className={s.gameButton} onClick={startRound}>
                Start the game
            </button>
        </div>
    );
};

export default App;

const mapStateToProps = (state) => {
    const {
        app: { saucers },
    } = state;
    return { saucers };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            updateSaucers: setSaucers,
        },
        dispatch
    );
};

export const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
