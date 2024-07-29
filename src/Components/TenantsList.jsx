import React, { useState } from "react";
import {
  Card,
  Modal,
  Button,
  Row,
  Col,
  Typography,
  Form,
  Input,
  Upload,
  Select,
  DatePicker,
  Divider,
  Popconfirm,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  UserOutlined,
  PictureOutlined,
  ExclamationCircleOutlined,
  IdcardOutlined,
  BankOutlined,
} from "@ant-design/icons";
import moment from 'moment';

const { Text, Title } = Typography;
const { Option } = Select;

const TenantsList = () => {
  // State for managing rooms and tenants
  const [rooms, setRooms] = useState([
    {
      id: 1,
      roomNumber: "101",
      sharing: 2,
      tenants: [
        {
          id: 1,
          name: "John Doe",
          image: "https://randomuser.me/api/portraits/men/1.jpg",
          details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          email: "john.doe@example.com",
          phoneNumber: "1234567890",
          emergencyContact: "Jane Doe - 0987654321",
          idNumber: "AB1234567",
          currentAddress: "123 Main St, Anytown, USA",
          permanentAddress: "456 Elm St, Othertown, USA",
          leaseStartDate: moment().subtract(1, 'month'),
          leaseEndDate: moment().add(11, 'months'),
          monthlyRent: 500,
          paymentMethod: "bank_transfer",
          securityDeposit: 1000,
          occupation: "Engineer",
          employerName: "Tech Corp",
          employerContact: "tech.corp@example.com",
          nationality: "American",
          medicalConditions: "None",
        },
      ],
    },
    {
      id: 2,
      roomNumber: "10",
      sharing: 2,
      tenants: [
        {
          id: 2,
          name: "John Doe",
          image: "https://randomuser.me/api/portraits/men/1.jpg",
          details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          email: "john.doe@example.com",
          phoneNumber: "1234567890",
          emergencyContact: "Jane Doe - 0987654321",
          idNumber: "AB1234567",
          currentAddress: "123 Main St, Anytown, USA",
          permanentAddress: "456 Elm St, Othertown, USA",
          leaseStartDate: moment().subtract(1, 'month'),
          leaseEndDate: moment().add(11, 'months'),
          monthlyRent: 500,
          paymentMethod: "bank_transfer",
          securityDeposit: 1000,
          occupation: "Engineer",
          employerName: "Tech Corp",
          employerContact: "tech.corp@example.com",
          nationality: "American",
          medicalConditions: "None",
        },
      ],
    },
  ]);

  // State for managing modal visibility and form data
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [currentTenant, setCurrentTenant] = useState(null);
  const [form] = Form.useForm();

  // Modal control functions
  const showModal = (room, tenant) => {
    setCurrentRoom(room);
    setCurrentTenant(tenant);
    setIsModalVisible(true);
    if (tenant) {
      form.setFieldsValue({
        name: tenant.name,
        details: tenant.details,
        image: tenant.image,
        email: tenant.email,
        phoneNumber: tenant.phoneNumber,
        emergencyContact: tenant.emergencyContact,
        idNumber: tenant.idNumber,
        currentAddress: tenant.currentAddress,
        permanentAddress: tenant.permanentAddress,
        leaseStartDate: tenant.leaseStartDate,
        leaseEndDate: tenant.leaseEndDate,
        monthlyRent: tenant.monthlyRent,
        paymentMethod: tenant.paymentMethod,
        securityDeposit: tenant.securityDeposit,
        occupation: tenant.occupation,
        employerName: tenant.employerName,
        employerContact: tenant.employerContact,
        nationality: tenant.nationality,
        medicalConditions: tenant.medicalConditions,
      });
    } else {
      form.resetFields();
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleAddEditTenant = () => {
    form.validateFields().then((values) => {
      const updatedRooms = rooms.map((room) => {
        if (room.id === currentRoom.id) {
          if (currentTenant) {
            return {
              ...room,
              tenants: room.tenants.map((t) =>
                t.id === currentTenant.id ? { ...t, ...values } : t
              ),
            };
          } else {
            const newTenant = {
              id: Date.now(),
              ...values,
            };
            return {
              ...room,
              tenants: [...room.tenants, newTenant],
            };
          }
        }
        return room;
      });
      setRooms(updatedRooms);
      setIsModalVisible(false);
    });
  };

  const handleDeleteTenant = (roomId, tenantId) => {
    const updatedRooms = rooms.map((room) => {
      if (room.id === roomId) {
        return {
          ...room,
          tenants: room.tenants.filter((t) => t.id !== tenantId),
        };
      }
      return room;
    });
    setRooms(updatedRooms);
  };

  return (
    <div style={{ marginTop: "75px" }}>
      {rooms.map((room) => (
        <Card key={room.id} title={`Room ${room.roomNumber}`}>
          <Row gutter={16}>
            {room.tenants.map((tenant) => (
              <Col
                key={tenant.id}
                xs={24}
                sm={12}
                md={8}
                lg={6}
                xl={4}
                style={{ marginBottom: 16 }}
              >
                <Card
                  hoverable
                  cover={<img alt={tenant.name} src={tenant.image} />}
                  actions={[
                    <EditOutlined
                      key="edit"
                      onClick={() => showModal(room, tenant)}
                    />,
                    <Popconfirm
                      title="Are you sure to delete this tenant?"
                      onConfirm={() => handleDeleteTenant(room.id, tenant.id)}
                      okText="Yes"
                      cancelText="No"
                      icon={
                        <ExclamationCircleOutlined style={{ color: "red" }} />
                      }
                    >
                      <DeleteOutlined key="delete" />
                    </Popconfirm>,
                  ]}
                >
                  <Card.Meta title={tenant.name} />
                </Card>
              </Col>
            ))}
            <Col
              xs={24}
              sm={12}
              md={8}
              lg={6}
              xl={4}
              style={{ marginBottom: 16 }}
            >
              <Card
                hoverable
                onClick={() => showModal(room)}
                style={{ textAlign: "center", height: "100%" }}
              >
                <Button
                  type="primary"
                  shape="round"
                  icon={<UserOutlined />}
                  size="large"
                >
                  Add Tenant
                </Button>
              </Card>
            </Col>
          </Row>
        </Card>
      ))}

      <Modal
        title={currentTenant ? "Edit Tenant" : "Add Tenant"}
        visible={isModalVisible}
        onCancel={handleCancel}
        onOk={handleAddEditTenant}
        destroyOnClose
      >
        <Form form={form} layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: "Please enter tenant's name!" }]}
              >
                <Input prefix={<UserOutlined />} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="image" label="Image">
                <Upload
                  listType="picture"
                  beforeUpload={(file) => {
                    const reader = new FileReader();
                    reader.onload = () => {
                      form.setFieldsValue({ image: reader.result });
                    };
                    reader.readAsDataURL(file);
                    return false;
                  }}
                >
                  <Button icon={<PictureOutlined />}>Upload Image</Button>
                </Upload>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="email"
                label="Email Address"
                rules={[{ required: true, type: 'email', message: "Please enter a valid email address!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="phoneNumber"
                label="Phone Number"
                rules={[{ required: true, message: "Please enter the tenant's phone number!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="emergencyContact"
                label="Emergency Contact"
                rules={[{ required: true, message: "Please enter the emergency contact name and phone number!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="idNumber"
                label="Government ID Number"
                rules={[{ required: true, message: "Please enter the government ID number!" }]}
              >
                <Input prefix={<IdcardOutlined />} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="currentAddress"
                label="Current Address"
                rules={[{ required: true, message: "Please enter the current address!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="permanentAddress"
                label="Permanent Address"
                rules={[{ required: true, message: "Please enter the permanent address!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="leaseStartDate"
                label="Lease Start Date"
                rules={[{ required: true, message: "Please select the lease start date!" }]}
              >
                <DatePicker format="YYYY-MM-DD" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="leaseEndDate"
                label="Lease End Date"
                rules={[{ required: true, message: "Please select the lease end date!" }]}
              >
                <DatePicker format="YYYY-MM-DD" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="monthlyRent"
                label="Monthly Rent"
                rules={[{ required: true, message: "Please enter the monthly rent amount!" }]}
              >
                <Input prefix={<BankOutlined />} type="number" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="paymentMethod"
                label="Payment Method"
                rules={[{ required: true, message: "Please select the payment method!" }]}
              >
                <Select placeholder="Select payment method">
                  <Option value="bank_transfer">Bank Transfer</Option>
                  <Option value="cash">Cash</Option>
                  <Option value="cheque">Cheque</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="securityDeposit"
                label="Security Deposit"
                rules={[{ required: true, message: "Please enter the security deposit amount!" }]}
              >
                <Input prefix={<BankOutlined />} type="number" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="occupation"
                label="Occupation"
                rules={[{ required: true, message: "Please enter the tenant's occupation!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="employerName"
                label="Employer Name"
                rules={[{ required: true, message: "Please enter the employer's name!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="employerContact"
                label="Employer Contact"
                rules={[{ required: true, message: "Please enter the employer's contact information!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="nationality"
                label="Nationality"
                rules={[{ required: true, message: "Please enter the tenant's nationality!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="medicalConditions"
                label="Medical Conditions"
                rules={[{ required: true, message: "Please enter any medical conditions!" }]}
              >
                <Input.TextArea rows={4} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default TenantsList;
