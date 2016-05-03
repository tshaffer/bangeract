import {combineReducers} from 'redux';
import MediaReducer from './reducer_media';

const rootReducer = combineReducers({
    media: MediaReducer
});

export default rootReducer;

