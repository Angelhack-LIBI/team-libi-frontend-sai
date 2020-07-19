import React, {
  FunctionComponent,
  useEffect,
  useMemo,
  ChangeEvent,
  useCallback,
} from "react";
import { Layout, Menu, Breadcrumb, Input, Button } from "antd";
import { useIntl } from "react-intl";
import { routerMeta } from "meta";

import {
  EnvironmentFilled,
  SearchOutlined,
  RadarChartOutlined,
} from "@ant-design/icons";
import { useLocation, useHistory } from "react-router-dom";
import LanguageSelector from "components/LanguageSelector";
import { assignRouteProps, propsToStyle, range } from "utils";

import Logo from "images/logo.png";
import ImageLogo from "components/ImageLogo";
import styled, { CSSProperties } from "styled-components";
import FlexCenter from "components/FlexCenter";
import LoginModalButton from "components/LoginModalButton";
import searchState from "state/search";
import { useRecoilState, useRecoilValue } from "recoil";
import locationState from "state/location";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

interface IDefaultLayoutProps {
  haveSearch?: boolean
  onSearch?: Function
}

const defaultStyle = {
  height: "100%",
  backgroundColor: "white",
};

const menuStyle = {
  display: "flex",
  background: "none",
  border: "none",
  marginLeft: "auto",
};

// const defaultMenus = Object.keys(routerMeta).reduce(
//   (prev: any[], componentKey: string) => {
//     const { path } = assignRouteProps(routerMeta[componentKey]);
//     console.log("path", path);
//     const slashLength: number = (path.match(/\//gi) || []).length;
//     if (slashLength === 1 && path !== "/") {
//       return [...prev, { componentKey, path }];
//     } else {
//       return prev;
//     }
//   },
//   []
// );

interface HeaderWrapperProps {
  style?: CSSProperties;
}

const HeaderWrapper: any = styled.div`
  display: -webkit-flex;
  display: flex;
  height: 64px;
  width: 100%;
  ${(props: HeaderWrapperProps) => propsToStyle(props.style || {})}
`;

const MockButtonsWrapper: any = styled.div`
  display: -webkit-flex;
  display: flex;
  padding-right: 4px;
  padding-left: 4px;

  & svg {
    width: 60px;
    height: 50px;
  }
  ${(props: HeaderWrapperProps) => propsToStyle(props.style || {})}
`;

const { Search } = Input;

const MockButtons: any = ({ index }: any) => (
  <MockButtonsWrapper>
    <Button
      shape="circle"
      style={{
        width: "auto",
        display: "flex",
        height: "auto",
        alignItems: "center",
        flexFlow: "column",
      }}
      type="link"
      icon={<RadarChartOutlined style={{}} />}
    >
      <span style={{ margin: 0 }}>목업 {index}</span>
    </Button>
  </MockButtonsWrapper>
);

const DefaultLayout: FunctionComponent<IDefaultLayoutProps> = (props) => {
  const { children, haveSearch, onSearch } = props;
  const { formatMessage: fm } = useIntl();
  const { pathname } = useLocation();
  const history = useHistory();
  
  const [search, setSearch] = useRecoilState(searchState);
  const location = useRecoilValue(locationState);

  // const pathDom = useMemo(() => {
  //   const pathArray = pathname.split("/");
  //   const emptyToSpace = (text: string) => (text === "" ? " " : text);
  //   return pathArray.map((path) => (
  //     <Breadcrumb.Item key={path}>{emptyToSpace(path)}</Breadcrumb.Item>
  //   ));
  // }, [pathname]);

  const handleRouteClick = useCallback(
    ({ key }: any) => {
      history.push(key);
    },
    [history]
  );

  return (
    <Layout style={defaultStyle}>
      <Header
        className="header"
        style={{
          // display: "flex",
          // flexFlow: "column",
          backgroundColor: "white",
          padding: 0,
          borderBottom: '1px solid #eee'
          // height: 300
        }}
      >
        {/* <HeaderWrapper> */}
          {/* <ImageLogo
            className={'logo'}
            onClick={() => handleRouteClick({ key: "/" })}
            image={Logo}
            style={{ width: 78, margin: "8px 8px" }}
          /> */}
          <div
            className="logo"
            onClick={() => handleRouteClick({ key: "/" })}
            style={{
              backgroundImage:`url(${Logo})`,
              width: 120,
              height: 31,
              margin: '16px 24px 16px 0',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'contain',
              cursor: 'pointer',
              float: 'left'
            }} />
          <Menu
            // theme={"dark"}
            mode="horizontal"
            style={menuStyle}
            selectedKeys={[pathname]}
            onClick={handleRouteClick}
          >
            {/* {defaultMenus.map(({ componentKey, path }) => (
              <Menu.Item key={path}>{componentKey}</Menu.Item>
            ))} */}

            {/* <Menu.Item key="language-selector" disabled style={{ opacity: 1 }}>
              <LanguageSelector />
            </Menu.Item> */}

            <Menu.Item key="sign-in" disabled style={{ opacity: 1, marginLeft: 'auto' }}>
              <LoginModalButton />
            </Menu.Item>
          </Menu>
        {/* </HeaderWrapper> */}
        {/* <FlexCenter style={{ position: 'relative', top: '-40px', lineHeight: 'inherit' }}>
          <FlexCenter style={{ backgroundColor: '#f0f2f5', padding: '20px 20px', borderRadius: '20px 20px 0px' }}>
            {range(0, 10).map(v => {
              return <MockButtons key={v} index={v} />
            })}
          </FlexCenter>
        </FlexCenter> */}
      </Header>
      <Layout
        id={"list"}
        style={{
          backgroundColor: "white",
          border: "1px solid #eeeee",
          overflow: "auto",
        }}
      >
        {haveSearch && <FlexCenter
          style={{
            flex: "1",
            flexFlow: "column",
            lineHeight: "initial",
            padding: '50px 20px'
          }}
        >
          <div
            style={{
              // color: 'white',
              fontSize: "35px",
              fontWeight: "bold",
              marginBottom: "20px",
              textAlign: "center"
            }}
          >
            당신의 가게에는
            <br />
            <span style={{ color: "#cc3333" }}>어떤 물건</span>이 필요한가요?
          </div>
          <Search
            style={{ maxWidth: 450 }}
            placeholder="나무젓가락"
            value={search}
            enterButton={<SearchOutlined />}
            size="large"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              console.log('value', e.target.value)
              setSearch(e.target.value)
            }}
            onSearch={(value: string) => {
              console.log('value', value)
              // setSearch(value)
              if (onSearch) {
                onSearch(value)
              }
            }}
          />
          {location && <FlexCenter style={{ marginTop: '20px', color: '#999', fontWeight: 'bold' }}>
            <EnvironmentFilled style={{ marginRight: '5px' }} />{`${location.name}`}
          </FlexCenter>}
          {/* </FlexCenter> */}
        </FlexCenter>}
        {/* <Layout style={{ padding: "0 24px 24px" }}> */}
        {/* <Breadcrumb style={{ margin: "16px 0" }}>{pathDom}</Breadcrumb> */}
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
            alignItems: "center",
            // overflow: 'auto',
            display: "flex",
            flexDirection: "column",
          }}
        >
          {children}
        </Content>
        {/* </Layout> */}
      </Layout>
    </Layout>
  );
};

export default DefaultLayout;
