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
import { QuestionCircleOutlined, CloseOutlined } from "@ant-design/icons";

import ImageUploader from 'react-images-upload';
import FlexCenter from "components/FlexCenter";

const { Option } = Select;
// const AutoCompleteOption = AutoComplete.Option;

const residences = [
  {
    value: "zhejiang",
    label: "Zhejiang",
    children: [
      {
        value: "hangzhou",
        label: "Hangzhou",
        children: [
          {
            value: "xihu",
            label: "West Lake",
          },
        ],
      },
    ],
  },
  {
    value: "jiangsu",
    label: "Jiangsu",
    children: [
      {
        value: "nanjing",
        label: "Nanjing",
        children: [
          {
            value: "zhonghuamen",
            label: "Zhong Hua Men",
          },
        ],
      },
    ],
  },
];

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
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const AddForm: FunctionComponent<any> = () => {
  const [form] = Form.useForm();
  const [picture, setPicture] = useState<any>([])

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );

  const onDrop = (picture: any) => {
    console.log('picture', picture)
    setPicture(picture)
  }

  const [autoCompleteResult, setAutoCompleteResult] = useState<any[]>([]);

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={{
        residence: ["zhejiang", "hangzhou", "xihu"],
        prefix: "86",
      }}
      scrollToFirstError
    >
      <Form.Item
        name="productName"
        label="상품이름"
        rules={[
          {
            required: true,
            message: "Please input product name!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="productType"
        label="상품타입"
        hasFeedback
        rules={[{ required: true, message: '상품타입을 입력해주세요!' }]}
      >
        <Select placeholder="상품타입">
          <Option value="china">China</Option>
          <Option value="usa">U.S.A</Option>
          <Option value="usa2">U.S.A1</Option>
          <Option value="usa1">U.S.A2</Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="productImage"
        label={"상품이미지"}
        // rules={[
        //   {
        //     required: false,
        //     message: "Please 업로드 상품 이미지",
        //     whitespace: true,
        //   },
        // ]}
      >
        {picture.length > 0 ? (
          <FlexCenter>
            <span>{picture[0].name}</span>
            <Button type="primary" onClick={() => { onDrop([]) }} icon={<CloseOutlined />} size={'small'} />
          </FlexCenter>
        ) : (
          <ImageUploader
            withIcon={true}
            buttonText='Choose images'
            onChange={onDrop}
            imgExtension={['.jpg', '.gif', '.png', '.gif']}
            maxFileSize={5242880}
          />
        )}
      </Form.Item>
      <Form.Item
        name="planMoney"
        label="목표금액 (원)"
        rules={[
          {
            required: true,
            message: "공동구매 목표금액을 입력하세요!",
          },
        ]}
      >
        <Input type='number' />
      </Form.Item>
      <Form.Item
        name="minMoney"
        label="최소 판매 단위"
        rules={[
          {
            required: true,
            message: "최소 판매 단위를 입력하세요!",
          },
        ]}
      >
        <Input placeholder="2000개 1묶음" />
      </Form.Item>
      <Form.Item
        name="minMoney"
        label="단위당 금액 (원)"
        rules={[
          {
            required: true,
            message: "단위당 금액을 입력하세요!",
          },
        ]}
      >
        <Input type='number' />
      </Form.Item>
      
      <Form.Item name={'detail'} label="상품에 대한 설명"
        rules={[
          {
            required: true
          }
        ]}>
        <Input.TextArea />
      </Form.Item>

      <Form.Item {...{ wrapperCol: { span: 24 }}}>
        <Button style={{ width: '100%' }} type="primary" htmlType="submit">
          추가
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddForm;
