import React, { FunctionComponent, useMemo, useEffect, useState, useCallback } from "react";
import { Layout, Row, Col, Grid, Spin } from "antd";
import ItemCard from "components/ItemCard";
// import WaypointListContainer from "components/WaypointListContainer";
import InfiniteScroll from 'react-infinite-scroll-component';
import FlexCenter from "components/FlexCenter";

interface ICardViewProps {}

const breakPoint = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 6,
  xl: 4,
};

const CardView: FunctionComponent<ICardViewProps> = (props) => {
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

  console.log('loading', loading)
  console.log('items.length', items.length)

  return (
    <FlexCenter style={{ maxWidth: '1440px' }}>
      <InfiniteScroll
        scrollableTarget={'list'}
        dataLength={items.length} //This is important field to render the next data
        next={onLoad}
        hasMore={true}
        loader={<Spin />}
        endMessage={
          <p style={{textAlign: 'center'}}>
            <b>Yay! You have seen it all</b>
          </p>
        }>
        <Row gutter={[16, 16]} style={{ margin: 0 }}>
          {items.map((v: any, i: number) => (
            <Col key={i} {...breakPoint}>
              <ItemCard title={'test'} image={'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'} data={{
                minMoney: 40000,
                percent: 40
              }} />
            </Col>
          ))}
        </Row>
      </InfiniteScroll>
    </FlexCenter>
  );
};

export default CardView;
