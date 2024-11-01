import React, { useState, useEffect, useRef } from 'react';
import { Form, Input, Button, Card, Upload, Avatar } from 'antd';
import { UploadOutlined, PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import { useGetOrganizationByIdQuery, useUpdateOrganizationByIdMutation } from '../../redux/services/organisationApi';

function OrganizationDetails() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [companyLogo, setCompanyLogo] = useState(null);
  const [updateSettings] = useUpdateOrganizationByIdMutation();
  const { data: settings, isLoading: isFetchingSettings } = useGetOrganizationByIdQuery();
  const uploadInputRef = useRef(null);

  useEffect(() => {
    // Set the default form values when settings data is fetched
    if (settings) {
      form.setFieldsValue({
        ...settings.data,
        companyLogo: settings.data.companyLogo || null,
        ipAddresses: settings.data.ipAddresses || [''], // Default to an empty string array if no IPs
      });
      setCompanyLogo(settings.data.companyLogo || null);
    }
  }, [settings, form]);

  const handleUpdateOrganization = async (values) => {
    try {
      setLoading(true);
      // Merge logo URL if uploaded
      const updatedData = { ...values, companyLogo };
      await updateSettings({ ...updatedData }).unwrap();
      toast.success('Organization details updated successfully');
    } catch (error) {
      toast.error('Failed to update organization details');
    } finally {
      setLoading(false);
    }
  };

  // Handle image upload
  const handleUploadChange = (info) => {
    if (info.file.status === 'done') {
      // Assuming the server returns the URL of the uploaded image
      const uploadedUrl = info.file.response?.url;
      setCompanyLogo(uploadedUrl);
      form.setFieldsValue({ companyLogo: uploadedUrl });
      toast.success('Logo uploaded successfully');
    }
  };

  // Trigger file input click when avatar is clicked
  const handleAvatarClick = () => {
    if (uploadInputRef.current) {
      uploadInputRef.current.click();
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Update Organization Details</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleUpdateOrganization}
      >
        <div className="row">
          {/* Company Logo Card */}
          <Card className="bg-gray-50 p-4 col-6">
            <div className="flex flex-col items-center">
              <Avatar
                size={128}
                src={companyLogo}
                alt="Company Logo"
                className="mb-4 cursor-pointer"
                onClick={handleAvatarClick}
              />
              <Upload
                ref={uploadInputRef}
                name="logo"
                listType="picture"
                className="hidden"
                showUploadList={false}
                action="/api/upload" // Replace with your actual upload endpoint
                onChange={handleUploadChange}
              >
                {/* Hidden upload button */}
              </Upload>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <Form.Item name="phone" label="Phone" rules={[{ required: true, message: 'Please enter the phone number' }]}>
                <Input />
              </Form.Item>
              <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}>
                <Input />
              </Form.Item>
              <Form.Item name="gstNumber" label="GST Number" rules={[{ required: true, message: 'Please enter the GST number' }]}>
                <Input />
              </Form.Item>
              <Form.Item name="tanNumber" label="TAN Number" rules={[{ required: true, message: 'Please enter the TAN number' }]}>
                <Input />
              </Form.Item>
            </div>
          </Card>

          {/* Address Card */}
          <Card title="Address" className="bg-gray-50 p-4 col-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Item name={['address', 'street']} label="Street" rules={[{ required: true, message: 'Please enter the street' }]}>
                <Input />
              </Form.Item>
              <Form.Item name={['address', 'city']} label="City" rules={[{ required: true, message: 'Please enter the city' }]}>
                <Input />
              </Form.Item>
              <Form.Item name={['address', 'state']} label="State" rules={[{ required: true, message: 'Please enter the state' }]}>
                <Input />
              </Form.Item>
              <Form.Item name={['address', 'zipCode']} label="Zip Code" rules={[{ required: true, message: 'Please enter the zip code' }]}>
                <Input />
              </Form.Item>
              <Form.Item name={['address', 'country']} label="Country" rules={[{ required: true, message: 'Please enter the country' }]}>
                <Input />
              </Form.Item>
            </div>
          </Card>

          {/* IP Addresses Card */}
          <Card title="IP Addresses" className="bg-gray-50 p-4 col-6 mt-4">
            <Form.List name="ipAddresses">
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field, index) => (
                    <div key={field.key} className="grid grid-cols-2 gap-4 mb-2">
                      <Form.Item
                        {...field}
                        label={`IP Address ${index + 1}`}
                        name={[field.name]}
                        fieldKey={[field.fieldKey]}
                        rules={[{ required: true, message: 'Please enter the IP address' }]}
                      >
                        <Input placeholder="Enter IP address" />
                      </Form.Item>
                      <Button
                        type="danger"
                        onClick={() => remove(field.name)}
                        icon={<MinusCircleOutlined />}
                      />
                    </div>
                  ))}
                  <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
                    Add IP Address
                  </Button>
                </>
              )}
            </Form.List>
          </Card>
        </div>

        {/* Submit Button */}
        <Form.Item>
          <Button type="primary" htmlType="submit" className="mt-2" loading={loading}>
            Update Organization Details
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default OrganizationDetails;
