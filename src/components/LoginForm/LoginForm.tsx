import React, { FunctionComponent, useCallback } from "react";

import { Form, Input, Button, Checkbox, message } from "antd";
import RegisterModalButton from "components/RegisterModalButton";
import FlexCenter from "components/FlexCenter";
import axiosInstance from "api/AxiosInstance";
import { useRecoilState } from "recoil";
import tokenState from "state/token";

interface ILoginFormProps {
  handleOk?: Function
}

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const tailLayout = {
  wrapperCol: { offset: 6, span: 18 },
};

const LoginForm: FunctionComponent<ILoginFormProps> = ({ handleOk }) => {
  const [, setToken] = useRecoilState(tokenState);


  const onFinish = useCallback(async (values: any) => {
    console.log("Success:", values);
    try {
      const { data } = await axiosInstance.post('/account/token', values)
      console.log('data', data)
      const { access_token: token } = data
      setToken(token)
      localStorage.setItem('libi_token', token);
      if (handleOk) {
        handleOk()
      }
    } catch({ response }) {
      message.error(response?.data?.detail);
    }
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
        label="휴대전화번호"
        name="phone"
        rules={[{ required: true, message: "휴대전화번호를 입력해주세요" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="비밀번호"
        name="password"
        rules={[{ required: true, message: "비밀번호를 입력해주세요" }]}
      >
        <Input.Password />
      </Form.Item>

      {/* <Form.Item {...tailLayout} name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item> */}

      <Form.Item {...{ wrapperCol: { span: 24 }}}>
        <Button style={{ width: '100%' }} type="primary" htmlType="submit">
          로그인
        </Button>
      </Form.Item>

      <FlexCenter style={{ width: '100%' }}>
        <span>아직 회원이 아니세요? </span><RegisterModalButton />
      </FlexCenter>
    </Form>
  );
};

export default LoginForm;
