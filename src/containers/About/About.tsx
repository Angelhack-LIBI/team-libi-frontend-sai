import DefaultLayout from "components/DefaultLayout";
import styled from "styled-components";
import { propsToStyle, formatNumber } from "utils";
import FlexCenter from "components/FlexCenter";
import { Button, Modal } from "antd";
import React, { useState, useCallback, FunctionComponent, useEffect } from "react";
import ApplyModal from "components/ApplyModal/ApplyModal";
import { useParams } from "react-router-dom";
import axiosInstance from "api/AxiosInstance";
import categoryState, { CategoryType } from "state/category";
import { useRecoilValue } from "recoil";
import { title } from "process";
import { meta } from "api";
import locationState from "state/location";

interface IAboutProps {
  // title: string;
  // image: string;
  // data: any;
}

interface Props {
  style?: any
  image?: string
}

const { baseURL } = meta

const AboutComponent: any = styled.div`
  display: -webkit-flex;
  display: flex;
  -webkit-align-items: center;
  align-items: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-flex-direction: column;
  -moz-flex-direction: column;
  -ms-flex-direction: column;
  -o-flex-direction: column;
  flex-direction: column;

  width: 400px;
  
  & .about-img {
    position: relative;
    width: 100%;
    max-width: 400px;
    height: 200px;
    /* height: 400px; */

    &:after {
      content: "";
      display: block;
      padding-bottom: 100%; /* The padding depends on the width, not on the height, so with a padding-bottom of 100% you will get a square */
    }

    & img {
      position: absolute; /* Take your picture out of the flow */
      top: 0;
      bottom: 0;
      left: 0;
      right: 0; /* Make the picture taking the size of it's parent */
      width: 100%; /* This if for the object-fit */
      height: 100%; /* This if for the object-fit */
      object-fit: cover; /* Equivalent of the background-size: cover; of a background-image */
      object-position: center;
    }
  }
  ${(props: Props) => propsToStyle(props.style || {})}
`;

const ImageDom: any = styled.div`
  width: 400px;
  height: 300px;
  border-radius: 10px;
  background-image: url('${(props: Props) => props.image || ''}');
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  border: 1px solid #eee;
  /* background-position: 10% 100px; */

  ${(props: Props) => propsToStyle(props.style || {})}
`;

const tagStyle: any = {
  groupbuying: { backgroundColor: '#cc3333', color: 'white' },
  stackdiscount: { backgroundColor: '#339999', color: 'white' }
}

const Tag: any = styled.div`
  background: #eee;
  border-radius: 2px;
  padding: 0px 4px;
  ${(props: Props) => propsToStyle(props.style || {})}
`;

const showContact = (data: any) => {
  Modal.info({
    title: '판매자 연락처',
    content: (
      <div>
        {`${data?.name ? data?.name + " / " : ''}${data?.phone || '010-0000-0000'}`}
      </div>
    ),
    onOk() {},
  });
}

const About: FunctionComponent<IAboutProps> = (props) => {
  // const {
  //   image,
  //   title,
  //   data = {}
  // } = props;

  const { productId } = useParams();

  const [data, setData] = useState<any>({})

  const category = useRecoilValue<CategoryType[]>(categoryState);
  const location = useRecoilValue<any>(locationState)

  const openContact = useCallback(
    async () => {
      const { data } = await axiosInstance.get(`/sharing/${productId}/contact`)
      showContact(data)
    },
    [productId],
  )

  useEffect(() => {
    axiosInstance.get(`/sharing/${productId}`)
      .then(({ data }) => {
        console.log('data', data)
        setData(data)
      })
    
  }, [productId])

  const { title, sharing_type = 1, description, category_id, photo_urls = ["https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"], achievement } = data

  const type = sharing_type === 1 ? 'groupbuying' : 'stackdiscount'

  const isgroupbuying = type === 'groupbuying'
  
  const assignTagStyle = tagStyle[type]

  const [applyModalVisible, setApplyModalVisible] = useState<boolean>(false)

  return (
    <DefaultLayout>
      <AboutComponent>
        <ImageDom image={baseURL + photo_urls[0]} />
        <FlexCenter style={{ width: '100%', padding: '10px' }}>
          <div style={{ flexFlow: 'column', fontWeight: 'bold', fontSize: '18px' }}>
            {title || '고급형 냉장고'}
            <div style={{ color: '#999999', fontSize: '14px' }}>
              {category.find(v => v.id === category_id)?.title}
              {location?.name && ` - ${location?.name}`}
            </div>
          </div>
          <Tag style={{ marginLeft: 'auto', ...assignTagStyle }}>
            {isgroupbuying ? '공동구매' : '재고할인'}
          </Tag>
        </FlexCenter>
        <FlexCenter style={{ width: '100%', padding: isgroupbuying ? '10px 10px 0px 10px' : '10px', justifyContent: 'flex-start' }}>
          <span style={{ fontSize: "14px", fontWeight: "bold", color: assignTagStyle.backgroundColor }}>
            {`${Number(data?.goal_price || 0)}원`}
          </span>
          <span style={{ fontSize: '14px', marginLeft: '5px' }}>
            {data?.lessSellUnit ? `/ ${data?.lessSellUnit}` : ''}
          </span>
        </FlexCenter>
        { isgroupbuying && <FlexCenter style={{ width: '100%', padding: '0px 10px 10px 10px', justifyContent: 'flex-start' }}>
            <span style={{ fontSize: "14px", fontWeight: "bold", color: assignTagStyle.backgroundColor }}>
              {`현재 달성률 ${formatNumber(data?.achivement || 0)}%`}
            </span>
            <span style={{ fontSize: '14px', marginLeft: '5px' }}>
              {`/ 목표금액 ${formatNumber(Number(data?.goal_price || 0))}원`}
            </span>
          </FlexCenter>
        }
        <FlexCenter style={{ width: '100%', padding: '10px', justifyContent: 'flex-start', borderTop: '1px solid #eee' }}>
          {description}
        </FlexCenter>
        <FlexCenter style={{ width: '100%', padding: '10px' }}>
          <Button style={{ width: 'auto', backgroundColor: assignTagStyle.backgroundColor, borderColor: assignTagStyle.backgroundColor }} type="primary" htmlType="submit" onClick={
            () => isgroupbuying ? setApplyModalVisible(true) : openContact()
          }>
            {isgroupbuying ? '공동구매 참여하기' : '연락하기'}
          </Button>
        </FlexCenter>
      </AboutComponent>
      <ApplyModal visible={applyModalVisible} data={data} handleCancel={() => setApplyModalVisible(false)} />
    </DefaultLayout>
  );
};

export default About;
