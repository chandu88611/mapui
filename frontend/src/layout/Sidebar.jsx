import React from "react";
import { ConfigProvider, Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { FiHome } from 'react-icons/fi';
import { FaBitcoin, FaRegListAlt, FaCogs, FaBoxOpen } from 'react-icons/fa';
import { AiOutlineDashboard, AiOutlineSetting } from 'react-icons/ai';
import { BiMoneyWithdraw } from 'react-icons/bi';
import { RiComputerLine } from 'react-icons/ri';
import { useSelector } from "react-redux";

const SideBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isSidebarOpen = useSelector((state) => state.sidebar.isOpen); // Access sidebar state

  const onClick = (e) => {
    e.key !== null && navigate(e.key);
  };

  const menuItems = [
    {
      label: isSidebarOpen ? "Dashboard" : null,
      key: "/",
      icon: <AiOutlineDashboard size={"18px"} />,  
    },
    {
      label: isSidebarOpen ? "Users" : null,
      key: "/users",
      icon: <FaBitcoin size={"18px"} />,  
    },
    {
      label: isSidebarOpen ? "Rigs" : null,
      key: "/rigs",
      icon: <RiComputerLine size={"18px"}/>,   
    },
    {
      label: isSidebarOpen ? "Withdraw" : null,
      key: "/withdraw",
      icon: <BiMoneyWithdraw size={"18px"}/>,  
    },
    {
      label: isSidebarOpen ? "Settings" : null,
      key: "/settings",
      icon: <AiOutlineSetting size={"18px"}/>,  
    },
    {
      label: isSidebarOpen ? "Invoices" : null,
      key: "/invoices",
      icon: <FaRegListAlt size={"18px"}/>,  
    },
    {
      label: isSidebarOpen ? "Products" : null,
      key: "/products",
      icon: <FaBoxOpen size={"18px"}/>,  
    },
  ];

  return (
    <ConfigProvider
      theme={{
        token: {
          colorText: "black", // Set text color to black
          fontWeight: "bold", // Set font weight to bold
          colorBgContainer: "transparent", // Background color of the menu
        },
      }}
    >
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        onClick={onClick} 
        style={{
          paddingBottom: "150px",
          background: "none", 
          color: "black",  
          fontWeight: "bold",  
        }}
        theme="light" // Use the light theme
        className="custom-menu" // Custom class to apply our styles
        items={menuItems.map(item => ({
          key: item.key,
          icon: item.icon,
          label: item.label,
        }))} // Map the menuItems properly to display them
      />
    </ConfigProvider>
  );
};

export default SideBar;
