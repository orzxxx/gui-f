import { createAction } from 'redux-actions';

import { API_POST, API_GET,
    EXECUTE_REDIS_COMMAND_SUCCESS, EXECUTE_REDIS_COMMAND_FETCH, EXECUTE_REDIS_COMMAND_FAILED,
    FATCH_REDIS_COMMAND_TIP_SUCCESS, ADD_CONSOLE_TEXT, CHANGE_INPUT_TEXT } from '../constants/actionTypes'
import Schemas from '../schemas'

export const executeRedisCommand = createAction(API_POST, (connId, params) => ({
    url: "/redis-commants/" + connId,
    params,
    fetchType: EXECUTE_REDIS_COMMAND_FETCH,
    resultType: EXECUTE_REDIS_COMMAND_SUCCESS,
    failedType: EXECUTE_REDIS_COMMAND_FAILED
}));

export const fatchRedisCommandTip = createAction(API_GET, () => ({
    url: "/redis-commants/supported",
    resultType: FATCH_REDIS_COMMAND_TIP_SUCCESS
}));

export const addConsoleText = createAction(ADD_CONSOLE_TEXT, text => ({
    text
}));

export const changeInputText = createAction(CHANGE_INPUT_TEXT, text => ({
    text
}));
