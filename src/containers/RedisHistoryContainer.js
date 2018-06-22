import React, { PureComponent, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { List } from 'antd';

import * as RedisCommandActions from '../actions/redisCommand'
import * as RedisCollectionActions from '../actions/redisCollection'

const styles = {
    container: {
        paddingRight: 20,
        maxHeight: "80vh",
        overflowY: "auto"
    }
};

class RedisHistoryContainer extends PureComponent {

    componentDidUpdate = () => {
        // 滚动条自动最下
        this.refs.container.scrollTop = 999999;
    };

    handleClickInput = (value) => {
        const { redisCommandActions } = this.props;
        redisCommandActions.changeInputText(value);
    };

    handleClickAdd = (value) => {
        const { redisCollectionActions, connId } = this.props;
        redisCollectionActions.createRedisCollection({
            connId,
            command: value
        });
    };

    render() {
        const { historyCommands, disabled } = this.props;

        return (
            <div ref="container" style={styles.container}>
                {historyCommands.length !== 0 &&
                    <List bordered size="small">
                        {[].concat(historyCommands).reverse().map((c, i) =>
                            <List.Item
                                key={i}
                                actions={[
                                    <a onClick={() => this.handleClickInput(c)} disabled={disabled}>Input</a>,
                                    <a onClick={() => this.handleClickAdd(c)} disabled={disabled}>Add to favorites</a>
                                ]}
                            >
                                {c}
                            </List.Item>
                        )}
                    </List>
                }
            </div>
        )
    }
}

export default connect(
    state => ({
        historyCommands: state.redisCommand.historyCommands,
        connId: state.redisCommand.connId
    }),
    dispatch => ({
        redisCommandActions: bindActionCreators(RedisCommandActions, dispatch),
        redisCollectionActions: bindActionCreators(RedisCollectionActions, dispatch)
    })
)(RedisHistoryContainer)
