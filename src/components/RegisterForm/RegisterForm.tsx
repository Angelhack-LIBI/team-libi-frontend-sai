import React, { useState, FunctionComponent } from "react";
import {
  Form,
  Input,
  Tooltip,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
} from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import axiosInstance from "api/AxiosInstance";
// import axiosInstance from "api";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const RegistrationForm: FunctionComponent<any> = () => {
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    console.log("Received values of form: ", values);
    const data = await axiosInstance.post("/account/", values)
    console.log('data', data)
  };

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      scrollToFirstError
    >
      <Form.Item
        name="name"
        label="이름"
        rules={[
          {
            required: true,
            message: "이름을 입력해주세요!",
          }
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="phone"
        label="휴대폰번호"
        rules={[
          {
            required: true,
            message: "휴대폰 번호를 입력해주세요!",
          }
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please confirm your password!",
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                "The two passwords that you entered do not match!"
              );
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item {...{ wrapperCol: { span: 24 }}}>
        <Button style={{ width: '100%' }} type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegistrationForm;
