import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Button, Col, Form, Input, message, Row, Typography } from "antd";
import "tailwindcss/tailwind.css";
import { useLoginUserMutation } from "../../redux/services/authApi";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/authSlice";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [loginUser] = useLoginUserMutation();
  const dispatch = useDispatch();
  const [ipAddress, setIpAddress] = useState(null); // State to store IP address

  // Fetch IP address on component mount
  useEffect(() => {
    const fetchIpAddress = async () => {
      try {
        const response = await axios.get('https://api.ipify.org?format=json'); // You can replace with another service if needed
        setIpAddress(response.data.ip);
      } catch (error) {
        console.error("Error fetching IP address:", error);
      }
    };

    fetchIpAddress();
  }, []);

  const onFinish = async (values) => {
    const loginData = {
      ...values,
      ipAddress: ipAddress || "IP not found", // Include IP address in the request body
    };

    const res = await loginUser(loginData);

    if (res?.data?.status) {
      await toast.success(res.data.message);
      sessionStorage.setItem("auth", res.data.data?.token);
      dispatch(setUser(res?.data?.data));

      switch (res?.data?.data.role) {
        case "admin":
          setTimeout(() => {
            navigate("/admin/dashboard");
          }, 1000);
          break;
     
        case "manager":
          setTimeout(() => {
            navigate("/manager/dashboard");
          }, 1000);
          break;
        default:
          break;
      }
    } else {
      setError(true);
      message.error(res.error.data.message)
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url('https://www.shutterstock.com/image-vector/professional-businesswoman-working-her-computer-600nw-2215180615.jpg')` }}>
      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg w-full max-w-md animate__animated animate__fadeIn">
        <div className="text-center mb-8">
          <Typography.Title level={2} className="text-3xl font-bold">
            Login to ATS HRM
          </Typography.Title>
        </div>

        <Form
          className="w-full"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input
              placeholder="Email"
              size="large"
              className="w-full py-2 px-4 rounded-lg border border-gray-300"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password
              placeholder="Password"
              size="large"
              className="w-full py-2 px-4 rounded-lg border border-gray-300"
            />
          </Form.Item>

          {error && (
            <div className="mb-4">
              <Alert message="Invalid Credentials" type="error" className="text-red-500" />
            </div>
          )}

          <Form.Item>
            <Button
              size="large"
              block
              type="primary"
              htmlType="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
        <a href="/forgot-password" style={{ color: 'blue' }}>
          <p>Forgot Password</p>
        </a>
      </div>
    </div>
  );
};

export default Login;
