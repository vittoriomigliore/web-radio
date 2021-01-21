import { combineReducers } from 'redux';

import programs from './programs';
import player from './player';

export default combineReducers({
    programs,
    player
});