import { LOAD, PLAY, PAUSE, STOP } from 'actions/player';
import blackSquare from 'res/images';
import { FETCH_LIVE_TEXT, FETCH_LIVE_IMAGE, RESET_PLAYER } from '../actions/player';
const initialState = {
    track: {
        id: '0',
        url: '',
        title: '',
        artist: '',
        artwork: blackSquare,
        isLive: false
    },
    isPlaying: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case LOAD:
            return {
                ...state,
                track: {
                    ...action.track
                }
            }
        case PLAY:
            return {
                ...state,
                isPlaying: action.isPlaying
            }
        case PAUSE:
            return {
                ...state,
                isPlaying: action.isPlaying
            }
        case STOP:
            return {
                ...state,
                isPlaying: action.isPlaying
            }
        case FETCH_LIVE_TEXT:
            return {
                ...state,
                track: {
                    ...state.track,
                    title: action.text
                }
            }
        case FETCH_LIVE_IMAGE:
            return {
                ...state,
                track: {
                    ...state.track,
                    artwork: action.image
                }
            }
        case RESET_PLAYER:
            return initialState;
        default:
            return state;
    }
}