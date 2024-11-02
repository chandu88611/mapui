import React from "react";
import { Layout, Menu, Avatar, Dropdown, Badge } from "antd";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  AiOutlineDashboard,
  AiOutlineTeam,
  AiOutlineBell,
  AiOutlineLogout,
  AiOutlineSetting,
  AiOutlineUser,
  AiOutlineProject,
  AiOutlineFileText,
} from "react-icons/ai";
import { FiMenu } from "react-icons/fi";

const { Header, Sider, Content, Footer } = Layout;

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = React.useState(false);

  const userMenu = (
    <Menu>
      <Menu.Item key="1" icon={<AiOutlineSetting />} onClick={() => navigate("/admin/settings")}>
        Settings
      </Menu.Item>
      <Menu.Item key="2" icon={<AiOutlineLogout />} onClick={() => navigate("/login")}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        theme="dark"
        width={250}
        style={{
          background: "#fff",
          borderRight: "1px solid #f0f0f0",
          overflowY: "auto",
          height: "100vh",
          position: "fixed",
          transition: "all 0.2s ease-in-out",
        }}
        className="custom-sidebar"
      >
        <div className="logo" style={{ padding: "20px", textAlign: "center" }}>
          <img src="/assets/images/logo/logo.svg" alt="Logo" style={{ maxWidth: "100%", height: "auto" }} />
          
        </div>

        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          style={{ fontWeight: "bold" }}
        >
          {/* Admin Dashboard */}
          <Menu.Item key="/admin/dashboard" icon={<AiOutlineDashboard />} onClick={() => navigate("/admin/dashboard")}>
            Dashboard
          </Menu.Item>

          {/* User Management Section (CRM) */}
          <Menu.SubMenu key="crm" icon={<AiOutlineTeam />} title="User Management">
            <Menu.Item key="/admin/users" onClick={() => navigate("/admin/users")}>Users</Menu.Item>
            {/* <Menu.Item key="/admin/roles" onClick={() => navigate("/admin/roles")}>Roles</Menu.Item> */}
          </Menu.SubMenu>

          {/* Projects Section */}
          {/* <Menu.SubMenu key="projects" icon={<AiOutlineProject />} title="Projects">
            <Menu.Item key="/admin/project-overview" onClick={() => navigate("/admin/project-overview")}>Project Overview</Menu.Item>
          </Menu.SubMenu> */}

          {/* Real-Time Data Section */}
          <Menu.Item key="/admin/real-time-data" icon={<AiOutlineFileText />} onClick={() => navigate("/admin/real-time-data")}>
            Real-Time Weather Data
          </Menu.Item>

          {/* Settings */}
          {/* <Menu.Item key="/admin/settings" icon={<AiOutlineSetting />} onClick={() => navigate("/admin/settings")}>
            Settings
          </Menu.Item> */}
        </Menu>
      </Sider>

      <Layout className="site-layout" style={{ marginLeft: collapsed ? 80 : 250 }}>
        <Header
          className="site-layout-background"
          style={{
            padding: "0 20px",
            background: "#fff",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #f0f0f0",
          }}
        >
          <div>
            <FiMenu
              className="menu-trigger"
              onClick={() => setCollapsed(!collapsed)}
              style={{ fontSize: "24px", cursor: "pointer" }}
            />
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Badge count={5} style={{ marginRight: 24 }}>
              <AiOutlineBell style={{ fontSize: "24px", cursor: "pointer" }} />
            </Badge>
            <Dropdown overlay={userMenu}>
              <div style={{ cursor: "pointer", display: "flex", alignItems: "center" }}>
                <Avatar
                  src="/assets/images/profile-avatar.jpg"
                  alt="Profile Avatar"
                  size="large"
                />
                <span style={{ marginLeft: 8 }}>Admin User</span>
              </div>
            </Dropdown>
          </div>
        </Header>

        <Content style={{ margin: "24px 16px", padding: 24, background: "#fff", minHeight: "280px" }}>
          <Outlet />
        </Content>

        <Footer style={{ textAlign: "center" }}>
          ©{new Date().getFullYear()} ATS. All rights reserved.
        </Footer>
      </Layout>
    </Layout>
  );
}

// Custom scrollbar styles for the sidebar
const customStyles = `
  .custom-sidebar {
    overflow: hidden;
  }

  .custom-sidebar:hover {
    overflow-y: auto;
  }

  .custom-sidebar::-webkit-scrollbar {
    width: 0;
  }

  .custom-sidebar:hover::-webkit-scrollbar {
    width: 8px;
  }

  .custom-sidebar::-webkit-scrollbar-track {
    background: #f0f0f0;
  }

  .custom-sidebar::-webkit-scrollbar-thumb {
    background-color: lightblue;
    border-radius: 8px;
  }

  .custom-sidebar::-webkit-scrollbar-thumb:hover {
    background-color: #4a90e2;
  }
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = customStyles;
document.head.appendChild(styleSheet);
