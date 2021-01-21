/* 
Here is where it is supposed to intercept GET actions,
call APIs, consume responses, 
and dispatch FETCH actions 
*/

import {
    takeEvery, call, put
} from 'redux-saga/effects';

import {
    GET_ALL_PROGRAMS,
    GET_POPULAR_PROGRAMS,
    GET_RECENT_PROGRAMS,
    GET_SUBSCRIBED_PROGRAMS,
    GET_SINGLE_PROGRAM,
    GET_ACTIVE_PROGRAMS,
    SEARCH_PROGRAMS,

    FETCH_ALL_PROGRAMS,
    FETCH_POPULAR_PROGRAMS,
    FETCH_RECENT_PROGRAMS,
    FETCH_SUBSCRIBED_PROGRAMS,
    FETCH_ACTIVE_PROGRAMS,
    FETCH_SINGLE_PROGRAM,
    FETCH_ERROR
} from 'actions/programs';
import {
    GET_LIVE_IMAGE,
    GET_LIVE_TEXT,
    FETCH_LIVE_IMAGE,
    FETCH_LIVE_TEXT
} from 'actions/player';

import * as Api from './api';
import * as Errors from './errors';

const fetchAllPrograms = function* (action) {
    try {
        const response = yield call(Api.fetchAllPrograms);
        // const result = yield response.json();
        const result = yield response;
        if (result.error) {
            yield put({ type: FETCH_ERROR, error: Errors.NO_PROGRAM_FOUND });
        } else {
            yield put({ type: FETCH_ALL_PROGRAMS, programs: result.programs });
        }
    } catch (error) {
        // yield put({ type: FETCH_ERROR, error: error });
        yield put({ type: FETCH_ERROR, error: Errors.NO_PROGRAM_FOUND });
    }
}

const fetchActivePrograms = function* (action) {
    try {
        const response = yield call(Api.fetchActivePrograms);
        // const result = yield response.json();
        const result = yield response;
        if (result.error) {
            yield put({ type: FETCH_ERROR, error: Errors.NO_PROGRAM_FOUND });
        } else {
            yield put({ type: FETCH_ACTIVE_PROGRAMS, programs: result.programs });
        }
    } catch (error) {
        // yield put({ type: FETCH_ERROR, error: error });
        yield put({ type: FETCH_ERROR, error: Errors.NO_PROGRAM_FOUND });
    }
}

const fetchSingleProgram = function* (action) {
    try {
        const response = yield call(Api.fetchSingleProgram, action.programTitle);
        // const result = yield response.json();
        const result = yield response;
        if (result.error) {
            yield put({ type: FETCH_ERROR, error: Errors.NO_PROGRAM_FOUND });
        } else {
            yield put({
                type: FETCH_SINGLE_PROGRAM,
                program: result.program,
                podcasts: result.podcasts,
                authors: result.authors
            });
        }
    } catch (error) {
        yield put({ type: FETCH_ERROR, error: error });
        // yield put({ type: FETCH_ERROR, error: Errors.NO_PROGRAM_FOUND });
    }
}

const fetchLiveImage = function* (action) {
    try {
        const response = yield call(Api.fetchLiveImage);
        const result = yield response.json();
        if (result.error) {
            yield put({ type: FETCH_ERROR, error: Errors.NO_IMAGE_FOUND });
        } else {
            yield put({
                type: FETCH_LIVE_IMAGE,
                image: result.url
            });
        }
    } catch (error) {
        yield put({ type: FETCH_ERROR, error: error });
        // yield put({ type: FETCH_ERROR, error: Errors.NO_IMAGE_FOUND });
    }
}

const fetchLiveText = function* (action) {
    try {
        const response = yield call(Api.fetchLiveText);
        const result = yield response.json();
        if (result.error) {
            yield put({ type: FETCH_ERROR, error: Errors.NO_TEXT_FOUND });
        } else {
            yield put({
                type: FETCH_LIVE_TEXT,
                text: result
            });
        }
    } catch (error) {
        yield put({ type: FETCH_ERROR, error: error });
        // yield put({ type: FETCH_ERROR, error: Errors.NO_TEXT_FOUND });
    }
}

const rootSaga = function* () {
    yield takeEvery(GET_ALL_PROGRAMS, fetchAllPrograms);
    yield takeEvery(GET_ACTIVE_PROGRAMS, fetchActivePrograms);
    yield takeEvery(GET_SINGLE_PROGRAM, fetchSingleProgram);

    yield takeEvery(GET_LIVE_IMAGE, fetchLiveImage);
    yield takeEvery(GET_LIVE_TEXT, fetchLiveText);
};

export default rootSaga; 