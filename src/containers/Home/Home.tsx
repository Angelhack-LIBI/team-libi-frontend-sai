import React, { FunctionComponent, useMemo, useEffect, useState, useCallback, CSSProperties } from "react";
import { Layout, Row, Col, Grid, Spin, Button, Dropdown, Menu } from "antd";
import ItemCard from "components/ItemCard";
// import WaypointListContainer from "components/WaypointListContainer";
import InfiniteScroll from 'react-infinite-scroll-component';
import DefaultLayout from "components/DefaultLayout";
import { PlusOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import axiosInstance from "api/AxiosInstance";
import apiMeta from "api/meta";
import queryString from 'query-string'
import searchState from "state/search";
import { useRecoilValue } from "recoil";
import { propsToStyle } from "utils";
import styled from "styled-components";
import accountState from "state/account";

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

const size = 24

const MenuDom: FunctionComponent<any> = () => {
  const history = useHistory()

  return <Menu style={{ border: '1px solid #eeeeee' }}>
    <Menu.Item onClick={() => history.push('/add/1')}>
      공동구매 상품등록
    </Menu.Item>
    <Menu.Item onClick={() => history.push('/add/2')}>
      재고판매 상품등록
    </Menu.Item>
  </Menu>
};

interface Props {
  style?: CSSProperties
}

const InfinityScrollWrapper: any = styled.div`
  display: -webkit-flex;
  display: flex;
  -webkit-align-items: center;
  align-items: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-flex-direction: row;
  -moz-flex-direction: row;
  -ms-flex-direction: row;
  -o-flex-direction: row;
  flex-direction: row;

  & > div {
    width: 100%;
  }
  
  ${(props: Props) => propsToStyle(props.style || {})}
`


const Home: FunctionComponent<ICardViewProps> = (props) => {
  const [savedKeyword, setSavedKeyword] = useState<string>('')
  const account = useRecoilValue(accountState);
  const [items, setItems] = useState<Card[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isLast, setIsLast] = useState<boolean>(false)
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
        size,
        last_id: lastId,
        keyword: savedKeyword
      }
      
      const sharingList = await axiosInstance.get(`/sharing/?${queryString.stringify(query)}`)
      console.log('sharingList', sharingList)
      const { data } = sharingList
      
      if (data.length < size) {
        setIsLast(true)
      } 

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
      <InfinityScrollWrapper style={{ maxWidth: "1080px", width: '100%' }}>
        <InfiniteScroll
          scrollableTarget={"list"}
          dataLength={items.length} //This is important field to render the next data
          next={onLoad}
          hasMore={!isLast}
          loader={<Spin />}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>모든 정보를 조회했습니다.</b>
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
      </InfinityScrollWrapper>
      {account?.id && <div style={{ position: "fixed", bottom: "20px", right: "20px" }}>
        <Dropdown overlay={<MenuDom />} trigger={['click']} placement="topRight" arrow>
          <Button
            type="primary"
            shape="circle"
            size={"large"}
            icon={<PlusOutlined />}
          />
        </Dropdown>
      </div>}
    </DefaultLayout>
  );
};


export default Home;
