import React from 'react';
import { Form, Icon, Input, Button } from 'antd';

import { withRouter } from 'react-router-dom';
import { postLogin } from './../../utils/helpers.js';

class NormalLoginForm extends React.Component {
  state = {
    authFailure: false
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      const { username, password } = values;

      if (!err) {
        this.submitLogin(URL, username, password);
      }
    });
  };

  handleInput = e => {
    let inputType = e.target.name;
    let inputValue = e.target.value;

    this.setState({
      [inputType]: inputValue
    })
  }

  submitLogin = async (url, username, password) => {
    const { history } = this.props;

    try {
      const response = await postLogin(username, password);

      if (response.ok) {
        const json = await response.json();
        const { token } = json.data;
        localStorage.setItem('token', JSON.stringify(token));
        history.push('/');
        window.location.reload();
      } else {
        this.setState({
          authFailure: true
        })
      }

    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
              onChange={this.handleInput}
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
              onChange={this.handleInput}
            />,
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Log in
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

export default withRouter(WrappedNormalLoginForm);