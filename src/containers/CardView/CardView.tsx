import React, { FunctionComponent, useMemo, useEffect, useState, useCallback } from "react";
import { Layout, Row, Col, Grid, Spin } from "antd";
import ItemCard from "components/ItemCard";
import WaypointListContainer from "components/WaypointListContainer";

interface ICardViewProps {}

const breakPoint = {
  xs: 24,
  sm: 12,
  md: 8,
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
        let s = items.length + 1;
        for (let i = 0, l = 12; i < l; i++) {
          newItems.push(Math.random() * 100);
        }
        setItems(items.concat(newItems));
        resolve();
      };
      new Promise((resolve, reject) => {
        setTimeout(() => {
          actuallyLoadMore(resolve);
          setLoading(false);
        }, 1000);
      });
    }
  }, [items, setItems, loading, setLoading]);

  console.log('loading', loading)
  console.log('items.length', items.length)

  return (
    <div style={{  }}>
      {/* {screenKeys.reduce((prev: any, next: string, index: number) => {
        screenKeys.length
        return prev
      }, {})} */}
      <WaypointListContainer
        onLoad={onLoad}
        isLastPage={false}
        isLoading={loading}
        loadingComponent={<Spin />}
        isActive={true}
      >
        {/* <Row gutter={[8, 8]} style={{ margin: 0 }}>
          {items.map((v: any, i: number) => (
            <Col key={i} {...breakPoint}>
              <ItemCard />
            </Col>
          ))}
        </Row> */}
      </WaypointListContainer>
      {/* <Row gutter={[8, 8]} style={{ margin: 0 }}>
        <Col { ...breakPoint }>
          <ItemCard />
        </Col>
        <Col { ...breakPoint }>
          <ItemCard />
        </Col>
        <Col { ...breakPoint }>
          <ItemCard />
        </Col>
        <Col { ...breakPoint }>
          <ItemCard />
        </Col>
        <Col { ...breakPoint }>
          <ItemCard />
        </Col>
        <Col { ...breakPoint }>
          <ItemCard />
        </Col>
        <Col { ...breakPoint }>
          <ItemCard />
        </Col>
        <Col { ...breakPoint }>
          <ItemCard />
        </Col>
        <Col { ...breakPoint }>
          <ItemCard />
        </Col>
        <Col { ...breakPoint }>
          <ItemCard />
        </Col>
        <Col { ...breakPoint }>
          <ItemCard />
        </Col>
        <Col { ...breakPoint }>
          <ItemCard />
        </Col>
        <Col { ...breakPoint }>
          <ItemCard />
        </Col>
        <Col { ...breakPoint }>
          <ItemCard />
        </Col>
        <Col { ...breakPoint }>
          <ItemCard />
        </Col>
        <Col { ...breakPoint }>
          <ItemCard />
        </Col>
        <Col { ...breakPoint }>
          <ItemCard />
        </Col>
        <Col { ...breakPoint }>
          <ItemCard />
        </Col>
        <Col { ...breakPoint }>
          <ItemCard />
        </Col>
        <Col { ...breakPoint }>
          <ItemCard />
        </Col>
        <Col { ...breakPoint }>
          <ItemCard />
        </Col>
        <Col { ...breakPoint }>
          <ItemCard />
        </Col>
        <Col { ...breakPoint }>
          <ItemCard />
        </Col>
        <Col { ...breakPoint }>
          <ItemCard />
        </Col>
        <Col { ...breakPoint }>
          <ItemCard />
        </Col>
        <Col { ...breakPoint }>
          <ItemCard />
        </Col>
        <Col { ...breakPoint }>
          <ItemCard />
        </Col>
        <Col { ...breakPoint }>
          <ItemCard />
        </Col>
        <Col { ...breakPoint }>
          <ItemCard />
        </Col>
        <Col { ...breakPoint }>
          <ItemCard />
        </Col>
        <Col { ...breakPoint }>
          <ItemCard />
        </Col>
        <Col { ...breakPoint }>
          <ItemCard />
        </Col>
        <Col { ...breakPoint }>
          <ItemCard />
        </Col>
        <Col { ...breakPoint }>
          <ItemCard />
        </Col>
        <Col { ...breakPoint }>
          <ItemCard />
        </Col>
        <Col { ...breakPoint }>
          <ItemCard />
        </Col>
        <Col { ...breakPoint }>
          <ItemCard />
        </Col>
        <Col { ...breakPoint }>
          <ItemCard />
        </Col>
        <Col { ...breakPoint }>
          <ItemCard />
        </Col>
        <Col { ...breakPoint }>
          <ItemCard />
        </Col>
        <Col { ...breakPoint }>
          <ItemCard />
        </Col>
        <Col { ...breakPoint }>
          <ItemCard />
        </Col>
        <Col { ...breakPoint }>
          <ItemCard />
        </Col>
        <Col { ...breakPoint }>
          <ItemCard />
        </Col>
        <Col { ...breakPoint }>
          <ItemCard />
        </Col>
        <Col { ...breakPoint }>
          <ItemCard />
        </Col>
        <Col { ...breakPoint }>
          <ItemCard />
        </Col>
        <Col { ...breakPoint }>
          <ItemCard />
        </Col>
      </Row> */}
    </div>
  );
};

export default CardView;
