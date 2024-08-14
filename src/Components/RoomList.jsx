import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Space,
  Modal,
  Form,
  Input,
  InputNumber,
  Upload,
  Popconfirm,
  Select,
  Tag,
  message,
  Row,
  Col
} from "antd";
import {
  UserOutlined,
  UploadOutlined,
  EditOutlined,
  DeleteOutlined,
  HomeOutlined,
  DollarOutlined,
  TeamOutlined,
  AppstoreAddOutlined,
} from "@ant-design/icons";
import {
  fetchRooms,
  fetchTenants,
  addRoom,
  updateRoom,
  deleteRoom,
  checkRoomNumberExists,
} from "./apiservice";

const { Option } = Select;

const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  const [tenants, setTenants] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingRoom, setEditingRoom] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    Promise.all([fetchRooms(), fetchTenants()])
      .then(([roomResponse, tenantResponse]) => {
        const tenantCountByRoom = tenantResponse.reduce((acc, tenant) => {
          if (tenant.roomNumber) {
            acc[tenant.roomNumber] = (acc[tenant.roomNumber] || 0) + 1;
          }
          return acc;
        }, {});

        const updatedRooms = roomResponse.map((room) => ({
          ...room,
          tenants: tenantCountByRoom[room.roomNumber] || 0,
          status: (tenantCountByRoom[room.roomNumber] || 0) >= room.sharing ? 'Occupied' : 'Vacant',
        }));

        setRooms(updatedRooms);
        setTenants(tenantResponse);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const showModal = (room = null) => {
    setEditingRoom(room);
    setIsModalVisible(true);
    if (room) {
      form.setFieldsValue(room);
      setImagePreview(room.imageUrl || ''); // Set preview URL for editing
    } else {
      form.resetFields();
      form.setFieldsValue({ status: 'Vacant' });
      setImagePreview(''); // Clear preview for adding new room
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setImagePreview(''); // Clear preview on modal close
  };

  const handleAddEditRoom = () => {
    form.validateFields().then(async (values) => {
      try {
        if (!editingRoom) {
          // Check if room number already exists before adding
          const exists = await checkRoomNumberExists(values.roomNumber);
          if (exists) {
            message.error('Room number already exists!');
            return;
          }
        }

        const updatedValues = {
          ...values,
          status: 'Vacant',
        };

        if (editingRoom) {
          updatedValues.status = (values.tenants || 0) >= values.sharing ? 'Occupied' : 'Vacant';
          await updateRoom(editingRoom.id, updatedValues);
        } else {
          await addRoom(updatedValues);
        }

        const [roomResponse, tenantResponse] = await Promise.all([fetchRooms(), fetchTenants()]);
        const tenantCountByRoom = tenantResponse.reduce((acc, tenant) => {
          if (tenant.roomNumber) {
            acc[tenant.roomNumber] = (acc[tenant.roomNumber] || 0) + 1;
          }
          return acc;
        }, {});

        const updatedRooms = roomResponse.map((room) => ({
          ...room,
          tenants: tenantCountByRoom[room.roomNumber] || 0,
          status: (tenantCountByRoom[room.roomNumber] || 0) >= room.sharing ? 'Occupied' : 'Vacant',
        }));

        setRooms(updatedRooms);
        setTenants(tenantResponse);
        setIsModalVisible(false);
        setImagePreview('');
      } catch (error) {
        console.error("Error saving room:", error);
      }
    });
  };

  const handleDelete = (id) => {
    deleteRoom(id)
      .then(async () => {
        try {
          const [roomResponse, tenantResponse] = await Promise.all([fetchRooms(), fetchTenants()]);
          const tenantCountByRoom = tenantResponse.reduce((acc, tenant) => {
            if (tenant.roomNumber) {
              acc[tenant.roomNumber] = (acc[tenant.roomNumber] || 0) + 1;
            }
            return acc;
          }, {});

          const updatedRooms = roomResponse.map((room) => ({
            ...room,
            tenants: tenantCountByRoom[room.roomNumber] || 0,
            status: (tenantCountByRoom[room.roomNumber] || 0) >= room.sharing ? 'Occupied' : 'Vacant',
          }));

          setRooms(updatedRooms);
          setTenants(tenantResponse);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      })
      .catch((error) => console.error("Error deleting room:", error));
  };

  const columns = [
    {
      title: "Room Number",
      dataIndex: "roomNumber",
      key: "roomNumber",
      render: (text) => (
        <Space>
          <HomeOutlined style={{ color: "#1890ff" }} />
          {text}
        </Space>
      ),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (text) => (
        <Space>
          <UserOutlined style={{ color: "#52c41a" }} />
          {text}
        </Space>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) => (
        <Tag color={text === 'Occupied' ? 'red' : 'green'}>
          {text}
        </Tag>
      ),
    },
    {
      title: "Rent",
      dataIndex: "rent",
      key: "rent",
      render: (text) => (
        <Space>
          <DollarOutlined style={{ color: "#fa8c16" }} />
          {text}
        </Space>
      ),
    },
    {
      title: "Sharing",
      dataIndex: "sharing",
      key: "sharing",
      render: (text) => (
        <Space>
          <TeamOutlined style={{ color: "#eb2f96" }} />
          {text}
        </Space>
      ),
    },
    {
      title: "Tenants",
      dataIndex: "tenants",
      key: "tenants",
      render: (text) => (
        <Space>
          <TeamOutlined style={{ color: "#eb2f96" }} />
          {text}
        </Space>
      ),
    },
    {
      title: "Image",
      dataIndex: "imageUrl",
      key: "imageUrl",
      render: (text) => (
        text ? (
          <img
            src={text}
            alt="room"
            style={{ width: 100, height: 100, objectFit: 'cover' }}
          />
        ) : null
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined style={{ color: "#1890ff" }} />}
            onClick={() => showModal(record)}
          />
          <Popconfirm
            title="Are you sure you want to delete this room?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              icon={<DeleteOutlined style={{ color: "#ff4d4f" }} />}
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ marginTop: "75px" }}>
      <Row justify="end" style={{ marginBottom: 16 }}>
        <Col>
          <Button
            style={{ margin: "5px" }}
            type="primary"
            onClick={() => showModal()}
            icon={<AppstoreAddOutlined />}
          >
            Add Room
          </Button>
        </Col>
      </Row>

      <Table
        columns={columns}
        dataSource={rooms}
        scroll={{ x: 1200 }}
      />

      <Modal
        title={editingRoom ? "Edit Room" : "Add Room"}
        visible={isModalVisible}
        onCancel={handleCancel}
        onOk={handleAddEditRoom}
        okText={editingRoom ? "Update" : "Add"}
        cancelText="Cancel"
        width={800}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={editingRoom}
          hideRequiredMark
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="roomNumber"
                label="Room Number"
                rules={[{ required: true, message: "Please enter room number" }]}
              >
                <Input placeholder="Room Number" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="type"
                label="Type"
                rules={[{ required: true, message: "Please select room type" }]}
              >
                <Select placeholder="Select Type">
                  <Option value="Single">Single</Option>
                  <Option value="Double">Double</Option>
                  <Option value="Triple">Triple</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="rent"
                label="Rent"
                rules={[{ required: true, message: "Please enter rent amount" }]}
              >
                <InputNumber
                  min={0}
                  style={{ width: "100%" }}
                  placeholder="Rent"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="sharing"
                label="Sharing"
                rules={[{ required: true, message: "Please enter sharing capacity" }]}
              >
                <InputNumber
                  min={1}
                  style={{ width: "100%" }}
                  placeholder="Sharing"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="status"
                label="Status"
              >
                <Select disabled>
                  <Option value="Vacant">Vacant</Option>
                  <Option value="Occupied">Occupied</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="imageUrl"
                label="Room Image"
              >
                <Upload
                  listType="picture-card"
                  showUploadList={false}
                  beforeUpload={(file) => {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setImagePreview(reader.result);
                      form.setFieldsValue({ imageUrl: reader.result });
                    };
                    reader.readAsDataURL(file);
                    return false; // Prevent automatic upload
                  }}
                >
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Room"
                      style={{ width: 100, height: 100, objectFit: 'cover' }}
                    />
                  ) : (
                    <div>
                      <UploadOutlined />
                      <div className="ant-upload-text">Upload Image</div>
                    </div>
                  )}
                </Upload>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default RoomList;
