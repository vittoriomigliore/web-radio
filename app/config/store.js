import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import reducer from '../reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];
if (process.env.NODE_ENV === 'development') {
    middleware.push(logger);
}

const persistConfig = {
    key: 'root',
    storage,
}
const persistedReducer = persistReducer(persistConfig, reducer)

const store = createStore(persistedReducer, applyMiddleware(...middleware));
const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export { store, persistor };