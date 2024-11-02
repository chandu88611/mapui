import React from "react";
import { Layout, Menu, Avatar, Button, Dropdown, Badge } from "antd";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { AiOutlineDashboard, AiOutlineBell, AiOutlineSetting, AiOutlineUser, AiOutlineLogin } from "react-icons/ai";
import { FiMenu } from "react-icons/fi";

const { Header, Content, Footer } = Layout;

export default function UserLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = React.useState(false);

  // Dropdown menu for user options
  const userMenu = (
    <Menu>
      <Menu.Item key="1" icon={<AiOutlineSetting />} onClick={() => navigate("/user/settings")}>
        Settings
      </Menu.Item>
      <Menu.Item key="2" icon={<AiOutlineLogin />} onClick={() => navigate("/login")}>
        Login
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          padding: "0 20px",
          background: "#fff",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #f0f0f0",
          width: "100%",
          position: "fixed",
          zIndex: 1,
          top: 0,
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
     
          <span style={{ fontWeight: "bold", fontSize: "1.2rem" }}>User Portal</span>
        </div>

        {/* Right section with menu icons and login button */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <Badge count={5}>
            <AiOutlineBell style={{ fontSize: "24px", cursor: "pointer" }} />
          </Badge>
 
          <Button type="primary" icon={<AiOutlineLogin />} onClick={() => navigate("/login")}>
            Login
          </Button>
        </div>
      </Header>

      <Content
        style={{
          marginTop: 64,  
          padding: "24px 16px",
          background: "#fff",
          minHeight: "280px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Outlet />
      </Content>

      <Footer style={{ textAlign: "center", marginTop: 24 }}>
        ©{new Date().getFullYear()} ATS. All rights reserved.
      </Footer>
    </Layout>
  );
}

// Responsive styles for mobile view
const responsiveStyles = `
  @media (max-width: 768px) {
    .ant-layout-header {
      padding: 0 10px;
    }
    .ant-layout-header .menu-trigger {
      font-size: 20px;
    }
    .ant-layout-header .ant-avatar {
      width: 32px;
      height: 32px;
    }
  }
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = responsiveStyles;
document.head.appendChild(styleSheet);
