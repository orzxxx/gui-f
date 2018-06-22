import React, { PureComponent, PropTypes } from 'react'
import { Tabs, Modal, Form, Input } from 'antd';

import RedisConnectionBaseForm from '../../components/connection/RedisConnectionBaseForm'
import RedisConnectionExtraForm from '../../components/connection/RedisConnectionExtraForm'

const TabPane = Tabs.TabPane;
const FormItem = Form.Item;

const styles = {
    body: {
        paddingTop: 10,
        paddingLeft: 20
    },
    tabBar: {
        width: "50%"
    }
};

const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 }
};

class RedisConnectionModal extends PureComponent {
    static propTypes = {

    };

    state = {
        activeKey: "1"
    };

    componentDidUpdate = (prevProps, prevState) => {
        if (!this.props.visible && prevState.activeKey !== "1") {
            this.setState({
                activeKey: "1"
            });
        }
    };

    handleTabClick = key => {
        this.setState({
            activeKey: key
        });
    };

    handleOk = (e) => {
        const { redisConnectionActions } = this.props;
        this.refs.baseForm.validateFields((err, values) => {
            if (!err) {
                const { hosts, ports } = values;
                values.nodes = hosts.map((h, i) => ({
                    host: h,
                    port: ports[i]
                }));
                values.id = this.refs.baseForm.getFieldValue('id');
                // extra
                const extra = this.refs.extraForm.getFieldsValue();
                values = {...values, ...extra};
                this.props.onClickOk(values);
            }
        });
    };

    handleCancel = () => {
        this.refs.baseForm.resetFields();
        this.refs.extraForm.resetFields();
        this.props.onClickCancel();
    };

    render() {
        const { visible, node, oper } = this.props;
        const { activeKey } = this.state;
        const text = this.props.text;
        const { getFieldDecorator } = this.props.form;
        return (
            <Modal
                title="Connection"
                bodyStyle={styles.body}
                visible={visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
            >
                <Tabs activeKey={!visible ? "1" : activeKey} type="card" onTabClick={this.handleTabClick}>
                    <TabPane tab="Base" key="1">
                        <RedisConnectionBaseForm ref="baseForm" info={node} oper={oper} />
                    </TabPane>
                    <TabPane tab="Advanced" key="2" forceRender={true}>
                        <RedisConnectionExtraForm ref="extraForm" info={node} />
                    </TabPane>
                </Tabs>
            </Modal>
        )
    }
}

export default Form.create()(RedisConnectionModal)