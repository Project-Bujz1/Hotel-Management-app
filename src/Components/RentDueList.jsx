import React, { useState } from "react";
import { Card, Row, Col, Badge, Button, Space, Form, Input, DatePicker, Select, message, Modal, Popconfirm } from "antd";
import { EditOutlined } from '@ant-design/icons';
import moment from "moment";

const initialRentData = [
  {
    key: "1",
    name: "John Doe",
    roomNumber: "101",
    status: "Paid",
    dueDate: "2024-07-10",
    modeOfPayment: "Online",
  },
  {
    key: "2",
    name: "Jane Smith",
    roomNumber: "102",
    status: "Not Paid",
    dueDate: "2024-07-15",
    modeOfPayment: "Cash",
  },
  {
    key: "3",
    name: "Bob Johnson",
    roomNumber: "103",
    status: "Due Soon",
    dueDate: "2024-07-18",
    modeOfPayment: "Cheque",
  },
];

const statusOptions = [
  { value: "Paid", label: "Paid" },
  { value: "Not Paid", label: "Not Paid" },
  { value: "Due Soon", label: "Due Soon" },
];

const paymentModeOptions = [
  { value: "Online", label: "Online" },
  { value: "Cash", label: "Cash" },
  { value: "Cheque", label: "Cheque" },
  { value: "Bank Transfer", label: "Bank Transfer" },
];

const statusColors = {
  Paid: "green",
  "Not Paid": "red",
  "Due Soon": "blue",
};

const RentDueList = () => {
  const [rentData, setRentData] = useState(initialRentData);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentTenant, setCurrentTenant] = useState(null);
  const [form] = Form.useForm();

  const showEditForm = (tenant) => {
    setCurrentTenant(tenant);
    form.setFieldsValue({
      dueDate: moment(tenant.dueDate),
      modeOfPayment: tenant.modeOfPayment,
      status: tenant.status,
    });
    setIsModalVisible(true);
  };

  const handleFormSubmit = (values) => {
    if (currentTenant) {
      setRentData((prevData) =>
        prevData.map((tenant) =>
          tenant.key === currentTenant.key
            ? {
                ...tenant,
                dueDate: values.dueDate.format("YYYY-MM-DD"),
                modeOfPayment: values.modeOfPayment,
                status: values.status,
              }
            : tenant
        )
      );
      message.success("Details updated successfully");
      setIsModalVisible(false);
    }
  };

  const handleMarkAsPaid = (tenant) => {
    setRentData((prevData) =>
      prevData.map((t) =>
        t.key === tenant.key ? { ...t, status: "Paid" } : t
      )
    );
    message.success("Marked as paid");
  };

  const handleMarkAsUnpaid = (tenant) => {
    setRentData((prevData) =>
      prevData.map((t) =>
        t.key === tenant.key ? { ...t, status: "Not Paid" } : t
      )
    );
    message.error("Marked as unpaid");
  };

  return (
    <div style={{ marginTop: "75px" }}>
      <Row gutter={[16, 16]}>
        {rentData.map((tenant) => (
          <Col key={tenant.key} xs={24} sm={12} md={8} lg={6}>
            <Badge.Ribbon
              text={tenant.status}
              color={statusColors[tenant.status]}
            >
              <Card title={`Room ${tenant.roomNumber}`} bordered={false}>
                <p>
                  <strong>Tenant:</strong> {tenant.name}
                </p>
                <p>
                  <strong>Due Date:</strong> {tenant.dueDate}
                </p>
                <p>
                  <strong>Payment Mode:</strong> {tenant.modeOfPayment}
                </p>
                <Space>
                  <Popconfirm
                    title="Are you sure you want to mark this as paid?"
                    onConfirm={() => handleMarkAsPaid(tenant)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button type="primary">Mark as Paid</Button>
                  </Popconfirm>
                  <Popconfirm
                    title="Are you sure you want to mark this as unpaid?"
                    onConfirm={() => handleMarkAsUnpaid(tenant)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button danger>Mark as Unpaid</Button>
                  </Popconfirm>
                  <Button
                    icon={<EditOutlined />}
                    onClick={() => showEditForm(tenant)}
                    type="default"
                  >
                    Edit
                  </Button>
                </Space>
              </Card>
            </Badge.Ribbon>
          </Col>
        ))}
      </Row>

      <Modal
        title="Edit Tenant Details"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => form.submit()}
      >
        <Form
          form={form}
          onFinish={handleFormSubmit}
          layout="vertical"
        >
          <Form.Item
            name="dueDate"
            label="Due Date"
            rules={[{ required: true, message: "Please select the due date" }]}
          >
            <DatePicker format="YYYY-MM-DD" />
          </Form.Item>
          <Form.Item
            name="modeOfPayment"
            label="Payment Mode"
            rules={[{ required: true, message: "Please select the payment mode" }]}
          >
            <Select>
              {paymentModeOptions.map(option => (
                <Select.Option key={option.value} value={option.value}>
                  {option.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="status"
            label="Payment Status"
            rules={[{ required: true, message: "Please select the payment status" }]}
          >
            <Select>
              {statusOptions.map(option => (
                <Select.Option key={option.value} value={option.value}>
                  {option.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default RentDueList;
