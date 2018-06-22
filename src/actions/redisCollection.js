import { createAction } from 'redux-actions';

import { API_POST, API_GET, API_DELETE,
    CREATE_REDIS_COLLECTION_SUCCESS, FATCH_REDIS_COLLECTION_SUCCESS,
    REMOVE_REDIS_COLLECTION_SUCCESS, CREATE_REDIS_COLLECTION_FAILED } from '../constants/actionTypes'
import Schemas from '../schemas'

export const createRedisCollection = createAction(API_POST, (params) => ({
    url: "/redis-collections",
    params,
    resultType: CREATE_REDIS_COLLECTION_SUCCESS,
    failedType: CREATE_REDIS_COLLECTION_FAILED
}));

export const fatchRedisCollection = createAction(API_GET, (connId) => ({
    url: "/redis-collections?connId=" + connId,
    resultType: FATCH_REDIS_COLLECTION_SUCCESS
}));

export const removeRedisCollection = createAction(API_DELETE, (id) => ({
    url: "/redis-collections/" + id,
    id,
    resultType: REMOVE_REDIS_COLLECTION_SUCCESS
}));
