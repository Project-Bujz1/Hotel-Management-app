import React, { useState, useEffect } from "react";
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
  message,
  Select,
  DatePicker,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  UserOutlined,
  PictureOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

const { Text, Title } = Typography;
const { Option } = Select;

const TenantsList = () => {
  const [rooms, setRooms] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [currentTenant, setCurrentTenant] = useState(null);
  const [form] = Form.useForm();

  // Fetch rooms data from the API
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch("http://localhost:3030/rooms");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setRooms(data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
        message.error("Failed to fetch rooms data");
      }
    };

    fetchRooms();
  }, []);

  const showModal = (room, tenant = null) => {
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

      // Update data on the server
      fetch(`http://localhost:3030/rooms/${currentRoom.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedRooms.find((r) => r.id === currentRoom.id)),
      })
        .then((response) => {
          if (!response.ok) throw new Error("Network response was not ok");
          return response.json();
        })
        .then(() => {
          setRooms(updatedRooms);
          setIsModalVisible(false);
          message.success("Tenant information updated successfully");
        })
        .catch((error) => {
          console.error("Error updating room data:", error);
          message.error("Failed to update tenant information");
        });
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

    // Update data on the server
    fetch(`http://localhost:3030/rooms/${roomId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedRooms.find((r) => r.id === roomId)),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then(() => {
        setRooms(updatedRooms);
        message.success("Tenant deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting tenant:", error);
        message.error("Failed to delete tenant");
      });
  };

  const handleImageClick = (tenant) => {
    Modal.info({
      title: `Tenant Details - ${tenant.name}`,
      content: (
        <div style={{ textAlign: "center" }}>
          <img
            alt={tenant.name}
            src={tenant.image || "https://via.placeholder.com/150"}
            style={{ width: "150px", borderRadius: "50%" }}
          />
          <p>
            <strong>Name:</strong> {tenant.name}
          </p>
          <p>
            <strong>Details:</strong> {tenant.details}
          </p>
        </div>
      ),
      onOk() {},
    });
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
                  cover={
                    <img
                      alt={tenant.name}
                      src={tenant.image || "https://via.placeholder.com/150"}
                      onClick={() => handleImageClick(tenant)}
                      style={{ cursor: "pointer" }}
                    />
                  }
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
                rules={[
                  { required: true, message: "Please enter tenant's name!" },
                ]}
              >
                <Input prefix={<UserOutlined />} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="details"
                label="Details"
                rules={[
                  { required: true, message: "Please enter tenant's details!" },
                ]}
              >
                <Input.TextArea rows={4} />
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
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default TenantsList;
