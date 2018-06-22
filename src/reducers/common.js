import { handleActions } from 'redux-actions';
import { message } from 'antd';

import { FETCH_FAILED } from '../constants/actionTypes'

const defaultState = {
    redisCommands: []
};

const redisCollectionReducer = handleActions({
    [FETCH_FAILED]: (state, action) => {
        message.warning(action.message);
        return {
            ...state
        }
    }
}, defaultState);

export default redisCollectionReducer