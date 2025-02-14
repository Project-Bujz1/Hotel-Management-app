// import React from 'react';
// import { Table, Button, Space } from 'antd';

// const columns = [
//   {
//     title: 'Room Number',
//     dataIndex: 'roomNumber',
//     key: 'roomNumber',
//   },
//   {
//     title: 'Complaint',
//     dataIndex: 'complaint',
//     key: 'complaint',
//   },
//   {
//     title: 'Status',
//     dataIndex: 'status',
//     key: 'status',
//   },
//   {
//     title: 'Action',
//     key: 'action',
//     render: (text, record) => (
//       <Space size="middle">
//         <Button onClick={() => handleResolve(record.key)}>Resolve</Button>
//         <Button onClick={() => handleDelete(record.key)}>Delete</Button>
//       </Space>
//     ),
//   },
// ];

// const data = [
//   {
//     key: '1',
//     roomNumber: '101',
//     complaint: 'Leaking tap',
//     status: 'Pending',
//   },
//   {
//     key: '2',
//     roomNumber: '102',
//     complaint: 'Broken window',
//     status: 'Resolved',
//   },
// ];

// const ComplaintsList = () => {

//   const handleResolve = (key) => {
//     console.log(`Resolving complaint with key: ${key}`);
//     // Implement resolve logic here
//   };

//   const handleDelete = (key) => {
//     console.log(`Deleting complaint with key: ${key}`);
//     // Implement delete logic here
//   };

//   return (
//     <div>
//       <h2>Complaints Management</h2>
//       <Button type="primary" style={{ marginBottom: 16 }}>Add Complaint</Button>
//       <Table columns={columns} dataSource={data} />
//     </div>
//   );
// };

// export default ComplaintsList;
import React, { useState } from "react";
import {
  List,
  Avatar,
  Button,
  Modal,
  Form,
  Input,
  Upload,
  message,
  Space,
  Tag,
  Tooltip,
  Popconfirm,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  CheckOutlined,
  PlusOutlined,
  PictureOutlined,
} from "@ant-design/icons";
import "./ComplaintsList.css";

const initialComplaints = [
  {
    key: "1",
    roomNumber: "101",
    complaint: "Leaking faucet",
    status: "Pending",
    imageUrl: "",
    reportedDate: "2024-07-10",
    reportedBy: "John Doe",
  },
  {
    key: "2",
    roomNumber: "102",
    complaint: "Broken window",
    status: "In Progress",
    imageUrl: "",
    reportedDate: "2024-07-11",
    reportedBy: "Jane Smith",
  },
  {
    key: "3",
    roomNumber: "103",
    complaint: "No hot water",
    status: "Completed",
    imageUrl: "",
    reportedDate: "2024-07-12",
    reportedBy: "Bob Johnson",
  },
];

const statusColors = {
  Pending: "red",
  "In Progress": "blue",
  Completed: "green",
};

const ComplaintsList = () => {
  const [complaints, setComplaints] = useState(initialComplaints);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingComplaint, setEditingComplaint] = useState(null);

  const showModal = (complaint = null) => {
    setEditingComplaint(complaint);
    setIsModalVisible(true);
    if (complaint) {
      form.setFieldsValue(complaint);
    } else {
      form.resetFields();
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleAddEditComplaint = () => {
    form.validateFields().then((values) => {
      const newComplaints = editingComplaint
        ? complaints.map((complaint) =>
            complaint.key === editingComplaint.key
              ? { ...editingComplaint, ...values }
              : complaint
          )
        : [
            ...complaints,
            { key: Date.now().toString(), status: "Pending", ...values },
          ];
      setComplaints(newComplaints);
      setIsModalVisible(false);
      message.success("Complaint saved successfully");
    });
  };

  const handleDelete = (key) => {
    setComplaints(complaints.filter((complaint) => complaint.key !== key));
    message.success("Complaint deleted successfully");
  };

  const handleMarkAsCompleted = (key) => {
    setComplaints((prevData) =>
      prevData.map((complaint) =>
        complaint.key === key
          ? { ...complaint, status: "Completed" }
          : complaint
      )
    );
    message.success("Complaint marked as completed");
  };

  return (
    <div className="complaints-list" style={{ marginTop: "75px" }}>
      <h2>Complaints List</h2>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => showModal()}
        style={{ marginBottom: 16 }}
      >
        Add Complaint
      </Button>
      <List
        itemLayout="horizontal"
        dataSource={complaints}
        renderItem={(complaint) => (
          <List.Item
            actions={[
              <Tooltip title="Edit">
                <Button
                  icon={<EditOutlined />}
                  onClick={() => showModal(complaint)}
                />
              </Tooltip>,
              <Tooltip title="Delete">
                <Popconfirm
                  title="Are you sure you want to delete this complaint?"
                  onConfirm={() => handleDelete(complaint.key)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button danger icon={<DeleteOutlined />} />
                </Popconfirm>
              </Tooltip>,
              <Tooltip title="Mark as Completed">
                <Button
                  type="primary"
                  icon={<CheckOutlined />}
                  onClick={() => handleMarkAsCompleted(complaint.key)}
                />
              </Tooltip>,
            ]}
          >
            <List.Item.Meta
              avatar={
                <Avatar
                  style={{ backgroundColor: statusColors[complaint.status] }}
                  icon={<PictureOutlined />}
                />
              }
              title={`Room ${complaint.roomNumber}`}
              description={
                <div>
                  <p>
                    <strong>Complaint:</strong> {complaint.complaint}
                  </p>
                  <p>
                    <strong>Reported Date:</strong> {complaint.reportedDate}
                  </p>
                  <p>
                    <strong>Reported By:</strong> {complaint.reportedBy}
                  </p>
                  {complaint.imageUrl && (
                    <img
                      src={complaint.imageUrl}
                      alt="complaint"
                      style={{ width: "100%", marginTop: 16 }}
                    />
                  )}
                </div>
              }
            />
            <Tag color={statusColors[complaint.status]}>{complaint.status}</Tag>
          </List.Item>
        )}
      />
      <Modal
        title={editingComplaint ? "Edit Complaint" : "Add Complaint"}
        visible={isModalVisible}
        onCancel={handleCancel}
        onOk={handleAddEditComplaint}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="roomNumber"
            label="Room Number"
            rules={[
              { required: true, message: "Please input the room number!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="complaint"
            label="Complaint"
            rules={[{ required: true, message: "Please input the complaint!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="reportedDate"
            label="Reported Date"
            rules={[
              { required: true, message: "Please input the reported date!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="reportedBy"
            label="Reported By"
            rules={[
              {
                required: true,
                message: "Please input the name of the reporter!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="imageUrl" label="Image">
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
              maxCount={1}
            >
              <Button icon={<PictureOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ComplaintsList;
