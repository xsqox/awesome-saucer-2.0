import React, { useState, useCallback } from 'react';
import Saucer from './UI/Saucer/Saucer';
import s from './App.module.css';

//@TODO render progress and rounds
// shuffling
// clicking and update state
// show ufo under saucer that has been selected as win id
// win animation

function App() {
    const [saucers, setSaucers] = useState([{ id: 1 }, { id: 2 }, { id: 3 }]);

    const renderSaucers = useCallback(() => {
        return saucers.map((s) => (
            <Saucer id={s.id} testId={`saucer-${s.id}`} onClick={() => {}} />
        ));
    }, [saucers]);

    return (
        <div className={s.App}>
            <header>
                <p>Pick the right saucer, win the game!</p>
            </header>
            <main>{renderSaucers()}</main>
        </div>
    );
}

export default App;
