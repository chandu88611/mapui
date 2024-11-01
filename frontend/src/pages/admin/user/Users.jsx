import React, { useState, useCallback } from "react";
import { Table, Button, Modal, Space, Popconfirm, message, Input, Select, Pagination } from "antd";
 
import { debounce } from "lodash";

import { useDeleteUserMutation, useListUserQuery } from "../../../redux/services/usersApi";
import UserForm from "./userForm";

const { Search } = Input;
const { Option } = Select;

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data: users, isLoading, refetch } = useListUserQuery(
    { search: searchTerm, role: roleFilter, page: currentPage, limit: pageSize },
    { refetchOnMountOrArgChange: true }
  );

  const [deleteUser] = useDeleteUserMutation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const handleDelete = async (userId) => {
    try {
      await deleteUser(userId).unwrap();
      message.success("User deleted successfully");
      refetch();
    } catch (error) {
      message.error("Failed to delete user");
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setIsModalVisible(true);
  };

  const handleCreate = () => {
    setEditingUser(null);
    setIsModalVisible(true);
  };

  const handleFormSubmit = () => {
    setIsModalVisible(false);
    refetch();
  };

  // Debounced search function
  const debounceSearch = useCallback(
    debounce((value) => setSearchTerm(value), 500),
    []
  );

  const handleSearchChange = (e) => {
    debounceSearch(e.target.value);
  };

  const handleRoleFilterChange = (value) => {
    setRoleFilter(value);
    refetch();
  };

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Role", dataIndex: "role", key: "role" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button onClick={() => handleEdit(record)}>Edit</Button>
          <Popconfirm
            title="Are you sure you want to delete this user?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h2 className="my-2">User Management</h2>

      <div style={{ marginBottom: 16, display: "flex", gap: "8px" }}>
        <Search
          placeholder="Search by name"
          onChange={handleSearchChange}
          style={{ width: 200 }}
        />
        <Select
          placeholder="Filter by role"
          onChange={handleRoleFilterChange}
          style={{ width: 150 }}
          allowClear
        >
          <Option value="admin">Admin</Option>
          <Option value="manager">Manager</Option>
          <Option value="user">User</Option>
        </Select>
        <Button type="primary" onClick={handleCreate}>
          Create User
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={users?.data}
        rowKey="_id"
        pagination={false} // Disable built-in pagination
      />

      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={users?.pagination?.total || 0}
        onChange={handlePageChange}
        style={{ marginTop: 16, textAlign: "right" }}
      />

      <Modal
        title={editingUser ? "Edit User" : "Create User"}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <UserForm
          initialValues={editingUser}
          onClose={() => setIsModalVisible(false)}
          onSubmit={handleFormSubmit}
        />
      </Modal>
    </div>
  );
};

export default UserManagement;
