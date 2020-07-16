import React, { FunctionComponent, useEffect, useMemo, ChangeEvent, useCallback } from "react";
import { Layout, Menu, Breadcrumb, Input, Button } from "antd";
import { useIntl } from "react-intl";
import { routerMeta } from 'meta';

import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
  SearchOutlined,
  RadarChartOutlined
} from "@ant-design/icons";
import { useLocation, useHistory } from "react-router-dom";
import LanguageSelector from "components/LanguageSelector";
import { assignRouteProps, propsToStyle, range } from "utils";

import LibiLogo from 'images/libi-logo.png';
import ImageLogo from "components/ImageLogo";
import styled, { CSSProperties } from "styled-components";
import FlexCenter from "components/FlexCenter";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

interface IDefaultLayoutProps {}

const defaultStyle = {
  height: "100%",
};

const menuStyle = {
  display: 'flex',
  background: 'none',
  border: 'none',
  marginLeft: 'auto'
}

const defaultMenus = Object.keys(routerMeta).reduce((prev: any[], componentKey: string) => {
  const { path } = assignRouteProps(routerMeta[componentKey])
  console.log('path', path)
  const slashLength: number = (path.match(/\//gi) || []).length
  if (slashLength === 1 && path !== '/') {
    return [ ...prev, { componentKey, path } ]
  } else {
    return prev
  }
}, [])

interface HeaderWrapperProps {
  style?: CSSProperties
}

const HeaderWrapper: any = styled.div`
  display: -webkit-flex;
  display: flex;
  height: 64px;
  width: 100%;
  ${(props: HeaderWrapperProps) => propsToStyle(props.style || {})}
`

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
`

const { Search } = Input;

const MockButtons: any = ({ index }: any) => <MockButtonsWrapper><Button shape='circle' style={{
  width: 'auto',
  display: 'flex',
  height: 'auto',
  alignItems: 'center',
  flexFlow: 'column'
}} type='link' icon={
  <RadarChartOutlined style={{}} />
}>
  <span style={{ margin: 0 }}>
    목업 {index}
  </span>
</Button></MockButtonsWrapper>

const DefaultLayout: FunctionComponent<IDefaultLayoutProps> = (props) => {
  const { children } = props;
  const { formatMessage: fm } = useIntl();
  const { pathname }  = useLocation();
  const history = useHistory();

  const pathDom = useMemo(() => {
    const pathArray = pathname.split('/')
    const emptyToSpace = (text: string) => text === '' ? ' ' : text
    return pathArray.map(path => <Breadcrumb.Item key={path}>{emptyToSpace(path)}</Breadcrumb.Item>)
  }, [pathname])

  const handleRouteClick = useCallback(({key}: any) => {
    history.push(key)
  }, [history]);

  return (
    <Layout style={defaultStyle}>
      <Header
        className="header"
        style={{
          display: "flex",
          flexFlow: 'column',
          backgroundColor: '#f0f2f5',
          padding: 0,
          height: 350
        }}
      >
        <FlexCenter style={{
          backgroundColor: "#c88719",
          display: "flex",
          flexFlow: 'column',
          padding: '0 50px',
          height: 300
        }}>
          <HeaderWrapper>
            <ImageLogo
              onClick={() => handleRouteClick({ key: '/' })}
              className="logo"
              image={LibiLogo}
              style={{ width: 78, margin: "8px 8px" }}
            />
            <Menu
              theme={"dark"}
              mode="horizontal"
              style={menuStyle}
              selectedKeys={[pathname]}
              onClick={handleRouteClick}
            >
              {defaultMenus.map(({ componentKey, path }) => (
                <Menu.Item key={path}>{componentKey}</Menu.Item>
              ))}

              <Menu.Item key="language-selector" disabled style={{ opacity: 1 }}>
                <LanguageSelector />
              </Menu.Item>

              <Menu.Item key="sign-up" disabled style={{ opacity: 1 }}>
                <Button type="primary" size={'middle'}>
                  {fm({ id: 'sign_up' })}
                </Button>
              </Menu.Item>
            </Menu>
          </HeaderWrapper>
          <FlexCenter style={{
            flex: '1',
            flexFlow: 'column',
            lineHeight: 'initial',
            marginBottom: '20px'
          }}>
            <FlexCenter style={{
              color: 'white',
              fontSize: '20px',
              fontWeight: 'bold',
              marginBottom: '16px',
              textAlign: 'center'
            }}>
              생각하시는 것보다 더 저렴하게
              <br />자원을 구하실 수 있습니다.
            </FlexCenter>
            <Search
              style={{ maxWidth: 330 }}
              placeholder="시멘트 20톤"
              enterButton={<SearchOutlined />}
              size="large"
              onSearch={(value: string) => console.log(value)}
            />
          </FlexCenter>
        </FlexCenter>
        <FlexCenter style={{ position: 'relative', top: '-40px', lineHeight: 'inherit' }}>
          <FlexCenter style={{ backgroundColor: '#f0f2f5', padding: '20px 40px', borderRadius: '20px 20px 0px' }}>
            {range(0, 10).map(v => {
              return <MockButtons key={v} index={v} />
            })}
          </FlexCenter>
        </FlexCenter>
      </Header>
      <Layout>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>{pathDom}</Breadcrumb>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default DefaultLayout;
