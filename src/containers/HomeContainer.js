import React, { PureComponent, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Button, Row, Col, Layout } from 'antd';

import RedisConsoleContainer from '../containers/RedisConsoleContainer'
import RedisExtraToolContainer from '../containers/RedisExtraToolContainer'
import RedisConnectionContainer from '../containers/RedisConnectionContainer'

const { Header, Footer, Sider, Content } = Layout;

const styles = {
    container: {
        height: "100vh",
        width: "100vw"
    },
    col: {
        marginTop: "5vh"
    }
};

class HomeContainer extends PureComponent {

    render() {
        const text = this.props.text;
        return (
            <Row style={styles.container}>
                <Col style={styles.col} span={8}><RedisConnectionContainer /></Col>
                <Col style={styles.col} span={8}><RedisConsoleContainer /></Col>
                <Col style={styles.col} span={8}><RedisExtraToolContainer /></Col>
            </Row>
        )
    }
}

export default connect(
    state => ({

    }),
    dispatch => ({

    })
)(HomeContainer)