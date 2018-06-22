import React, { PureComponent, PropTypes } from 'react'
import { Form, Input } from 'antd';

const FormItem = Form.Item;

const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
};

class RedisConnectionExtraForm extends PureComponent {

    reset = () => {
        this.props.form.resetFields();
    };

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <Form>
                <FormItem {...formItemLayout} label="Connection Timeout">
                    {getFieldDecorator('connectionTimeout')(
                        <Input placeholder="Connection Timeout" />
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label="Execution Timeout">
                    {getFieldDecorator('soTimeout')(
                        <Input placeholder="Execution Timeout" />
                    )}
                </FormItem>
            </Form>
        )
    }
}

export default Form.create({
    mapPropsToFields: props => {
        const { connectionTimeout, soTimeout, id } = props.info;
        let fields = {
            id: Form.createFormField({
                value: id
            }),
            connectionTimeout: Form.createFormField({
                value: connectionTimeout
            }),
            soTimeout: Form.createFormField({
                value: soTimeout
            })
        };

        return fields;
    }
})(RedisConnectionExtraForm)
