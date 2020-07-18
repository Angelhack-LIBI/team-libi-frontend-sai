import React, { FunctionComponent, CSSProperties } from "react";

import { Card } from "antd";
import FlexCenter from "components/FlexCenter";
import styled from "styled-components";
import { propsToStyle, formatNumber } from "utils";

const { Meta } = Card;

interface IItemCardProps {
  title: string;
  image: string;
  data: any;
}

interface Props {
  style?: CSSProperties;
}

const CardWrapper: any = styled.div`
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

const ItemCard: FunctionComponent<IItemCardProps> = ({
  image,
  title,
  data,
}) => {
  const { type = 'groupbuying' } = data
  return (
    <CardWrapper>
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
        <Meta style={{ padding: 16 }} title={title || "Europe Street beat"} />
        <FlexCenter style={{ backgroundColor: "#999", padding: 8 }}>
          {Object.keys(data).includes("hopeMondey") ? (
            <FlexCenter style={{ flex: "1", flexFlow: "column" }}>
              <span>희망 금액</span>
              <span style={{ fontSize: "14px", fontWeight: "bold" }}>
                {formatNumber(data?.hopeMoney)} 원
              </span>
            </FlexCenter>
          ) : (
            <>
              <FlexCenter style={{ flex: "1", flexFlow: "column" }}>
                <span>최소 주문금액</span>
                <span style={{ fontSize: "14px", fontWeight: "bold" }}>
                  <span>{`${formatNumber(data?.minMoney)}`}</span>
                </span>
              </FlexCenter>
              <div
                style={{
                  width: "1px",
                  height: "30px",
                  backgroundColor: "#666",
                }}
              />
              <FlexCenter style={{ flex: "1", flexFlow: "column" }}>
                <span>목표달성률</span>
                <span>{`${data?.percent} %`}</span>
              </FlexCenter>
            </>
          )}
        </FlexCenter>
      </Card>
    </CardWrapper>
  );
};

export default ItemCard;
