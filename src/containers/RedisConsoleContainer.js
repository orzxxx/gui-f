import React, { PureComponent, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Input, Popover } from 'antd';

import '../components/console/redis-console.css';
import * as RedisCommandActions from '../actions/redisCommand'

const styles = {
    tip: {
        margin: 0
    }
};

class RedisConsoleContainer extends PureComponent {

    state = {
        tip: "",
        tipVisible: false,
        historyIndex: -1
    };

    componentDidMount = () => {
        this.props.redisCommandActions.fatchRedisCommandTip();
    };

    componentDidUpdate = () => {
        // console滚动条自动最下
        var editorEle = document.getElementsByClassName("ql-editor")[0];
        editorEle.scrollTop = 999999;
        // 设置焦点
        this.refs.input.focus();
    };

    handleChange = (e) => {
        const { redisCommandActions } = this.props;
        let text = e.target.value;
        if (text === "") {
            this.setState({
                tipVisible: false
            }, () => {
                redisCommandActions.changeInputText(text);
            });
            return;
        }

        let command = text.trim().split(/ +/)[0].toUpperCase();
        if (command.length <= 2) {
            this.setState({
                tipVisible: false
            }, () => {
                redisCommandActions.changeInputText(text);
            });
            return;
        }

        const { tips } = this.props;
        let matchedTipKeys = Object.keys(tips).filter(k => tips[k].startsWith(command));
        if (matchedTipKeys.length > 0) {
            this.setState({
                tip: (
                    <div>
                        {matchedTipKeys.map(k =>
                            <p key={k} style={styles.tip}>{tips[k]}</p>
                        )}
                    </div>
                ),
                tipVisible: true
            }, () => {
                redisCommandActions.changeInputText(text);
            });
        } else {
            this.setState({
                tipVisible: false
            }, () => {
                redisCommandActions.changeInputText(text);
            });
        }
    };

    handlePressEnter = (e) => {
        const { redisCommandActions, connId, connName } = this.props;
        let { value }  = e.target;
        this.props.redisCommandActions.addConsoleText("<span style='color:yellow;'>" + connName + " > " + value + "</span>");

        this.props.redisCommandActions.executeRedisCommand(connId, {
            command: value
        });
        // 清空输入框
        this.setState({
            historyIndex: -1,
            tipVisible: false
        }, () => {
            redisCommandActions.changeInputText("");
        });
    };

    handleKeyDown = (e) => {
        const { historyCommands, redisCommandActions } = this.props;
        if (historyCommands.length === 0) {
            return;
        }

        let { historyIndex } =  this.state;
        if (e.keyCode === 38) {
            e.preventDefault();
            let index = historyIndex + 1 >= historyCommands.length ? historyIndex : historyIndex + 1;
            this.setState({
                historyIndex: index
            }, () => {
                redisCommandActions.changeInputText(historyCommands[index]);
            });
        } else if (e.keyCode === 40) {
            e.preventDefault();
            let index = historyIndex - 1 <= 0 ? 0 : historyIndex - 1;
            this.setState({
                historyIndex: index
            }, () => {
                redisCommandActions.changeInputText(historyCommands[index]);
            });
        }
    };

    render() {
        let modules = {
            toolbar: []
        };
        let { tip, tipVisible } = this.state;
        let { inputDisabled, inputText, consoleText } = this.props;
        return (
            <div>
                <ReactQuill ref="q" className="myQuill" readOnly modules={modules} value={consoleText} />
                <Popover placement="topLeft" content={tip} trigger={'focus'} visible={tipVisible} >
                    <Input ref="input"
                           value = {inputText}
                           disabled={inputDisabled}
                           onChange={this.handleChange}
                           onPressEnter={this.handlePressEnter}
                           onKeyDown={this.handleKeyDown}
                    />
                </Popover>
            </div>
        )
    }
}

export default connect(
    state => ({
        inputText: state.redisCommand.inputText,
        consoleText: state.redisCommand.consoleText,
        tips: state.redisCommand.tips,
        inputDisabled: state.redisCommand.inputDisabled,
        historyCommands: state.redisCommand.historyCommands,
        connId: state.redisCommand.connId,
        connName: state.redisCommand.connName
    }),
    dispatch => ({
        redisCommandActions: bindActionCreators(RedisCommandActions, dispatch)
    })
)(RedisConsoleContainer)