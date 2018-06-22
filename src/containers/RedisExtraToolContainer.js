import React, { PureComponent, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Tabs } from 'antd';

import RedisHistoryContainer from './RedisHistoryContainer'
import RedisCollectionContainer from './RedisCollectionContainer'

const { TabPane } = Tabs;

class RedisExtraToolContainer extends PureComponent {

    render() {
        const { disabled } = this.props;

        return (
            <Tabs defaultActiveKey="1" size="large" tabPosition="left">
                <TabPane tab="History" key="1" disabled={disabled} >
                    <RedisHistoryContainer disabled={disabled} />
                </TabPane>
                <TabPane tab="Favorite" key="2" disabled={disabled} >
                    <RedisCollectionContainer disabled={disabled} />
                </TabPane>
            </Tabs>
        )
    }
}

export default connect(
    state => ({
        disabled: state.redisCommand.connId === null
    }),
    dispatch => ({

    })
)(RedisExtraToolContainer)