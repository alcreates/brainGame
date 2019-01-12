import authReducer from './authReducers';
import gameReducer from './gameReducer';
import { combineReducers } from 'redux';


const rootReducer = combineReducers({
    auth: authReducer,
    game: gameReducer
})

export default rootReducer;