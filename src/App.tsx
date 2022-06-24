import React, { useCallback, FC } from 'react';
import FlipMove from 'react-flip-move';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as appActions from './store/appActions/appActions';
import Saucer from './UI/Saucer/Saucer';
import { ConnectedActions } from 'src/UI/Actions/Actions';
import { shuffle } from 'src/utils/list.utils';
import { asyncTimeout } from 'src/utils/time.utils';
import s from './App.module.css';
import { ConnectedFeedback } from 'src/UI/Feeback/Feedback';

//@TODO render progress and rounds
// clicking and update state
// show ufo under saucer that has been selected as win id
// win animation

interface IAppProps {
    saucers: number[];
    setCurrentWinId: Function;
    setUserPickId: Function;
    setSaucers: Function;
    setRoundActive: Function;
    endPrepping: Function;
}

const App: FC<IAppProps> = ({
    saucers,
    setSaucers,
    setCurrentWinId,
    setUserPickId,
    setRoundActive,
    endPrepping,
}) => {
    const pickRandomSaucer = () => Math.floor(Math.random() * saucers.length);

    const onSaucerClick = (id) => {
        setUserPickId(id);
        setRoundActive(false);
        setTimeout(async () => {
            setCurrentWinId(null);
            setUserPickId(null);
            setRoundActive(true);
            await shuffleSaucers();
            setCurrentWinId(pickRandomSaucer());
        }, 3000);
    };

    const renderSaucers = useCallback(() => {
        return saucers.map((s: number) => (
            <Saucer key={s} id={s} testId={`saucer-${s}`} onClick={onSaucerClick} />
        ));
    }, [saucers]);

    const shuffleSaucers = useCallback(async () => {
        for (let i = 0; i < 20; i += 1) {
            await asyncTimeout(200);
            setSaucers(shuffle(saucers));
        }
        endPrepping();
    }, [saucers, setSaucers, endPrepping]);

    const startRound = useCallback(async () => {
        setCurrentWinId(pickRandomSaucer());
        await shuffleSaucers();
    }, [saucers, shuffleSaucers, setCurrentWinId]);

    return (
        <div className={s.App}>
            <header>
                <Saucer key="main" testId="mother-saucer" scale={2.5} bodyColor="#40E0D0" />
            </header>
            <main>
                {/* @ts-ignore */}
                <FlipMove duration={250} easing="ease-out" className={s.main}>
                    {renderSaucers()}
                </FlipMove>
                <ConnectedActions onClick={startRound} />
                <ConnectedFeedback />
            </main>
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
            setSaucers: appActions.setSaucers,
            setCurrentWinId: appActions.setCurrentWinId,
            setUserPickId: appActions.setUserPickId,
            endPrepping: appActions.endPrepping,
            setRoundActive: appActions.setActiveRound,
        },
        dispatch
    );
};

export const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
