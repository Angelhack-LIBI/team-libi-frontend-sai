import React, { FunctionComponent, useMemo, useEffect, useState, useCallback } from "react";
import { Layout, Row, Col, Grid, Spin, Button, Dropdown, Menu } from "antd";
import ItemCard from "components/ItemCard";
// import WaypointListContainer from "components/WaypointListContainer";
import InfiniteScroll from 'react-infinite-scroll-component';
import FlexCenter from "components/FlexCenter";
import DefaultLayout from "components/DefaultLayout";
import { PlusOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";


interface ICardViewProps {}

const breakPoint = {
  xs: 12,
  sm: 12,
  md: 12,
  lg: 6,
  xl: 6,
};

const MenuDom: FunctionComponent<any> = () => {
  const history = useHistory()

  return <Menu>
    <Menu.Item onClick={() => history.push('/add/groupbuying')}>
      공동구매 상품 추가
    </Menu.Item>
    <Menu.Item onClick={() => history.push('/add/stackdiscount')}>
      재고판매 상품 추가
    </Menu.Item>
  </Menu>
};

const Home: FunctionComponent<ICardViewProps> = (props) => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);


  useEffect(() => {
    onLoad();
  }, []);

  const onLoad = useCallback(() => {
    if (!loading) {
      console.log('on load')
      setLoading(true);
      const actuallyLoadMore = (resolve: Function) => {
        // fake new data
        let newItems: any[] = [];
        for (let i = 0, l = 24; i < l; i++) {
          newItems.push(Math.random() * 100);
        }
        setItems(items.concat(newItems));
        resolve();
      };
      new Promise((resolve, reject) => {
        setTimeout(() => {
          actuallyLoadMore(resolve);
          setLoading(false);
        }, 500);
      });
    }
  }, [items, setItems, loading, setLoading]);

  return (
    <DefaultLayout haveSearch={true}>
      <FlexCenter style={{ maxWidth: "1080px" }}>
        <InfiniteScroll
          scrollableTarget={"list"}
          dataLength={items.length} //This is important field to render the next data
          next={onLoad}
          hasMore={true}
          loader={<Spin />}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <Row gutter={[16, 16]} style={{ margin: 0 }}>
            {items.map((v: any, i: number) => (
              <Col key={i} {...breakPoint}>
                <ItemCard
                  title={"test"}
                  image={
                    "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                  }
                  data={{
                    minMoney: 40000,
                    percent: 40,
                  }}
                />
              </Col>
            ))}
          </Row>
        </InfiniteScroll>
      </FlexCenter>
      <div style={{ position: "fixed", bottom: "20px", right: "20px" }}>
        <Dropdown overlay={<MenuDom />} placement="topRight" arrow>
          <Button
            type="primary"
            shape="circle"
            size={"large"}
            icon={<PlusOutlined />}
          />
        </Dropdown>
        {/* {onClick={() => history.push('/add/')}} */}
      </div>
    </DefaultLayout>
  );
};


export default Home;
