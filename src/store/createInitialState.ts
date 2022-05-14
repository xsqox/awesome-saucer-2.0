const createInitialState = () => {
    return {
        saucers: [1, 2, 3],
        pickedID: null,
        currentWinId: null,
        progress: 0, // how many times guessed right, to win 3
        roundsLeft: 10, // with each click decrement
        activeRound: true, // after saucer has been picked, need to click shuffle button
        // to reactivate the round
    };
};

export default createInitialState;
