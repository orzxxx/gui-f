import React, { PureComponent, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Button } from 'antd';

import RedisConnectionTree from '../components/connection/RedisConnectionTree'
import RedisConnectionModel from '../components/connection/RedisConnectionModal'
import * as RedisConnectionActions from '../actions/redisConnection'

class RedisCollectionContainer extends PureComponent {

    componentDidMount = () => {
        const { redisConnectionActions } = this.props;
        redisConnectionActions.fatchRedisConnection();
    };

    handleClickNew = () => {
        const { redisConnectionActions } = this.props;
        redisConnectionActions.changeRedisConnectionModalVisible(true);
    };

    handleClickCancel = () => {
        const { redisConnectionActions } = this.props;
        redisConnectionActions.changeRedisConnectionModalVisible(false);
    };

    handleClickOk = (values) => {
        const { redisConnectionActions } = this.props;
        if (values.id) {
            redisConnectionActions.editRedisConnection(values);
        } else {
            redisConnectionActions.createRedisConnection(values);
        }
    };

    handleClickConnect = (id) => {
        const { redisConnectionActions, treeNodes } = this.props;
        const name = treeNodes.filter(n => n.id === id)[0].name;
        redisConnectionActions.testRedisConnection(id, name);
    };

    handleClickDisconnect = () => {
        const { redisConnectionActions } = this.props;
        redisConnectionActions.disconnectRedisConnection();
    };

    handleClickEdit = (id) => {
        const { redisConnectionActions } = this.props;
        redisConnectionActions.queryRedisConnection(id);
    };

    handleClickRemove = (id) => {
        const { redisConnectionActions } = this.props;
        redisConnectionActions.removeRedisConnection(id);
    };

    render() {
        const { treeNodes, visible, editedNode, connectedId } = this.props;

        return (
            <div>
                <Button type="primary" size="small" icon="plus" onClick={this.handleClickNew}>new</Button>
                <RedisConnectionTree
                    treeNodes={treeNodes}
                    connectedId={connectedId}
                    onClickConnect={this.handleClickConnect}
                    onClickDisconnect={this.handleClickDisconnect}
                    onClickEdit={this.handleClickEdit}
                    onClickRemove={this.handleClickRemove}
                />
                <RedisConnectionModel
                    visible={visible}
                    node={editedNode}
                    onClickCancel={this.handleClickCancel}
                    onClickOk={this.handleClickOk}
                />
            </div>
        )
    }
}

export default connect(
    state => ({
        treeNodes: state.redisConnection.redisTreeNode,
        visible: state.redisConnection.visible,
        editedNode: state.redisConnection.editedNode,
        connectedId: state.redisCommand.connId
    }),
    dispatch => ({
        redisConnectionActions: bindActionCreators(RedisConnectionActions, dispatch)
    })
)(RedisCollectionContainer)
