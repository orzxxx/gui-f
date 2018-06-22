import { handleActions } from 'redux-actions';
import { EXECUTE_REDIS_COMMAND_SUCCESS, FATCH_REDIS_COMMAND_TIP_SUCCESS, EXECUTE_REDIS_COMMAND_FETCH, DISCONNECT_REDIS_CONNECTION,
    ADD_CONSOLE_TEXT, EXECUTE_REDIS_COMMAND_FAILED, CHANGE_INPUT_TEXT, TEST_REDIS_CONNECTION, TEST_REDIS_CONNECTION_FETCH } from '../constants/actionTypes'

const defaultState = {
    tips: {},
    inputText: "",
    consoleText: "",
    inputDisabled: true,
    historyCommands: [],
    connName: null,
    connId: null
};

const redisCommandReducer = handleActions({
    [FATCH_REDIS_COMMAND_TIP_SUCCESS]: (state, action) => ({
        ...state,
        tips: action.payload.result
    }),
    [ADD_CONSOLE_TEXT]: (state, action) => ({
        ...state,
        consoleText: state.consoleText + action.payload.text + "<br />"
    }),
    [CHANGE_INPUT_TEXT]: (state, action) => ({
        ...state,
        inputText: action.payload.text
    }),
    [TEST_REDIS_CONNECTION_FETCH]: (state, action) => ({
        ...state,
        consoleText: state.consoleText + buildTextSpan("Connecting ...") + "<br />"
    }),
    [TEST_REDIS_CONNECTION]: (state, action) => ({
        ...state,
        consoleText: action.payload.result ? state.consoleText + buildTextSpan("Connected.") + "<br />"
            : state.consoleText + buildTextSpan("Connect failed.") + "<br />",
        connId: action.payload.result ? action.payload.id : null,
        connName: action.payload.result ? action.payload.name : null,
        inputDisabled: !action.payload.result
    }),
    [DISCONNECT_REDIS_CONNECTION]: (state, action) => ({
        ...state,
        connId: null,
        connName: null,
        inputDisabled: true,
        consoleText: state.consoleText + buildTextSpan("Disconnected.") + "<br />"
    }),
    [EXECUTE_REDIS_COMMAND_FETCH]: (state, action) => ({
        ...state,
        inputDisabled: true,
        historyCommands: [action.payload.params.command, ...state.historyCommands]
    }),
    [EXECUTE_REDIS_COMMAND_SUCCESS]: (state, action) => ({
        ...state,
        consoleText: state.consoleText + buildResultText(action.payload.result),
        inputDisabled: false
    }),
    [EXECUTE_REDIS_COMMAND_FAILED]: (state, action) => ({
        ...state,
        consoleText: state.consoleText + buildTextSpan("ERR " + action.message) + "<br />",
        inputDisabled: false
    })
}, defaultState);

var buildResultText = (results) => {
    var result = results.reduce((result, r, i, arr) =>
            result += buildTextSpan((arr.length !== 1 ? (i+1) + ") " : "") + r) + "<br />"
        , "");
    if (result === "") {
        return "<br />";
    }
    return result;
};

var buildTextSpan = (text) => "<span style='color: white;'>" + text + "<span />";

export default redisCommandReducer