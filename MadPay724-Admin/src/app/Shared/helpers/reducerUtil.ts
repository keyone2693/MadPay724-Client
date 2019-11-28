export const createReducer = (initState, fnMap) => {
    return (state = initState, { type, payload }) => {
        const handler = fnMap[type];

        return handler ? handler(state, payload) : state;
    }
}