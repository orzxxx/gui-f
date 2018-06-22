import { createAction } from 'redux-actions';

import { API_POST, API_PUT, API_GET, API_DELETE,
    CREATE_REDIS_CONNECTION_SUCCESS, REMOVE_REDIS_CONNECTION_SUCCESS, QUERY_REDIS_CONNECTION_SUCCESS, EDIT_REDIS_CONNECTION_SUCCESS,
    FATCH_REDIS_CONNECTION_SUCCESS, CHANGE_REDIS_CONNECTION_MODAL_VISIBLE, DISCONNECT_REDIS_CONNECTION,
    TEST_REDIS_CONNECTION, TEST_REDIS_CONNECTION_FETCH } from '../constants/actionTypes'
import Schemas from '../schemas'

export const createRedisConnection = createAction(API_POST, (params) => ({
    url: "/redis-connections",
    params,
    resultType: CREATE_REDIS_CONNECTION_SUCCESS
}));

export const editRedisConnection = createAction(API_PUT, (params) => ({
    url: "/redis-connections/" + params.id,
    params,
    resultType: EDIT_REDIS_CONNECTION_SUCCESS
}));

export const removeRedisConnection = createAction(API_DELETE, (id) => ({
    url: "/redis-connections/" + id,
    id,
    resultType: REMOVE_REDIS_CONNECTION_SUCCESS
}));

export const fatchRedisConnection = createAction(API_GET, () => ({
    url: "/redis-connections/",
    resultType: FATCH_REDIS_CONNECTION_SUCCESS
}));

export const testRedisConnection = createAction(API_POST, (id, name) => ({
    url: "/redis-connections/test/" + id,
    id,
    name,
    fetchType: TEST_REDIS_CONNECTION_FETCH,
    resultType: TEST_REDIS_CONNECTION
}));

export const disconnectRedisConnection = createAction(DISCONNECT_REDIS_CONNECTION);

export const queryRedisConnection = createAction(API_GET, (id) => ({
    url: "/redis-connections/" + id,
    resultType: QUERY_REDIS_CONNECTION_SUCCESS
}));

export const changeRedisConnectionModalVisible = createAction(CHANGE_REDIS_CONNECTION_MODAL_VISIBLE, (visible) => ({
    visible
}));
