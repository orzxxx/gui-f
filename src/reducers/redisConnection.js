import { handleActions } from 'redux-actions';
import { message } from 'antd';

import { CREATE_REDIS_CONNECTION_SUCCESS, REMOVE_REDIS_CONNECTION_SUCCESS, QUERY_REDIS_CONNECTION_SUCCESS, EDIT_REDIS_CONNECTION_SUCCESS,
    FATCH_REDIS_CONNECTION_SUCCESS, CHANGE_REDIS_CONNECTION_MODAL_VISIBLE } from '../constants/actionTypes'

const defaultState = {
    redisTreeNode: [],
    visible: false,
    editedNode: {}
};

const redisConnectionReducer = handleActions({
    [CREATE_REDIS_CONNECTION_SUCCESS]: (state, action) => ({
        ...state,
        visible: false,
        redisTreeNode: [...state.redisTreeNode, createRedisTreeNode(action.payload.result)]
    }),
    [EDIT_REDIS_CONNECTION_SUCCESS]: (state, action) => ({
        ...state,
        visible: false,
        redisTreeNode: state.redisTreeNode.map(n => {
            if (n.id === action.payload.result.id) {
                return createRedisTreeNode(action.payload.result)
            } else {
                return n;
            }

        })
    }),
    [REMOVE_REDIS_CONNECTION_SUCCESS]: (state, action) => ({
        ...state,
        redisTreeNode: state.redisTreeNode.filter(n => n.id !== action.payload.id)
    }),
    [CHANGE_REDIS_CONNECTION_MODAL_VISIBLE]: (state, action) => ({
        ...state,
        visible: action.payload.visible,
        editedNode: {}
    }),
    [FATCH_REDIS_CONNECTION_SUCCESS]: (state, action) => ({
        ...state,
        redisTreeNode: [].concat(createRedisTreeNodes(action.payload.result))
    }),
    [QUERY_REDIS_CONNECTION_SUCCESS]: (state, action) => ({
        ...state,
        editedNode: action.payload.result,
        visible: true
    })
}, defaultState);

const createRedisTreeNodes = conns => {
    return conns.map(c => ({
        id: c.id,
        name: c.name,
        children: c.nodes.map(n => n.host + ":" + n.port)
    }));
};

const createRedisTreeNode = conn => {
    return {
        id: conn.id,
        name: conn.name,
        children: conn.nodes.map(n => n.host + ":" + n.port)
    };
};

export default redisConnectionReducer