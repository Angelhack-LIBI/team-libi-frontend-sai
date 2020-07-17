import React, { FunctionComponent, useCallback } from "react";

import { Form, Input, Button, Checkbox } from "antd";
import RegisterModalButton from "components/RegisterModalButton";
import FlexCenter from "components/FlexCenter";

interface ILoginFormProps {}

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const tailLayout = {
  wrapperCol: { offset: 6, span: 18 },
};

const LoginForm: FunctionComponent<ILoginFormProps> = (props) => {
  const onFinish = useCallback((values: any) => {
    console.log("Success:", values);
  }, []);

  const onFinishFailed = useCallback((errorInfo: any) => {
    console.log("Failed:", errorInfo);
  }, []);

  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailLayout} name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item {...{ wrapperCol: { span: 24 }}}>
        <Button style={{ width: '100%' }} type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>

      <FlexCenter style={{ width: '100%' }}>
        <span>아직 회원이 아니세요? </span><RegisterModalButton />
      </FlexCenter>
    </Form>
  );
};

export default LoginForm;
