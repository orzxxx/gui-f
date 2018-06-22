import React, { PureComponent, PropTypes } from 'react'
import { Form, Input, Radio, Icon, Button, Row, Col } from 'antd';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 }
};

const formItemLayoutWithOutLabel  = {
    wrapperCol: { span: 20, offset: 4 }
};

const styles = {
    deleteBtn: {
        cursor: "pointer",
        position: "relative",
        fontSize: 24,
        color: "#999",
        transition: "all .3s"
    }
};

class RedisConnectionBaseForm extends PureComponent {

    state = {
        type: this.props.info && this.props.info.nodes && this.props.info.nodes.length >= 3 ? 'cluster' : "singleton"
    };

    reset = () => {
        this.props.form.resetFields();
    };

    addNode = () => {
        const { form } = this.props;
        const nodes = form.getFieldValue('nodes');
        form.setFieldsValue({
            nodes: [...nodes, nodes.length]
        });
    };

    removeNode = (i) => {
        const { form } = this.props;
        const nodes = form.getFieldValue('nodes');
        form.setFieldsValue({
            nodes: nodes.slice(0, i).concat(nodes.slice(i + 1))
        });
    };

    handleChange = (e) => {
        let value = e.target.value;
        this.setState({
            type: value
        });
    };

    renderNode = (i) => {
        const { getFieldDecorator } = this.props.form;
        return (
            <Row key={i}>
                <Col offset={4} span={10}>
                    <FormItem>
                        {getFieldDecorator(`hosts[${i}]`, {
                            rules: [
                                { required: true, message: 'host' + (i + 1) + 'is required' }
                            ]
                        })(
                            <Input placeholder={"host" + (i + 1)} />
                        )}
                    </FormItem>
                </Col>
                <Col offset={1} span={6}>
                    <FormItem>
                        {getFieldDecorator(`ports[${i}]`, {
                            rules: [
                                { required: true, message: 'port' + (i + 1) + 'is required' }
                            ]
                        })(
                            <Input placeholder={"port" + (i + 1)} />
                        )}
                    </FormItem>
                </Col>
                <Col offset={1} span={2}>
                    {i > 2 &&
                    <FormItem>
                        <Icon
                            style={styles.deleteBtn}
                            type="minus-circle-o"
                            onClick={() => this.removeNode(i)}
                        />
                    </FormItem>
                    }
                </Col>
            </Row>
        )
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const { form } = this.props;
        getFieldDecorator("nodes", {initialValue: [0, 1, 2]});
        const nodes = form.getFieldValue('nodes');
        const { type } = this.state;
        return (
            <Form>
                <FormItem {...formItemLayout} label="name">
                    {getFieldDecorator('name', {
                        rules: [
                            { required: true, message: 'name is required' }
                        ]
                    })(
                        <Input placeholder="name" />
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label="auth">
                    {getFieldDecorator('auth')(
                        <Input placeholder="auth" />
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label="type">
                    <RadioGroup onChange={this.handleChange} defaultValue={type}>
                        <Radio value="singleton">singleton</Radio>
                        <Radio value="cluster">cluster</Radio>
                    </RadioGroup>
                </FormItem>
                {type === "singleton" &&
                <div>
                    <FormItem {...formItemLayout} label="host">
                        {getFieldDecorator('hosts[0]', {
                            rules: [
                                { required: true, message: 'host is required' }
                            ]
                        })(
                            <Input placeholder="host" />
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="port">
                        {getFieldDecorator('ports[0]', {
                            rules: [
                                { required: true, message: 'port is required' }
                            ]
                        })(
                            <Input placeholder="port" />
                        )}
                    </FormItem>
                </div>
                }
                {type === "cluster" &&
                <div>
                    {nodes.map((n, i) => this.renderNode(i))}
                    <FormItem {...formItemLayoutWithOutLabel}>
                        <Button type="dashed" onClick={this.addNode} style={{ width: '50%' }}>
                            <Icon type="plus" /> Add Node
                        </Button>
                    </FormItem>
                </div>
                }
            </Form>
        )
    }
}
export default Form.create({
    mapPropsToFields: props => {
        const { name, auth, nodes, id } = props.info;
        let fields = {
            id: Form.createFormField({
                value: id
            }),
            name: Form.createFormField({
                value: name
            }),
            auth: Form.createFormField({
                value: auth
            })
        };

        nodes && nodes.forEach((n, i) => {
            fields[`hosts[${i}]`] = Form.createFormField({value: n.host});
            fields[`ports[${i}]`] = Form.createFormField({value: n.port});
        });

        return fields;
    }
})(RedisConnectionBaseForm)
