import React, { FunctionComponent, useMemo } from "react";

import { Layout, Menu, Breadcrumb, Select } from "antd";

import { useIntl } from "react-intl";

import { messages } from '../../index';

import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

interface IDefaultLayoutProps {}

const defaultStyle = {
  height: "100%",
};

const { Option } = Select;

const LaugnageSelector: FunctionComponent<any> = () => {
  const { formatMessage: fm } = useIntl();
  const { dom, defaultLanguage } = useMemo<any>(() => {
    const languages: string[] = Object.keys(messages)
    const defaultLanguage: string = languages?.[0] || ''
    return {
      dom: languages.map((lang: any) => <Option value={lang}>{fm({ id: lang })}</Option>),
      defaultLanguage
    }
  }, [])

  return <Select
  defaultValue={defaultLanguage}
  style={{ width: 120 }}
  // onChange={handleChange}
    >
      {dom}
    </Select>;
};

const DefaultLayout: FunctionComponent<IDefaultLayoutProps> = (props) => {
  const { children } = props;
  const { formatMessage: fm } = useIntl();

  return (
    <Layout style={defaultStyle}>
      <Header className="header" style={{ display: "flex" }}>
        <div className="logo" style={{ color: "white" }}>
          {fm({ id: "title" })}
        </div>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1">
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/about">About</Link>
          </Menu.Item>

          <Menu.Item key="3" disabled style={{ opacity: 1 }}>
            <LaugnageSelector />
          </Menu.Item>
        </Menu>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%", borderRight: 0 }}
          >
            <SubMenu key="sub1" icon={<UserOutlined />} title="subnav 1">
              <Menu.Item key="1">option1</Menu.Item>
              <Menu.Item key="2">option2</Menu.Item>
              <Menu.Item key="3">option3</Menu.Item>
              <Menu.Item key="4">option4</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<LaptopOutlined />} title="subnav 2">
              <Menu.Item key="5">option5</Menu.Item>
              <Menu.Item key="6">option6</Menu.Item>
              <Menu.Item key="7">option7</Menu.Item>
              <Menu.Item key="8">option8</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub3"
              icon={<NotificationOutlined />}
              title="subnav 3"
            >
              <Menu.Item key="9">option9</Menu.Item>
              <Menu.Item key="10">option10</Menu.Item>
              <Menu.Item key="11">option11</Menu.Item>
              <Menu.Item key="12">option12</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
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
