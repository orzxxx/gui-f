import React, { PureComponent, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { List } from 'antd';

import * as RedisCollectionActions from '../actions/redisCollection'
import * as RedisCommandActions from '../actions/redisCommand'

const styles = {
    container: {
        paddingRight: 20,
        maxHeight: "80vh",
        overflowY: "auto"
    }
};

class RedisConnectionContainer extends PureComponent {

    componentDidMount = () => {
        const { redisCollectionActions, connId } = this.props;
        redisCollectionActions.fatchRedisCollection(connId);
    };

    componentDidUpdate = () => {
        // 滚动条自动最下
        this.refs.container.scrollTop = 999999;
    };

    handleClickInput = (values) => {
        const { redisCommandActions } = this.props;
        redisCommandActions.changeInputText(values);
    };

    handleClickRemove = (id) => {
        const { redisCollectionActions } = this.props;
        redisCollectionActions.removeRedisCollection(id);
    };

    render() {
        const { redisCommands, disabled } = this.props;

        return (
            <div ref="container" style={styles.container}>
                {redisCommands.length !== 0 &&
                <List bordered size="small">
                    {[].concat(redisCommands).reverse().map((c, i) =>
                        <List.Item
                            key={i}
                            actions={[
                                    <a onClick={() => this.handleClickInput(c.command)} disabled={disabled}>Input</a>,
                                    <a onClick={() => this.handleClickRemove(c.id)} disabled={disabled}>Remove</a>
                                ]}
                        >
                            {c.command}
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
        redisCommands: state.redisCollection.redisCommands
    }),
    dispatch => ({
        redisCommandActions: bindActionCreators(RedisCommandActions, dispatch),
        redisCollectionActions: bindActionCreators(RedisCollectionActions, dispatch)
    })
)(RedisConnectionContainer)
