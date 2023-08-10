import React, { useState } from "react";
import {
  LogoutOutlined,
  TeamOutlined,
  BookOutlined,
  EditOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme, Typography, Button } from "antd";
import { MainDashboardContentView } from "./MainDashboardContentView";

const { Header, Content, Footer, Sider } = Layout;

const { Title } = Typography;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Employees", "sub1", <TeamOutlined />, [
    getItem("Manage Employees", "1", <EditOutlined />),
  ]),
  getItem("Skills", "sub2", <BookOutlined />, [
    getItem("Manage Skills", "2", <EditOutlined />),
  ]),
  getItem("Logout", "3", <LogoutOutlined />),
];

export const Dashboard: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu theme="dark" mode="inline" items={items} />
      </Sider>

      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <Title style={{ margin: "0 16px" }} level={3}>
            Welcome Name
          </Title>
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb
            style={{
              margin: "16px 8px",
              display: "flex",
              justifyContent: "end",
            }}
            items={[{ title: "User" }, { title: "Bill" }]}
          />
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            <MainDashboardContentView />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
