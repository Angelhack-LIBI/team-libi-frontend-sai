import React, { useState, FunctionComponent, CSSProperties, useCallback } from "react";
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
} from "antd";
import { QuestionCircleOutlined, CloseOutlined } from "@ant-design/icons";

import ImageUploader from 'react-images-upload';
import { propsToStyle } from "utils";
import styled from "styled-components";
import FlexCenter from "components/FlexCenter";
import { useParams, useHistory } from "react-router-dom";
import { useRecoilValue } from "recoil";
import categoryState, { CategoryType } from "state/category";
import axiosInstance from "api/AxiosInstance";

const { Option } = Select;
// const AutoCompleteOption = AutoComplete.Option;

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

interface AddProps {
  type?: 'groupbuying' | 'stackdiscount'
  style?: CSSProperties
}

const AddFormWrapper: any = styled.div`
  max-width: 700px;
  width: 100%;

  & .ant-input {
    /* -webkit-box-shadow: 0 0 0 2px rgba(204, 51, 51, 0.2);
    box-shadow: 0 0 0 2px rgba(204, 51, 51, 0.2); */
    -webkit-box-shadow: none;
    box-shadow: none;
  }

  & .ant-select {
    /* -webkit-box-shadow: 0 0 0 2px rgba(204, 51, 51, 0.2);
    box-shadow: 0 0 0 2px rgba(204, 51, 51, 0.2); */
    -webkit-box-shadow: none;
    box-shadow: none;
  }

  & .ant-input:hover, & .ant-input:focus, & .ant-input-focused {
    border-color: ${(props: AddProps) => (props?.type === 'groupbuying') ? '#cc3333' : '#339999'};
  }

  & .ant-form-item-has-error .ant-input, .ant-form-item-has-error .ant-input-affix-wrapper, .ant-form-item-has-error .ant-input:hover, .ant-form-item-has-error .ant-input-affix-wrapper:hover {
    border-color: ${(props: AddProps) => (props?.type === 'groupbuying') ? '#cc3333' : '#339999'};
  }

  & .ant-select:not(.ant-select-disabled):hover .ant-select-selector, & .ant-select:not(.ant-select-disabled):focus .ant-select-selector {
    border-color: ${(props: AddProps) => (props?.type === 'groupbuying') ? '#cc3333' : '#339999'};
  }

  & .ant-btn-primary {
    background-color: ${(props: AddProps) => (props?.type === 'groupbuying') ? '#cc3333' : '#339999'};
    border-color: ${(props: AddProps) => (props?.type === 'groupbuying') ? '#cc3333' : '#339999'};
  }

  ${(props: AddProps) => propsToStyle(props.style || {})}
`

const errorModal = (err: any) => {
  Modal.error({
    title: '등록 실패',
    content: err
  });
}

const AddForm: FunctionComponent<any> = () => {
  const { type: sharing_type = '1' } = useParams();
  const type = sharing_type === '1' ? 'groupbuying' : 'stackdiscount'

  const history = useHistory()



  const category = useRecoilValue<CategoryType[]>(categoryState);

  const [form] = Form.useForm();
  const [picture, setPicture] = useState<any>([])

  const onFinish = useCallback(async (values: any) => {
    const assignValue = { ...values, sharing_type }
    console.log("Received va lues of form: ", assignValue);
    const formData = new FormData();
    Object.keys(assignValue).map(key => {
      const value = assignValue[key]
      if (key === 'photo') {
        if (Array.isArray(value)) {
          value.forEach((photo: any, index: number) => {
            formData.append(`photo[${index}]`, photo)
          })
        } else {
          formData.append('photo[0]', value)
        }
      } else {
        formData.append(key, value)
      }
    })

    const { data: location } = await axiosInstance.get('/sharing/area/me')
    if (location) {
      formData.append('area_id', String(location?.id || 1))
    }

    axiosInstance.post('/sharing/', formData, {
      headers: {'Content-Type': 'multipart/form-data'}
    }).then((post: any) => {
      console.log('post', post)
      Modal.success({
        content: '등록이 완료되었습니다',
      });
      history.goBack()
    }).catch((err) => {
      console.log('err', err)
      errorModal(err)
    })
  }, [sharing_type]);

  const onDrop = (picture: any) => {
    setPicture(picture)
  }

  return (
    <AddFormWrapper type={type}>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
      >
        <Form.Item
          name="title"
          label="상품이름"
          rules={[
            {
              required: true,
              message: "상품이름을 입력해주세요",
            },
          ]}
        >
          <Input />
        </Form.Item>
        {/* <Form.Item
          name="area_id"
          label="지역코드"
          initialValue={1}
          rules={[
            {
              required: true,
              message: "지역코드를 입력해주세요",
            },
          ]}
        >
          <Input />
        </Form.Item> */}
        <Form.Item
          name="category_id"
          label="상품타입"
          hasFeedback
          rules={[{ required: true, message: '상품타입을 입력해주세요' }]}
        >
          <Select placeholder="상품타입">
            {category.map(({ id, title }) => <Option value={id}>{title}</Option>)}
          </Select>
        </Form.Item>
        <Form.Item
          name="photo"
          label={"상품이미지"}
        >
          {picture.length > 0 ? (
            <FlexCenter>
              <span>{picture[0].name}</span>
              <Button type="primary" onClick={() => { onDrop([]) }} icon={<CloseOutlined />} size={'small'} />
            </FlexCenter>
          ) : (
            <ImageUploader
              withIcon={true}
              buttonText='사진 선택'
              onChange={onDrop}
              imgExtension={['.jpg', '.gif', '.png', '.gif']}
              maxFileSize={5242880}
            />
          )}
        </Form.Item>
        { type === "groupbuying" && <Form.Item
          name="goal_price"
          label="목표금액 (원)"
          rules={[
            {
              required: true,
              message: "공동구매 목표금액을 입력하세요!",
            },
          ]}
        >
          <Input type='number' />
        </Form.Item> }
        <Form.Item
          name="option_description"
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
          name="option_price"
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
        
        <Form.Item name={'description'} label="상품에 대한 설명"
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
    </AddFormWrapper>
  );
};

export default AddForm;
