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
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const { Header, Content, Footer, Sider } = Layout;

const { Title } = Typography;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  onClick?: () => void
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    onClick,
  } as MenuItem;
}

export const Dashboard: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const auth = useAuth();

  const handleLogout = () => {
    console.log("called");
    auth.setLoggedOut();
  };

  const items: MenuItem[] = [
    getItem("Employees", "sub1", <TeamOutlined />, [
      getItem(
        <Link to="/dashboard/manage-employees">Manage Employees</Link>,
        "1",
        <EditOutlined />
      ),
    ]),
    getItem("Skills", "sub2", <BookOutlined />, [
      getItem(
        <Link to="/dashboard/manage-skills">Manage Employees</Link>,
        "2",
        <EditOutlined />
      ),
    ]),
    getItem("Logout", "3", <LogoutOutlined />, undefined, handleLogout),
  ];

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
            Welcome {auth.user}
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
