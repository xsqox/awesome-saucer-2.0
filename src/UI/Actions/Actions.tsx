import React, { FC, MouseEventHandler } from 'react';
import s from './actions.module.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setActiveRound } from 'src/store/appActions/appActions';

interface IActionsProps {
    activeRound: boolean;
    onClick: Function;
    startRound: Function;
}

const Actions: FC<IActionsProps> = ({ activeRound, onClick, startRound }): JSX.Element => {
    const start = () => {
        startRound(true);
        onClick();
    };
    if (activeRound) {
        return <span>Guess where the alien is!</span>;
    }
    return (
        <button data-testid="start-button" className={s.gameButton} onClick={start}>
            Start the game
        </button>
    );
};

const mapStateToProps = (state) => {
    const {
        app: { activeRound },
    } = state;
    return { activeRound };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            startRound: setActiveRound,
        },
        dispatch
    );
};

export const ConnectedActions = connect(mapStateToProps, mapDispatchToProps)(Actions);

export default Actions;
