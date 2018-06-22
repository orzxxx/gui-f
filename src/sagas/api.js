import { takeEvery } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import axios from 'axios'
import { normalize } from 'normalizr';

import { API_GET, API_POST, API_PUT, API_DELETE, FETCH_FAILED } from '../constants/actionTypes'

function callApi(url, method, params) {
    return axios({
        method: method,
        url: url,
        data: params || {}
    }).then(resp => resp)
        .catch(error => {throw error;});
}

function* fetchApi(method, action) {
    try {
        if (action.payload.fetchType) {
            yield put({type: action.payload.fetchType, payload: action.payload});
        }
        const resp = yield call(callApi, action.payload.url, method, action.payload.params);
        const result = (action.payload.schema && normalize(resp.data, action.payload.schema)) || resp.data;
        yield put({
            type: action.payload.resultType,
            payload: {
                ...action.payload,
                result
            }
        });
    } catch (e) {
        yield put({type: action.payload.failedType || FETCH_FAILED, message: (e.response && e.response.data) || "System Error"});
    }
}

export function* watchGetApiSaga() {
    yield* takeEvery(API_GET, fetchApi, "get");
}

export function* watchPostApiSaga() {
    yield* takeEvery(API_POST, fetchApi, "post");
}

export function* watchPutApiSaga() {
    yield* takeEvery(API_PUT, fetchApi, "put");
}

export function* watchDeleteApiSaga() {
    yield* takeEvery(API_DELETE, fetchApi, "delete");
}
