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
} from "antd";
import {
  UploadOutlined,
  EditOutlined,
  DeleteOutlined,
  HomeOutlined,
  DollarOutlined,
  TeamOutlined,
  PictureOutlined,
  UserOutlined,
  AppstoreAddOutlined,
} from "@ant-design/icons";
import {
  fetchRooms,
  fetchTenants,
  addRoom,
  updateRoom,
  deleteRoom,
  checkRoomNumberExists, // New API function to check if the room number exists
} from "./apiservice";

const { Option } = Select;

const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  const [tenants, setTenants] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingRoom, setEditingRoom] = useState(null);

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
    } else {
      form.resetFields();
      form.setFieldsValue({ status: 'Vacant' });
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
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
          status: 'Vacant', // Force status to 'Vacant' when adding new rooms
        };

        if (editingRoom) {
          // For editing, calculate the status based on tenants
          updatedValues.status = (values.tenants || 0) >= values.sharing ? 'Occupied' : 'Vacant';
          await updateRoom(editingRoom.id, updatedValues);
        } else {
          await addRoom(updatedValues);
        }

        // Refetch data
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
      render: (text) =>
        text ? (
          <img
            src={text}
            alt="room"
            style={{ width: 100, height: 100, objectFit: 'cover' }}
          />
        ) : null,
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
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: 16,
          marginTop: "75px",
          marginRight: "20px"
        }}
      >
        <Button
          type="primary"
          onClick={() => showModal()}
          icon={<AppstoreAddOutlined />}
        >
          Add Room
        </Button>
      </div>

      <Table columns={columns} dataSource={rooms} />
      <Modal
        title={editingRoom ? "Edit Room" : "Add Room"}
        visible={isModalVisible}
        onCancel={handleCancel}
        onOk={handleAddEditRoom}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="roomNumber"
            label="Room Number"
            rules={[
              { required: true, message: "Please input the room number!" },
            ]}
            style={{ display: "inline-block", width: "calc(50% - 8px)" }}
          >
            <Input prefix={<HomeOutlined style={{ color: "#1890ff" }} />} />
          </Form.Item>
          <Form.Item
            name="type"
            label="Type"
            rules={[{ required: true, message: "Please select the room type!" }]}
            style={{
              display: "inline-block",
              width: "calc(50% - 8px)",
              margin: "0 8px",
            }}
          >
            <Select prefix={<UserOutlined style={{ color: "#52c41a" }} />}>
              <Option value="AC">A/C</Option>
              <Option value="Non-Ac">Non-A/C</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            style={{ display: "inline-block", width: "calc(50% - 8px)" }}
          >
            <Input disabled value="Vacant" />
          </Form.Item>
          <Form.Item
            name="rent"
            label="Rent"
            rules={[{ required: true, message: "Please input the rent amount!" }]}
            style={{ display: "inline-block", width: "calc(50% - 8px)" }}
          >
            <InputNumber
              prefix={<DollarOutlined style={{ color: "#fa8c16" }} />}
              min={0}
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item
            name="sharing"
            label="Sharing"
            rules={[{ required: true, message: "Please input the sharing details!" }]}
            style={{
              display: "inline-block",
              width: "calc(50% - 8px)",
              margin: "0 8px",
            }}
          >
            <InputNumber
              prefix={<TeamOutlined style={{ color: "#eb2f96" }} />}
              min={1}
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item
            name="imageUrl"
            label="Room Image"
            style={{ display: "inline-block", width: "calc(50% - 8px)" }}
          >
            <Upload
              beforeUpload={() => false}
              listType="picture"
              maxCount={1}
              accept=".jpg,.jpeg,.png"
            >
              <Button icon={<PictureOutlined />} >Upload</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default RoomList;
