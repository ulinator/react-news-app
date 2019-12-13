import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';

import { withRouter } from 'react-router-dom';

import styles from './CommentForm.module.css';
import { postComment } from '../../utils/helpers.js';

class NormalCommentForm extends React.Component {
  state = {
    API_KEY: "appdev, ih^ZWK06%Y",
    authFailure: false,
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      const { name, comment } = values;

      if (!err && values.checked) {
        this.submitComment(URL, name, comment);
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

  submitComment = async (url, username, comment) => {
    const { id, auth, submit } = this.props;

    try {
      const response = await postComment(id, username, comment, auth);

      if (response.ok) {
        const json = await response.json();
        console.log('json', json);
        submit();
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
    const { TextArea } = Input;

    return (
      <Form onSubmit={this.handleSubmit} className={`login-form ${styles.Form}`}>
        <Form.Item>
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Please input your name!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Name"
              onChange={this.handleInput}
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('comment', {
            rules: [{ required: true, message: 'Please input your comment' }],
          })(
            <TextArea
              rows={4}
              prefix={<Icon type="message" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Your comment..."
              onChange={this.handleInput}
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('checked', {
            valuePropName: 'checked',
            initialValue: false,
            required: true
          })(<Checkbox className={styles.Checkbox}>I accept</Checkbox>)}

          <div className={styles.Controls} >
            <Button
              type="primary"
              htmlType="submit"
              className={`login-form-button ${styles.SubmitButton}`}>
              Submit
            </Button>
            <Button
              type="default"
              htmlType="button"
              className={`login-form-button ${styles.CloseButton}`}
              onClick={this.props.hide}>
              Close
            </Button>
          </div>

        </Form.Item>
      </Form>
    );
  }
}

const WrappedNormalCommentForm = Form.create({ name: 'normal_comment' })(NormalCommentForm);

export default withRouter(WrappedNormalCommentForm);