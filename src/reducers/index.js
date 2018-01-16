import {combineReducers} from 'redux';
import queues from './queueReducer'

const rootReducer = combineReducers({
    queues
});

export default rootReducer;