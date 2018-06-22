import { handleActions } from 'redux-actions';
import { message } from 'antd';

import { CREATE_REDIS_COLLECTION_SUCCESS, FATCH_REDIS_COLLECTION_SUCCESS,
    REMOVE_REDIS_COLLECTION_SUCCESS, CREATE_REDIS_COLLECTION_FAILED } from '../constants/actionTypes'

const defaultState = {
    redisCommands: []
};

const redisCollectionReducer = handleActions({
    [CREATE_REDIS_COLLECTION_SUCCESS]: (state, action) => ({
        ...state,
        redisCommands: [...state.redisCommands, {
            command: action.payload.result.command,
            id: action.payload.result.id
        }]
    }),
    [CREATE_REDIS_COLLECTION_FAILED]: (state, action) => {
        message.warning(action.message);
        return {
            ...state
        }
    },
    [REMOVE_REDIS_COLLECTION_SUCCESS]: (state, action) => ({
        ...state,
        redisCommands: state.redisCommands.filter(c => c.id !== action.payload.id)
    }),
    [FATCH_REDIS_COLLECTION_SUCCESS]: (state, action) => ({
        ...state,
        redisCommands: [].concat(action.payload.result)
    })
}, defaultState);

export default redisCollectionReducer