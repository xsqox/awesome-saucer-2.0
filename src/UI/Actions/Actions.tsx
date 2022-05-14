import React, { FC } from 'react';
import s from './actions.module.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setActiveRound } from 'src/store/appActions/appActions';

interface IActionsProps {
    activeRound: boolean;
    isPrepping: boolean;
    onClick: Function;
    startRound: Function;
}

const Actions: FC<IActionsProps> = ({
    activeRound,
    isPrepping,
    onClick,
    startRound,
}): JSX.Element => {
    const start = () => {
        startRound(true);
        onClick();
    };
    if (isPrepping) {
        return null;
    }
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
        app: { activeRound, isPrepping },
    } = state;
    return { activeRound, isPrepping };
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
