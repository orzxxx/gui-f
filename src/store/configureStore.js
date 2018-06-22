import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger'

import DevTools from '../containers/DevTools'
import rootRouter from '../reducers'
import { watchGetApiSaga, watchPostApiSaga, watchPutApiSaga, watchDeleteApiSaga } from '../sagas/api'

const sagaMiddleware = createSagaMiddleware();

const enhancer  = compose(
    applyMiddleware(
        logger,
        sagaMiddleware
    ),
    DevTools.instrument()
);



export default function configureStore(initialState) {
    const store = createStore(rootRouter, initialState, enhancer);

    sagaMiddleware.run(watchGetApiSaga);
    sagaMiddleware.run(watchPostApiSaga);
    sagaMiddleware.run(watchPutApiSaga);
    sagaMiddleware.run(watchDeleteApiSaga);

    /*if (module.hot) {
        module.hot.accept('../reducers', () => {
            store.replaceReducer(require('../reducers').default);
        });
    }*/

    return store;
};