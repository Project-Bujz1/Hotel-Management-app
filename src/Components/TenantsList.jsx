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
  Popconfirm,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  UserOutlined,
  PictureOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

const { Text, Title } = Typography;

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
        },
        {
          id: 2,
          name: "Jane Smith",
          image: "https://randomuser.me/api/portraits/women/2.jpg",
          details:
            "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        },
      ],
    },
    {
      id: 2,
      roomNumber: "102",
      sharing: 3,
      tenants: [
        {
          id: 3,
          name: "Michael Johnson",
          image: "https://randomuser.me/api/portraits/men/3.jpg",
          details:
            "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
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
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please enter tenant's name!" }]}
          >
            <Input prefix={<UserOutlined />} />
          </Form.Item>
          <Form.Item
            name="details"
            label="Details"
            rules={[
              { required: true, message: "Please enter tenant's details!" },
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
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
        </Form>
      </Modal>
    </div>
  );
};

export default TenantsList;
