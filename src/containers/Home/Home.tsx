import React, { FunctionComponent, useMemo, useEffect, useState, useCallback } from "react";
import { Layout, Row, Col, Grid, Spin, Button, Dropdown, Menu } from "antd";
import ItemCard from "components/ItemCard";
// import WaypointListContainer from "components/WaypointListContainer";
import InfiniteScroll from 'react-infinite-scroll-component';
import FlexCenter from "components/FlexCenter";
import DefaultLayout from "components/DefaultLayout";
import { PlusOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import axiosInstance from "api/AxiosInstance";
import apiMeta from "api/meta";
import queryString from 'query-string'
import searchState from "state/search";
import { useRecoilValue } from "recoil";

interface ICardViewProps {}

const { baseURL } = apiMeta

const breakPoint = {
  xs: 12,
  sm: 12,
  md: 12,
  lg: 6,
  xl: 6,
};

interface Card {
  id: number,
  title: string,
  sharing_type: number,
  thumbnail_url: string,
  attributes: any[]
}

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
  const [savedKeyword, setSavedKeyword] = useState<string>('')
  const [items, setItems] = useState<Card[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  // const [isSearch, setIsSearch] = useState<boolean>(false);
  const search = useRecoilValue(searchState)

  useEffect(() => {
    onLoad(search, true);
  }, [savedKeyword]);

  useEffect(() => {
    if (savedKeyword && search.length === 0) {
      setSavedKeyword('')
    }
  }, [search])

  const onLoad = useCallback(async (keyword: string = '', reset: boolean = false) => {
    if (!loading) {
      console.log('on load')
      setLoading(true);

      const { length } = items

      const lastId = reset ? 0 : items?.[length - 1]?.id || 0
      console.log('lastId', lastId)

      const query = {
        area_id: 1,
        size: 24,
        last_id: lastId,
        keyword: savedKeyword
      }
      
      const sharingList = await axiosInstance.get(`/sharing/?${queryString.stringify(query)}`)
      console.log('sharingList', sharingList)
      const { data } = sharingList
      
      if (reset) {
        setItems(data)
      } else {
        setItems(items.concat(data))
      }

      // console.log('getList', getList)
      setLoading(false);
      // const actuallyLoadMore = (resolve: Function) => {
      //   // fake new data
      //   let newItems: any[] = [];
      //   for (let i = 0, l = 24; i < l; i++) {
      //     newItems.push(Math.random() * 100);
      //   }
      //   setItems(items.concat(newItems));
      //   resolve();
      // };
      // new Promise((resolve, reject) => {
      //   setTimeout(() => {
      //     actuallyLoadMore(resolve);
      //     setLoading(false);
      //   }, 500);
      // });
    }
  }, [items, setItems, loading, setLoading, savedKeyword]);

  return (
    <DefaultLayout haveSearch={true} onSearch={(value: string) => {
      setSavedKeyword(value)
    }}>
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
            {items.map((card: Card) => {
              const { id, title, thumbnail_url, sharing_type, attributes = [] } = card;
              return (
                <Col key={id} {...breakPoint}>
                  <ItemCard
                    id={id}
                    title={title}
                    image={baseURL + thumbnail_url}
                    type={sharing_type}
                    data={attributes}
                  />
                </Col>
              );
            })}
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
