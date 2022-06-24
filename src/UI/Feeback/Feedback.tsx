import React, { FC, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { isGuessedRight } from 'src/store/appSelectors/appSelectors';

const winMessages = [
    'Maybe you will even get to pilot',
    'We have black hole roller coasters',
    "That's gonna be hell of a ride!",
    'Ever been on Super Nova?',
    'Sky is no limit',
    'Be my Valentine!',
    'Will you marry me?',
    'Warp One Engage!',
    'Come with me, into the ship',
    'Universe can be yours',
    'Fly over, fly over!',
    'Permission to come on board soon!',
    'Up we go!',
    'Departing soon',
    'Prepare to take off',
    'Zero gravity is fun!',
    'You might be the only one',
];

const lostMessages = [
    'Nope',
    'Nobody cares',
    'Abort mission',
    'Oh oh, again!',
    'Yep it happened again',
    "Who's gonna be left behind eh",
    "What's taking you so long?",
    'No space trips for ya',
    'Loser!',
    'You were doing so well',
    'Oopsy Daisy',
    'Keep trying',
    'Dismissed!',
    'Kinda disappointing',
    'Never give up!',
    'Are you always like that?',
    'Just walk away, friend, just walk away...',
    "You just don't wanna go?",
    'You are pathetic',
    'No luck, buddy',
    "Don't ever play roulette",
    'This is embarrassing',
    'Lol',
    'Crawling is your thing',
    'You poor worm...',
    'You are the worst',
    'Haha!',
    'Earthworm',
    'Just one more time',
    'Just go...',
    'Are you done already?',
    'You not gonna make it',
    'Access denied',
    "We don't need you",
    "Lam'oh",
];

interface IFeedbackProps {
    isWin: boolean;
}

const getMessage = (isWin) => {
    if (isWin) {
        return winMessages[Math.floor(Math.random() * winMessages.length)];
    } else {
        return lostMessages[Math.floor(Math.random() * lostMessages.length)];
    }
}

const Feedback: FC<IFeedbackProps> = ({ isWin }): JSX.Element => {
    const [message, setMessage] = useState('');
    const testId = isWin ? 'win-message' : 'lost-message';

    useEffect(() => {
       setMessage(getMessage(isWin));
    }, [isWin]);

    return <div data-testid={testId}>{message}</div>;
};

const mapStateToProps = (state) => {
    return {
        isWin: isGuessedRight(state),
    };
};

export const ConnectedFeedback = connect(mapStateToProps)(Feedback);
export default Feedback;
