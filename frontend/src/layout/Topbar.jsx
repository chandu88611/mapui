import React, { useState } from "react";
import {
  Avatar,
  Button,
  Col,
  Dropdown,
  Image,
  Row,
  Space,
  Typography,
  Breadcrumb,
  Menu,
} from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  MenuOutlined,
  HomeOutlined,
  UsergroupAddOutlined,
  DownOutlined,
} from "@ant-design/icons";
import logo from "/logo.png";
import { toggleSidebar } from "../redux/slices/sidebarSlice";
import { useLogoutUserMutation } from "../redux/services/authApi";

const TopBar = () => {
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector((state) => state.sidebar.isOpen);
  const [openModal, setOpenModal] = useState(false);
  const [logoutUser]=useLogoutUserMutation()
  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  const handleLogout =async () => {
    const res =await logoutUser()

    if(res?.data?.status){
     await  sessionStorage.removeItem("auth")
window.location.href='login'
    }
  };

  const items = [
    {
      key: "1",
      label: (
        <Button block type="ghost" onClick={handleLogout}>
          Logout
        </Button>
      ),
    },
  ];

  const admissionsMenu = (
    <Menu>
      <Menu.Item key="1">
        <Link to="/admissions/new">New Admission</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/admissions/pending">Pending Admissions</Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Link to="/admissions/completed">Completed Admissions</Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <Row
        justify={" "}
        className={`h-full px-[20px] bg-white`}
      >
        <Row className="h-full flex w-full justify-between">
          <Space align="center">
            <Breadcrumb>
              <Breadcrumb.Item onClick={handleToggleSidebar}>
                {isSidebarOpen ? (
                  <MenuOutlined className="font-bold !cursor-pointer" />
                ) : (
                  <MenuOutlined className="font-bold !cursor-pointer" />
                )}
              </Breadcrumb.Item>
            </Breadcrumb>
            <Link to={"/"} className="h-fit">
              <img
                src={"/icon.png"}
                preview={false}
                style={{ objectFit: "contain" }}
                className="!mt-2 h-14"
              />
            </Link>
            {/* Breadcrumb for toggling sidebar */}
            <span className="font-bold">Management Live</span>
          </Space>
          <div className="flex items-center h-full">
            <Space size="large">
              {/* Home Menu */}
              <Link to="/">
                <Space>
                  <HomeOutlined style={{ fontSize: '18px',color:"white" }} />
                  <span className="font-bold ">Home</span>
                </Space>
              </Link>

              {/* Admissions Menu with Dropdown */}
              <Dropdown overlay={admissionsMenu} placement="bottom">
                <Space className="cursor-pointer">
                  <UsergroupAddOutlined style={{ fontSize: '18px' ,color:"white"}} />
                  <span className="font-bold ">Admissions</span>
                  <DownOutlined style={{ fontSize: '12px',color:"white" }} />
                </Space>
              </Dropdown>

              {/* Avatar and Logout */}
              <Dropdown
                menu={{
                  items,
                }}
                placement="bottom"
              >
                <Space direction="horizontal">
                  <Avatar
                    style={{
                      backgroundColor: "#F29D41",
                    }}
                    size="default"
                  >
                    A
                  </Avatar>
                </Space>
              </Dropdown>
            </Space>
          </div>
        </Row>
      </Row>
      {/* <ChangePasswordModal openModal={openModal} setOpenModal={setOpenModal} /> */}
    </>
  );
};

export default TopBar;
