import TrackPlayer from 'react-native-track-player';
export const LOAD = 'LOAD';
export const PLAY = 'PLAY';
export const PAUSE = 'PAUSE';
export const STOP = 'STOP';
export const BACK_30 = 'BACK_30';
export const FORWARD_30 = 'FORWARD_30';
export const SEEK = 'SEEK';

export const GET_LIVE_IMAGE = 'GET_LIVE_IMAGE';
export const GET_LIVE_TEXT = 'GET_LIVE_TEXT';

export const FETCH_LIVE_IMAGE = 'FETCH_LIVE_IMAGE';
export const FETCH_LIVE_TEXT = 'FETCH_LIVE_TEXT';
export const RESET_PLAYER = 'RESET_PLAYER';


export const load = (track) => {
    TrackPlayer.reset();
    TrackPlayer.add(track);
    return ({
        type: LOAD,
        track
    })
};
export const play = () => {
    TrackPlayer.play();
    return ({
        type: PLAY,
        isPlaying: true
    })
};
export const pause = () => {
    TrackPlayer.pause()
    return ({
        type: PAUSE,
        isPlaying: false
    })
};
export const stop = () => {
    TrackPlayer.stop()
    return ({
        type: STOP,
        isPlaying: false
    })
};
export const back30 = async () => {
    const position = await TrackPlayer.getPosition();
    const nextPosition = position - 30 < 0 ? 0 : position - 30;
    TrackPlayer.seekTo(nextPosition);
    return ({
        type: BACK_30,
    })
};
export const forward30 = async () => {
    const duration = await TrackPlayer.getDuration();
    const position = await TrackPlayer.getPosition();
    const nextPosition = duration < position + 30 ? duration : position + 30;
    TrackPlayer.seekTo(nextPosition);
    return ({
        type: FORWARD_30,
    })
};
export const seek = async (position) => {
    const duration = await TrackPlayer.getDuration();
    TrackPlayer.seekTo(position * duration);
    return ({
        type: SEEK
    })
};
export const getLiveImage = (time) => {
    return ({
        type: GET_LIVE_IMAGE,
        time
    })
};
export const getLiveText = (time) => {
    return ({
        type: GET_LIVE_TEXT,
        time
    })
};
export const resetPlayer = () => {
    return ({
        type: RESET_PLAYER,
    })
}