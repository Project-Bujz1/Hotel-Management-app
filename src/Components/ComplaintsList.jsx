import React, { useState, useEffect } from "react";
import {
  List,
  Avatar,
  Button,
  Modal,
  Form,
  Input,
  Upload,
  message,
  Select,
  Tooltip,
  Popconfirm,
  Row,
  Col,
  Tag,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  CheckOutlined,
  PlusOutlined,
  PictureOutlined,
} from "@ant-design/icons";
import "./ComplaintsList.css";

const { Option } = Select;

export const statusColors = {
  Pending: "red",
  "In Progress": "blue",
  Completed: "green",
};

const ComplaintsList = () => {
  const [complaints, setComplaints] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingComplaint, setEditingComplaint] = useState(null);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = () => {
    fetch("http://localhost:5000/complaints")
      .then((response) => response.json())
      .then((data) => {
        // Filter out complaints related to deleted rooms
        fetch("http://localhost:5000/rooms")
          .then((response) => response.json())
          .then((rooms) => {
            const roomNumbers = rooms.map((room) => room.roomNumber);
            setComplaints(data.filter((complaint) => roomNumbers.includes(complaint.roomNumber)));
          })
          .catch((error) => {
            console.error("Error fetching rooms:", error);
            message.error("Failed to load rooms");
          });
      })
      .catch((error) => {
        console.error("Error fetching complaints:", error);
        message.error("Failed to load complaints");
      });
  };

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
      const method = editingComplaint ? "PUT" : "POST";
      const url = editingComplaint
        ? `http://localhost:5000/complaints/${editingComplaint.id}`
        : "http://localhost:5000/complaints";

      fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editingComplaint ? { ...editingComplaint, ...values } : { id: Date.now().toString(), ...values }),
      })
        .then((response) => response.json())
        .then(() => {
          fetchComplaints(); // Refresh complaints list after adding/editing
          setIsModalVisible(false);
          message.success("Complaint saved successfully");
        })
        .catch((error) => {
          console.error("Error saving complaint:", error);
          message.error("Failed to save complaint");
        });
    });
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/complaints/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        fetchComplaints(); // Refresh complaints list after deleting
        message.success("Complaint deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting complaint:", error);
        message.error("Failed to delete complaint");
      });
  };

  const handleMarkAsCompleted = (id) => {
    fetch(`http://localhost:5000/complaints/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: "Completed" }),
    })
      .then(() => {
        fetchComplaints(); // Refresh complaints list after marking as completed
        message.success("Complaint marked as completed");
      })
      .catch((error) => {
        console.error("Error marking complaint as completed:", error);
        message.error("Failed to mark complaint as completed");
      });
  };

  return (
    <div className="complaints-list" style={{ marginTop: "75px" }}>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => showModal()}
        style={{ marginBottom: 16, marginLeft: 1350 }}
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
                  onConfirm={() => handleDelete(complaint.id)}
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
                  onClick={() => handleMarkAsCompleted(complaint.id)}
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
                      style={{ width: "100px", height: "100px", marginTop: 16 }}
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
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="roomNumber"
                label="Room Number"
                rules={[
                  { required: true, message: "Please input the room number!" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="complaint"
                label="Complaint"
                rules={[
                  { required: true, message: "Please input the complaint!" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="reportedDate"
                label="Reported Date"
                rules={[
                  {
                    required: true,
                    message: "Please input the reported date!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
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
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="status"
                label="Status"
                rules={[
                  { required: true, message: "Please select the status!" },
                ]}
              >
                <Select>
                  <Option value="Pending">Pending</Option>
                  <Option value="In Progress">In Progress</Option>
                  <Option value="Completed">Completed</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
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
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default ComplaintsList;
