import React, { FunctionComponent } from "react";

import { Card } from "antd";

const { Meta } = Card;

interface IItemCardProps {}

const ItemCard: FunctionComponent<IItemCardProps> = (props) => {
  return (
    <Card
      hoverable
      // style={{ width: 240 }}
      style={{ margin: 0 }}
      cover={
        <img
          alt="example"
          src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        />
      }
    >
      <Meta title="Europe Street beat" description="www.instagram.com" />
    </Card>
  );
};

export default ItemCard;
