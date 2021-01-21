export const SUBSCRIBE = 'SUBSCRIBE';
export const UNSUBSCRIBE = 'UNSUBSCRIBE';

export const GET_ALL_PROGRAMS = 'GET_ALL_PROGRAMS';
export const GET_RECENT_PROGRAMS = 'GET_RECENT_PROGRAMS';
export const GET_POPULAR_PROGRAMS = 'GET_POPULAR_PROGRAMS';
export const GET_SUBSCRIBED_PROGRAMS = 'GET_SUBSCRIBED_PROGRAMS';
export const GET_ACTIVE_PROGRAMS = 'GET_ACTIVE_PROGRAMS';
export const GET_SINGLE_PROGRAM = 'GET_SINGLE_PROGRAM';

export const ADD_RECENT_PROGRAM = 'ADD_RECENT_PROGRAM';

export const SEARCH_PROGRAMS = 'SEARCH_PROGRAMS';

export const FETCH_ALL_PROGRAMS = 'FETCH_ALL_PROGRAMS';
export const FETCH_RECENT_PROGRAMS = 'FETCH_RECENT_PROGRAMS';
export const FETCH_POPULAR_PROGRAMS = 'FETCH_POPULAR_PROGRAMS';
export const FETCH_SUBSCRIBED_PROGRAMS = 'FETCH_SUBSCRIBED_PROGRAMS';
export const FETCH_ACTIVE_PROGRAMS = 'FETCH_ACTIVE_PROGRAMS';
export const FETCH_SINGLE_PROGRAM = 'FETCH_SINGLE_PROGRAM';

export const FETCH_ERROR = 'FETCH_ERROR';
export const RESET_PROGRAMS = 'RESET_PROGRAMS';

export const subscribe = (programTitle) => ({
    type: SUBSCRIBE,
    programTitle
});
export const unsubscribe = (programTitle) => ({
    type: UNSUBSCRIBE,
    programTitle
});

export const getAllPrograms = () => ({
    type: GET_ALL_PROGRAMS
});
export const getRecentPrograms = () => ({
    type: GET_RECENT_PROGRAMS
});
export const getPopularPrograms = () => ({
    type: GET_POPULAR_PROGRAMS
});
export const getSubscribedPrograms = () => ({
    type: GET_SUBSCRIBED_PROGRAMS
});
export const getActivePrograms = () => ({
    type: GET_ACTIVE_PROGRAMS
});
export const getSingleProgram = (programTitle) => ({
    type: GET_SINGLE_PROGRAM,
    programTitle
})

export const addRecentProgram = (programTitle) => ({
    type: ADD_RECENT_PROGRAM,
    programTitle
})

export const searchPrograms = (searchText) => ({
    type: SEARCH_PROGRAMS,
    searchText
});

export const resetPrograms = () =>({
    type: RESET_PROGRAMS
});