import { createAction } from 'redux-actions';

import { API_POST, API_GET, TEST } from '../constants/actionTypes'
import Schemas from '../schemas'

export const changeText = createAction(API_GET, (url, text, resultType) => ({url, text, resultType: TEST, schema: Schemas.TEST}));
