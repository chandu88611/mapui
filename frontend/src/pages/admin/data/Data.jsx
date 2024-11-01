import React, { useState } from "react";
import { Table, Pagination, Input, Button, Modal, Form, DatePicker, InputNumber, message, Upload, Popconfirm } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useCreateWeatherMutation, useFetchWeatherDataQuery, useImportWeatherDataMutation, useDeleteWeatherMutation, useUpdateWeatherMutation } from "../../../redux/services/weatherApi";
import moment from "moment"; // For date handling

const { Search } = Input;

const WeatherDataTable = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [searchLocation, setSearchLocation] = useState("");
  const [searchDate, setSearchDate] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingWeather, setEditingWeather] = useState(null);
  const [form] = Form.useForm(); // Create form instance

  const { data, isLoading, isError, refetch } = useFetchWeatherDataQuery({
    page,
    limit: pageSize,
    location: searchLocation,
    date: searchDate,
  });

  const [createWeather] = useCreateWeatherMutation();
  const [importWeatherData] = useImportWeatherDataMutation();
  const [deleteWeather] = useDeleteWeatherMutation();
  const [updateWeather] = useUpdateWeatherMutation();

  // Handle pagination change
  const handlePageChange = (page, pageSize) => {
    setPage(page);
    setPageSize(pageSize);
  };

  // Handle search location
  const handleSearchLocationChange = (e) => {
    setSearchLocation(e.target.value);
    refetch();
  };

  // Handle search date
  const handleDateChange = (date, dateString) => {
    setSearchDate(dateString);
    refetch();
  };

  // Open/close modal for editing or creating weather data
  const handleOpenModal = (weather = null) => {
    setEditingWeather(weather);
    if (weather) {
      form.setFieldsValue({
        ...weather,
        timestamp: moment(weather.timestamp),
      });
    } else {
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setEditingWeather(null);
    setIsModalVisible(false);
  };

  // Submit new or updated weather data
  const handleFormSubmit = async (values) => {
    try {
      const payload = {
        ...values,
        timestamp: values.timestamp.toISOString(), // Convert timestamp to ISO format
      };
      if (editingWeather) {
        await updateWeather({ ...payload, id: editingWeather._id }).unwrap();
        message.success("Weather data updated successfully");
      } else {
        await createWeather(payload).unwrap();
        message.success("Weather data created successfully");
      }
      refetch();
      handleCloseModal();
    } catch (error) {
      message.error("Failed to save weather data");
    }
  };

  // Delete weather entry
  const handleDelete = async (id) => {
    try {
      await deleteWeather(id).unwrap();
      message.success("Weather data deleted successfully");
      refetch();
    } catch (error) {
      message.error("Failed to delete weather data");
    }
  };

  // Handle CSV upload
  const handleUpload = async ({ file }) => {
    if (!(file instanceof Blob)) {
      message.error("Invalid file type. Please upload a valid CSV file.");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64String = reader.result.split(",")[1];
      const payload = {
        fileName: file.name,
        fileData: base64String,
      };

      try {
        await importWeatherData(payload).unwrap();
        message.success("CSV data imported successfully");
        refetch();
      } catch (error) {
        message.error("Failed to import CSV data");
      }
    };

    reader.onerror = () => {
      message.error("Failed to read file. Please try again.");
    };
  };

  const columns = [
    { title: "Timestamp", dataIndex: "timestamp", key: "timestamp", render: (text) => moment(text).format("YYYY-MM-DD HH:mm") },
    { title: "Temperature", dataIndex: "temperature", key: "temperature" },
    { title: "Humidity", dataIndex: "humidity", key: "humidity" },
    { title: "Wind Speed", dataIndex: "windSpeed", key: "windSpeed" },
    { title: "Location", dataIndex: "location", key: "location" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <span>
          <Button type="link" onClick={() => handleOpenModal(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this record?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </span>
      ),
    },
  ];

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading weather data.</div>;

  return (
    <div>
      <h2>Weather Data</h2>
      <div style={{ marginBottom: 16, display: "flex", gap: "8px" }}>
        <Search placeholder="Search by location" onChange={handleSearchLocationChange} style={{ width: 200 }} />
        <DatePicker onChange={handleDateChange} placeholder="Filter by date" />
        <Button type="primary" onClick={() => handleOpenModal()}>
          Add Weather Data
        </Button>
        <Upload accept=".csv" showUploadList={false} customRequest={({ file }) => handleUpload({ file })}>
          <Button icon={<UploadOutlined />}>Upload CSV</Button>
        </Upload>
      </div>

      <Table columns={columns} dataSource={data?.data} rowKey="_id" pagination={false} />

      <Pagination
        current={page}
        pageSize={pageSize}
        total={data?.pagination?.total || 0}
        onChange={handlePageChange}
        style={{ marginTop: 16, textAlign: "right" }}
      />

      <Modal
        title={editingWeather ? "Edit Weather Data" : "Add New Weather Data"}
        visible={isModalVisible}
        onCancel={handleCloseModal}
        footer={null}
      >
        <Form
          form={form} // Use the form instance
          layout="vertical"
          onFinish={handleFormSubmit}
        >
          <Form.Item name="timestamp" label="Timestamp" rules={[{ required: true, message: "Please select a date and time" }]}>
            <DatePicker showTime />
          </Form.Item>
          <Form.Item name="temperature" label="Temperature (°C)" rules={[{ required: true, message: "Please enter the temperature" }]}>
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="humidity" label="Humidity (%)" rules={[{ required: true, message: "Please enter the humidity level" }]}>
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="windSpeed" label="Wind Speed (km/h)" rules={[{ required: true, message: "Please enter the wind speed" }]}>
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="precipitation" label="Precipitation (mm)" rules={[{ required: true, message: "Please enter the precipitation level" }]}>
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="pressure" label="Pressure (hPa)" rules={[{ required: true, message: "Please enter the pressure" }]}>
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="location" label="Location" rules={[{ required: true, message: "Please enter the location" }]}>
            <Input placeholder="Enter location" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingWeather ? "Update" : "Create"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default WeatherDataTable;
