import React from "react";
import { Form, Input, Button, Select, message } from "antd";
import { useRegisterUserMutation, useUpdateUserProfileMutation } from "../../../redux/services/usersApi";

const { Option } = Select;

const UserForm = ({ initialValues, onClose, onSubmit }) => {
  const [form] = Form.useForm();
  const [registerUser] = useRegisterUserMutation();
  const [updateUserProfile] = useUpdateUserProfileMutation();

  const onFinish = async (values) => {
    try {
      if (initialValues) {
        // Update existing user
        await updateUserProfile({ ...initialValues, ...values }).unwrap();
        message.success("User updated successfully");
      } else {
        // Create new user
        await registerUser(values).unwrap();
        message.success("User created successfully");
      }
      onSubmit();
    } catch (error) {
      message.error("Failed to submit the form");
    } finally {
      onClose();
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={initialValues}
      onFinish={onFinish}
    >
      <Form.Item
        name="name"
        label="Name"
        rules={[{ required: true, message: "Please enter the name" }]}
      >
        <Input placeholder="Enter user name" />
      </Form.Item>

      <Form.Item
        name="email"
        label="Email"
        rules={[
          { required: true, message: "Please enter the email" },
          { type: "email", message: "Please enter a valid email" },
        ]}
      >
        <Input placeholder="Enter user email" />
      </Form.Item>

      {!initialValues && (
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: "Please enter the password" }]}
        >
          <Input.Password placeholder="Enter password" />
        </Form.Item>
      )}

      <Form.Item
        name="role"
        label="Role"
        rules={[{ required: true, message: "Please select a role" }]}
      >
        <Select placeholder="Select user role">
          <Option value="user">User</Option>
          <Option value="manager">Manager</Option>
          <Option value="admin">Admin</Option>
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          {initialValues ? "Update User" : "Create User"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UserForm;
