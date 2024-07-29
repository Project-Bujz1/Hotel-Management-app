import React, { useState } from "react";
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

const { Option } = Select;

const initialRooms = [
  {
    key: "1",
    roomNumber: "101",
    type: "AC",
    status: "Vacant",
    rent: "5000",
    sharing: "1",
    tenants: 0,
    imageUrl: "",
  },
  {
    key: "2",
    roomNumber: "102",
    type: "Non-AC",
    status: "Occupied",
    rent: "8000",
    sharing: "2",
    tenants: 2,
    imageUrl: "",
  },
];

const RoomList = () => {
  const [rooms, setRooms] = useState(initialRooms);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingRoom, setEditingRoom] = useState(null);

  const showModal = (room = null) => {
    setEditingRoom(room);
    setIsModalVisible(true);
    if (room) {
      form.setFieldsValue(room);
    } else {
      form.resetFields();
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleAddEditRoom = () => {
    form.validateFields().then((values) => {
      const newRooms = editingRoom
        ? rooms.map((room) =>
            room.key === editingRoom.key ? { ...editingRoom, ...values } : room
          )
        : [...rooms, { key: Date.now().toString(), ...values }];
      setRooms(newRooms);
      setIsModalVisible(false);
    });
  };

  const handleDelete = (key) => {
    setRooms(rooms.filter((room) => room.key !== key));
  };

  const columns = [
    {
      title: "Room Number",
      dataIndex: "roomNumber",
      key: "roomNumber",
      render: (text) => (
        <Space>
          <HomeOutlined />
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
          <UserOutlined />
          {text}
        </Space>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) => (
        <Space>
          <EditOutlined />
          {text}
        </Space>
      ),
    },
    {
      title: "Rent",
      dataIndex: "rent",
      key: "rent",
      render: (text) => (
        <Space>
          <DollarOutlined />
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
          <TeamOutlined />
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
          <TeamOutlined />
          {text}
        </Space>
      ),
    },
    {
      title: "Image",
      dataIndex: "imageUrl",
      key: "imageUrl",
      render: (text) =>
        text && <img src={text} alt="room" style={{ width: 50, height: 50 }} />,
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => showModal(record)} />
          <Popconfirm
            title="Are you sure you want to delete this room?"
            onConfirm={() => handleDelete(record.key)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} />
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
            <Input prefix={<HomeOutlined />} />
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
            <Select prefix={<UserOutlined />}>
              <Option value="AC">AC</Option>
              <Option value="Non-AC">Non-AC</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            rules={[
              { required: true, message: "Please select the room status!" },
            ]}
            style={{ display: "inline-block", width: "calc(50% - 8px)" }}
          >
            <Select prefix={<EditOutlined />}>
              <Option value="Vacant">Vacant</Option>
              <Option value="Occupied">Occupied</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="rent"
            label="Rent"
            rules={[
              { required: true, message: "Please input the rent amount!" },
            ]}
            style={{
              display: "inline-block",
              width: "calc(50% - 8px)",
              margin: "0 8px",
            }}
          >
            <InputNumber
              prefix={<DollarOutlined />}
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item
            name="sharing"
            label="Sharing"
            rules={[
              { required: true, message: "Please select the sharing details!" },
            ]}
            style={{ display: "inline-block", width: "calc(50% - 8px)" }}
          >
            <Select prefix={<TeamOutlined />}>
              <Option value="1">1</Option>
              <Option value="2">2</Option>
              <Option value="3">3</Option>
              <Option value="4">4</Option>
              <Option value="Multi">Multi</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="tenants"
            label="Number of Tenants"
            rules={[
              {
                required: true,
                message: "Please input the number of tenants!",
              },
            ]}
            style={{
              display: "inline-block",
              width: "calc(50% - 8px)",
              margin: "0 8px",
            }}
          >
            <InputNumber prefix={<TeamOutlined />} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="imageUrl"
            label="Image"
            style={{ display: "inline-block", width: "calc(50% - 8px)" }}
          >
            <Upload
              listType="picture"
              beforeUpload={(file) => {
                const reader = new FileReader();
                reader.onload = () => {
                  form.setFieldsValue({ imageUrl: reader.result });
                };
                reader.readAsDataURL(file);
                return false;
              }}
            >
              <Button icon={<PictureOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default RoomList;
