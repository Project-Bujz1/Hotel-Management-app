import React, { useState, useEffect } from "react";
import { Card, Row, Col, Badge, Button, Space, Form, DatePicker, Select, message, Modal, Popconfirm, Spin, Empty } from "antd";
import { EditOutlined } from '@ant-design/icons';
import moment from "moment";

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

export const statusColors = {
  Paid: "green",
  "Not Paid": "red",
  "Due Soon": "blue",
};

const RentDueList = () => {
  const [rentData, setRentData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentTenant, setCurrentTenant] = useState(null);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false); // Loading state for data fetching
  const [updating, setUpdating] = useState(false); // Loading state for updates

  // Fetch room and tenant data from the API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const roomsResponse = await fetch("https://smart-hostel-management-json-server.onrender.com/rooms");
        const roomsData = await roomsResponse.json();

        const tenantsResponse = await fetch("https://smart-hostel-management-json-server.onrender.com/tenants");
        const tenantsData = await tenantsResponse.json();

        // Filter tenants based on existing rooms
        const validTenantIds = new Set(roomsData.map(room => room.id));
        const filteredTenants = tenantsData.filter(tenant => validTenantIds.has(tenant.roomId));

        setRentData(filteredTenants);
      } catch (error) {
        console.error("Error fetching data:", error);
        message.error("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const showEditForm = (tenant) => {
    setCurrentTenant(tenant);
    form.setFieldsValue({
      dueDate: moment(tenant.dueDate, "YYYY-MM-DD"),
      modeOfPayment: tenant.modeOfPayment,
      status: tenant.status,
    });
    setIsModalVisible(true);
  };

  const handleFormSubmit = (values) => {
    if (currentTenant) {
      setUpdating(true);
      fetch(`https://smart-hostel-management-json-server.onrender.com/tenants/${currentTenant.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...currentTenant,
          dueDate: values.dueDate.format("YYYY-MM-DD"),
          modeOfPayment: values.modeOfPayment,
          status: values.status,
        }),
      })
        .then(response => response.json())
        .then(updatedTenant => {
          setRentData(prevData =>
            prevData.map(tenant =>
              tenant.id === currentTenant.id ? updatedTenant : tenant
            )
          );
          message.success("Details updated successfully");
          setIsModalVisible(false);
        })
        .catch(error => {
          console.error("Error updating tenant data:", error);
          message.error("Failed to update tenant data");
        })
        .finally(() => {
          setUpdating(false);
        });
    }
  };

  const handleMarkAsPaid = (tenant) => {
    setUpdating(true);
    fetch(`https://smart-hostel-management-json-server.onrender.com/tenants/${tenant.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: "Paid" }),
    })
      .then(response => response.json())
      .then(updatedTenant => {
        setRentData(prevData =>
          prevData.map(t =>
            t.id === tenant.id ? updatedTenant : t
          )
        );
        message.success("Marked as paid");
      })
      .catch(error => {
        console.error("Error marking as paid:", error);
        message.error("Failed to mark as paid");
      })
      .finally(() => {
        setUpdating(false);
      });
  };

  const handleMarkAsUnpaid = (tenant) => {
    setUpdating(true);
    fetch(`https://smart-hostel-management-json-server.onrender.com/tenants/${tenant.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: "Not Paid" }),
    })
      .then(response => response.json())
      .then(updatedTenant => {
        setRentData(prevData =>
          prevData.map(t =>
            t.id === tenant.id ? updatedTenant : t
          )
        );
        message.error("Marked as unpaid");
      })
      .catch(error => {
        console.error("Error marking as unpaid:", error);
        message.error("Failed to mark as unpaid");
      })
      .finally(() => {
        setUpdating(false);
      });
  };

  return (
    <div style={{ padding: '10px', marginTop: '75px' }}>
      <Spin spinning={loading} size="small">
        {rentData.length === 0 ? (
          <Empty description="No data available" />
        ) : (
          <Row gutter={[16, 16]}>
            {rentData.map(tenant => (
              <Col key={tenant.id} xs={24} sm={12} md={8} lg={6}>
                <Badge.Ribbon
                  text={tenant.status}
                  color={statusColors[tenant.status]}
                >
                  <Card title={`Room ${tenant.roomNumber}`} bordered={false}>
                    <p>
                      <strong>Tenant:</strong> {tenant.name}
                    </p>
                    <p>
                      <strong>Due Date:</strong> {moment(tenant.dueDate).format("YYYY-MM-DD")}
                    </p>
                    <p>
                      <strong>Payment Mode:</strong> {tenant.modeOfPayment}
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      <Popconfirm
                        title="Are you sure you want to mark this as paid?"
                        onConfirm={() => handleMarkAsPaid(tenant)}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Button type="primary" style={{ flex: 1, minWidth: '120px' }} loading={updating}>
                          Mark as Paid
                        </Button>
                      </Popconfirm>
                      <Popconfirm
                        title="Are you sure you want to mark this as unpaid?"
                        onConfirm={() => handleMarkAsUnpaid(tenant)}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Button danger style={{ flex: 1, minWidth: '120px' }} loading={updating}>
                          Mark as Unpaid
                        </Button>
                      </Popconfirm>
                      <Button
                        icon={<EditOutlined />}
                        onClick={() => showEditForm(tenant)}
                        type="default"
                        style={{ flex: 1, minWidth: '120px' }}
                        loading={updating}
                      >
                        Edit
                      </Button>
                    </div>
                  </Card>
                </Badge.Ribbon>
              </Col>
            ))}
          </Row>
        )}
      </Spin>

      <Modal
        title="Edit Tenant Details"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => form.submit()}
        okText="Submit"
        cancelText="Cancel"
        confirmLoading={updating}
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
            <DatePicker format="YYYY-MM-DD" style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="modeOfPayment"
            label="Payment Mode"
            rules={[{ required: true, message: "Please select the payment mode" }]}
          >
            <Select style={{ width: '100%' }}>
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
            <Select style={{ width: '100%' }}>
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
