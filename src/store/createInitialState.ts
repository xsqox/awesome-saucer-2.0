const createInitialState = () => {
    return {
        saucers: [{ id: 1 }, { id: 2 }, { id: 3 }],
        pickedID: null,
        currentWinId: null,
    };
};

export default createInitialState;
