const initState = {}

const gameReducer = (state = initState, action) => {
    switch(action.type){
        case 'CREATE_GAME':
            console.log('Created game')
            return state;
        case 'CREATE_GAME_ERROR':
            console.log("ERROR", action.error)
            return state;
        default:
            return state;
    }
}


export default gameReducer