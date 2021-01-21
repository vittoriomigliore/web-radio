import Fuse from 'fuse.js';
import {
    SUBSCRIBE,
    UNSUBSCRIBE,

    ADD_RECENT_PROGRAM,

    SEARCH_PROGRAMS,

    FETCH_ALL_PROGRAMS,
    FETCH_ACTIVE_PROGRAMS,
    FETCH_ERROR,
    FETCH_SINGLE_PROGRAM,

    RESET_PROGRAMS
} from 'actions/programs';

import config from 'config/config';

const searchProgramOptions = {
    findAllMatches: true,
    keys: ['title', 'description'],
    id: 'title',
    threshold: 0.3,
}

const initialState = {
    user: {},
    subscribed: [],
    popular: [],
    recent: [],
    active: [],
    programs: [],
    authors: [],
    podcasts: [],
    found: [],
    error: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SUBSCRIBE:
            if (!state.subscribed.includes(action.programTitle)) {
                return {
                    ...state,
                    subscribed: [...state.subscribed, action.programTitle]
                }
            } else {
                return state;
            }
        case UNSUBSCRIBE:
            if (state.subscribed.includes(action.programTitle)) {
                return {
                    ...state,
                    subscribed: state.subscribed.filter((item) => {
                        return item !== action.programTitle
                    })
                }
            }
        case ADD_RECENT_PROGRAM:
            var recent = state.recent;
            /*  
            *   if array already have program
            *   remove program and insert at top of array
            *   if array haven't program
            *   insert at top of array
            */
            if (recent.includes(action.programTitle)) {
                recent = recent.filter((item) => {
                    return item !== action.programTitle;
                })
                recent.unshift(action.programTitle)
            } else {
                recent.unshift(action.programTitle)
            }
            /*  take only first x element of array   */
            recent.slice(config.home_items_No.recent);
            return {
                ...state,
                recent
            }
        case SEARCH_PROGRAMS:
            var fuse = new Fuse(state.programs, searchProgramOptions)
            return {
                ...state,
                found: fuse.search(action.searchText)
            }
        case FETCH_ALL_PROGRAMS:
            return {
                ...state,
                programs: action.programs,
                error: null,
            }
        case FETCH_ACTIVE_PROGRAMS:
            return {
                ...state,
                active: action.programs.map((prog, ind) => {
                    return prog.title
                }),
                error: null
            }
        case FETCH_SINGLE_PROGRAM:
            return {
                ...state,
                programs: state.programs.map((item, index) => {
                    if (item.title !== action.program.title) {
                        return item;
                    }
                    return {
                        ...item,
                        ...action.program,
                        podcasts: action.podcasts.map((pod, ind) => {
                            return pod.title
                        }),
                        authors: action.authors.map((auth, ind) => {
                            return {
                                firstName: auth.firstname,
                                lastName: auth.lastname
                            }
                        })
                    }
                }),
                authors: [...state.authors, ...action.authors].reduce(function (result, nextItem) {
                    if (result.some(item => {
                        return item.firstname === nextItem.firstname && item.lastname === nextItem.lastname
                    })) {
                        return result;
                    } else {
                        return result.concat(nextItem)
                    }
                }, []),
                podcasts: [...state.podcasts, ...action.podcasts].reduce(function (result, nextItem) {
                    nextItem.datetime = new Date(nextItem.datetime);
                    if (result.some(item => {
                        return item.title === nextItem.title && item.program_title === nextItem.program_title
                    })) {
                        return result;
                    } else {
                        return result.concat(nextItem)
                    }
                }, []),
                error: null
            }
        case FETCH_ERROR:
            return {
                ...state,
                error: action.error
            }
        case RESET_PROGRAMS:
            return initialState
        default:
            return state
    }
}