import React, { FunctionComponent, CSSProperties } from "react";

import { Card } from "antd";
import FlexCenter from "components/FlexCenter";
import styled from "styled-components";
import { propsToStyle, formatNumber } from "utils";
import { useHistory } from "react-router-dom";
import { configConsumerProps } from "antd/lib/config-provider";

const { Meta } = Card;

interface IItemCardProps {
  id: number;
  title: string;
  image: string;
  type: number;
  data: DataType[];
}

interface Props {
  style?: CSSProperties;
}

const CardWrapper: any = styled.div`
  border: 1px solid #eee;

  & .ant-card-cover {
    position: relative;
    width: 100%;

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

const Tag: any = styled.div`
  top: 10px;
  right: 0px;
  position: absolute;
  background: #eee;
  border-radius: 2px 0px 0px 2px;
  padding: 0px 4px;
  ${(props: Props) => propsToStyle(props.style || {})}
`

const tagStyle: any = {
  groupbuying: { backgroundColor: '#cc3333', color: 'white' },
  stackdiscount: { backgroundColor: '#339999', color: 'white' }
}

interface DataType {
  title: string,
  content: string,
  is_focused: boolean
}

const ItemCard: FunctionComponent<IItemCardProps> = ({
  id,
  image,
  title,
  type: shareingType,
  data,
}: IItemCardProps) => {
  const type = shareingType === 1 ? 'groupbuying' : 'stackdiscount'
  // const { type = 'groupbuying', id = '1' } = data
  const history = useHistory()

  const attrDom: any[] = data.map(({ title, content, is_focused }) => {
    return <FlexCenter style={{ flex: "1", flexFlow: "column", padding: '4px', textAlign: 'center' }}>
      <span>{title}</span>
      <span style={{ fontSize: "14px", fontWeight: (is_focused ? "bold" : undefined) }}>
        {content}
      </span>
    </FlexCenter>
  })

  if (shareingType === 1) {
    attrDom.splice(
      1,
      0,
      <div
        style={{
          width: "1px",
          height: "30px",
          backgroundColor: "#666",
        }}
      />
    );
  }

  return (
    <CardWrapper onClick={() => history.push(`/about/${id}`)}>
      <Card
        hoverable
        // style={{ width: 240 }}
        style={{ margin: 0 }}
        bodyStyle={{ padding: 0 }}
        cover={
          <img
            alt="example"
            src={image || "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"}
          />
        }
      >
        <Tag style={tagStyle[type]}>
          {type === 'groupbuying' ? '공동구매' : '재고할인'}
        </Tag>
        <Meta style={{ padding: 16 }} title={<b>{title || "Europe Street beat"}</b>} />
        <FlexCenter style={{ backgroundColor: "#eee", padding: 8 }}>
          {attrDom}
          {/* {Object.keys(data).includes("hopeMondey") ? (
            <FlexCenter style={{ flex: "1", flexFlow: "column", padding: '4px' }}>
              <span>희망 금액</span>
              <span style={{ fontSize: "14px", fontWeight: "bold" }}>
                {`${formatNumber(data?.hopeMoney)} 원`}
              </span>
            </FlexCenter>
          ) : (
            <>
              <FlexCenter style={{ flex: "1", flexFlow: "column", padding: '4px' }}>
                <span>최소 주문금액</span>
                <span style={{ fontSize: "14px", fontWeight: "bold" }}>
                  <span>{`${formatNumber(data?.minMoney)} 원`}</span>
                </span>
              </FlexCenter>
              <div
                style={{
                  width: "1px",
                  height: "30px",
                  backgroundColor: "#666",
                }}
              />
              <FlexCenter style={{ flex: "1", flexFlow: "column", padding: '4px' }}>
                <span>목표달성률</span>
                <span>{`${data?.percent} %`}</span>
              </FlexCenter>
            </>
          )} */}
        </FlexCenter>
      </Card>
    </CardWrapper>
  );
};

export default ItemCard;
