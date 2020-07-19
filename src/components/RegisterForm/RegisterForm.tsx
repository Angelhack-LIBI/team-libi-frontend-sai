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
  Modal,
  message,
} from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import axiosInstance from "api/AxiosInstance";
// import axiosInstance from "api";

const success = () => {
  Modal.success({
    content: '회원가입을 축하드립니다',
  });
}

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

const RegistrationForm: FunctionComponent<any> = ({ handleOk }) => {
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    try {
      console.log("Received values of form: ", values);
      const data = await axiosInstance.post("/account/", values)
      console.log('data', data)
      
      success()
      if (handleOk) {
        handleOk()
      } 
    } catch ({ response }) {
      message.error(response?.data?.detail);
    }
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
        label="휴대전화번호"
        rules={[
          {
            required: true,
            message: "휴대전화번호를 입력해주세요!",
          }
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="password"
        label="비밀번호"
        rules={[
          {
            required: true,
            message: "비밀번호를 입력해주세요!",
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        name="confirm"
        label="비밀번호 확인"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "비밀번호와 동일하게 입력해주세요!",
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                "비밀번호가 매칭되지 않습니다"
              );
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item {...{ wrapperCol: { span: 24 }}}>
        <Button style={{ width: '100%' }} type="primary" htmlType="submit">
          회원가입
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegistrationForm;
