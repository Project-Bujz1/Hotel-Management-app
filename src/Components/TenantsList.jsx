// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Card, Modal, Button, Row, Col, Typography, Form, Input, Upload, Select, DatePicker, Popconfirm } from "antd";
// import { EditOutlined, DeleteOutlined, UserOutlined, PictureOutlined, ExclamationCircleOutlined, IdcardOutlined, BankOutlined } from "@ant-design/icons";
// import moment from 'moment';

// const { Text } = Typography;
// const { Option } = Select;

// const apiUrl = "http://localhost:5000"; // URL for json-server

// const TenantsList = () => {
//   const [tenants, setTenants] = useState([]);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [currentTenant, setCurrentTenant] = useState(null);
//   const [form] = Form.useForm();

//   useEffect(() => {
//     // Fetch tenants from API
//     axios.get(`${apiUrl}/tenants`)
//       .then(response => {
//         setTenants(response.data);
//       })
//       .catch(error => {
//         console.error("Error fetching tenants:", error);
//       });
//   }, []);

//   const showModal = (tenant) => {
//     setCurrentTenant(tenant);
//     setIsModalVisible(true);
//     if (tenant) {
//       form.setFieldsValue({
//         name: tenant.name,
//         email: tenant.email,
//         phoneNumber: tenant.phoneNumber,
//         emergencyContact: tenant.emergencyContact,
//         idNumber: tenant.idNumber,
//         currentAddress: tenant.currentAddress,
//         permanentAddress: tenant.permanentAddress,
//         leaseStartDate: moment(tenant.leaseStartDate),
//         leaseEndDate: moment(tenant.leaseEndDate),
//         monthlyRent: tenant.monthlyRent,
//         paymentMethod: tenant.paymentMethod,
//         securityDeposit: tenant.securityDeposit,
//         occupation: tenant.occupation,
//         employerName: tenant.employerName,
//         employerContact: tenant.employerContact,
//         nationality: tenant.nationality,
//         medicalConditions: tenant.medicalConditions,
//         image: tenant.image
//       });
//     } else {
//       form.resetFields();
//     }
//   };

//   const handleCancel = () => {
//     setIsModalVisible(false);
//   };

//   const handleAddEditTenant = () => {
//     form.validateFields().then((values) => {
//       const tenantData = {
//         ...values,
//         leaseStartDate: values.leaseStartDate.format('YYYY-MM-DD'),
//         leaseEndDate: values.leaseEndDate.format('YYYY-MM-DD')
//       };

//       if (currentTenant) {
//         // Update tenant
//         axios.put(`${apiUrl}/tenants/${currentTenant.id}`, tenantData)
//           .then(() => {
//             setTenants(tenants.map(t => t.id === currentTenant.id ? tenantData : t));
//             setIsModalVisible(false);
//           })
//           .catch(error => {
//             console.error("Error updating tenant:", error);
//           });
//       } else {
//         // Add new tenant
//         axios.post(`${apiUrl}/tenants`, tenantData)
//           .then(response => {
//             setTenants([...tenants, response.data]);
//             setIsModalVisible(false);
//           })
//           .catch(error => {
//             console.error("Error adding tenant:", error);
//           });
//       }
//     });
//   };

//   const handleDeleteTenant = (tenantId) => {
//     axios.delete(`${apiUrl}/tenants/${tenantId}`)
//       .then(() => {
//         setTenants(tenants.filter(t => t.id !== tenantId));
//       })
//       .catch(error => {
//         console.error("Error deleting tenant:", error);
//       });
//   };

//   return (
//     <div style={{ marginTop: "75px" }}>
//       <Row gutter={16}>
//         {tenants.map((tenant) => (
//           <Col key={tenant.id} xs={24} sm={12} md={8} lg={6} xl={4} style={{ marginBottom: 16 }}>
//             <Card
//               hoverable
//               cover={<img alt={tenant.name} src={tenant.image || '/default-avatar.png'} />}
//               actions={[
//                 <EditOutlined key="edit" onClick={() => showModal(tenant)} />,
//                 <Popconfirm
//                   title="Are you sure to delete this tenant?"
//                   onConfirm={() => handleDeleteTenant(tenant.id)}
//                   okText="Yes"
//                   cancelText="No"
//                   icon={<ExclamationCircleOutlined style={{ color: "red" }} />}
//                 >
//                   <DeleteOutlined key="delete" />
//                 </Popconfirm>,
//               ]}
//             >
//               <Card.Meta title={tenant.name} description={tenant.email} />
//             </Card>
//           </Col>
//         ))}
//         <Col xs={24} sm={12} md={8} lg={6} xl={4} style={{ marginBottom: 16 }}>
//           <Card
//             hoverable
//             onClick={() => showModal(null)}
//             style={{ textAlign: "center", height: "100%" }}
//           >
//             <Button
//               type="primary"
//               shape="round"
//               icon={<UserOutlined />}
//               size="large"
//             >
//               Add Tenant
//             </Button>
//           </Card>
//         </Col>
//       </Row>

//       <Modal
//         title={currentTenant ? "Edit Tenant" : "Add Tenant"}
//         visible={isModalVisible}
//         onCancel={handleCancel}
//         onOk={handleAddEditTenant}
//         destroyOnClose
//       >
//         <Form form={form} layout="vertical">
//           <Form.Item name="name" label="Name" rules={[{ required: true, message: "Please enter tenant's name!" }]}>
//             <Input prefix={<UserOutlined />} />
//           </Form.Item>
//           <Form.Item name="image" label="Image">
//             <Upload
//               listType="picture"
//               beforeUpload={(file) => {
//                 const reader = new FileReader();
//                 reader.onload = () => {
//                   form.setFieldsValue({ image: reader.result });
//                 };
//                 reader.readAsDataURL(file);
//                 return false;
//               }}
//             >
//               <Button icon={<PictureOutlined />}>Upload Image</Button>
//             </Upload>
//           </Form.Item>
//           <Form.Item name="email" label="Email Address" rules={[{ required: true, type: 'email', message: "Please enter a valid email address!" }]}>
//             <Input />
//           </Form.Item>
//           <Form.Item name="phoneNumber" label="Phone Number" rules={[{ required: true, message: "Please enter the tenant's phone number!" }]}>
//             <Input />
//           </Form.Item>
//           <Form.Item name="emergencyContact" label="Emergency Contact" rules={[{ required: true, message: "Please enter the emergency contact name and phone number!" }]}>
//             <Input />
//           </Form.Item>
//           <Form.Item name="idNumber" label="Government ID Number" rules={[{ required: true, message: "Please enter the government ID number!" }]}>
//             <Input prefix={<IdcardOutlined />} />
//           </Form.Item>
//           <Form.Item name="currentAddress" label="Current Address" rules={[{ required: true, message: "Please enter the current address!" }]}>
//             <Input />
//           </Form.Item>
//           <Form.Item name="permanentAddress" label="Permanent Address" rules={[{ required: true, message: "Please enter the permanent address!" }]}>
//             <Input />
//           </Form.Item>
//           <Form.Item name="leaseStartDate" label="Lease Start Date" rules={[{ required: true, message: "Please select the lease start date!" }]}>
//             <DatePicker format="YYYY-MM-DD" />
//           </Form.Item>
//           <Form.Item name="leaseEndDate" label="Lease End Date" rules={[{ required: true, message: "Please select the lease end date!" }]}>
//             <DatePicker format="YYYY-MM-DD" />
//           </Form.Item>
//           <Form.Item name="monthlyRent" label="Monthly Rent" rules={[{ required: true, message: "Please enter the monthly rent amount!" }]}>
//             <Input prefix={<BankOutlined />} />
//           </Form.Item>
//           <Form.Item name="paymentMethod" label="Payment Method" rules={[{ required: true, message: "Please select the payment method!" }]}>
//             <Select>
//               <Option value="cash">Cash</Option>
//               <Option value="bank_transfer">Bank Transfer</Option>
//               <Option value="credit_card">Credit Card</Option>
//               <Option value="digital_wallet">Digital Wallet</Option>
//             </Select>
//           </Form.Item>
//           <Form.Item name="securityDeposit" label="Security Deposit" rules={[{ required: true, message: "Please enter the security deposit amount!" }]}>
//             <Input prefix={<BankOutlined />} />
//           </Form.Item>
//           <Form.Item name="occupation" label="Occupation" rules={[{ required: true, message: "Please enter the tenant's occupation!" }]}>
//             <Input />
//           </Form.Item>
//           <Form.Item name="employerName" label="Employer Name">
//             <Input />
//           </Form.Item>
//           <Form.Item name="employerContact" label="Employer Contact">
//             <Input />
//           </Form.Item>
//           <Form.Item name="nationality" label="Nationality" rules={[{ required: true, message: "Please enter the tenant's nationality!" }]}>
//             <Input />
//           </Form.Item>
//           <Form.Item name="medicalConditions" label="Medical Conditions">
//             <Input.TextArea />
//           </Form.Item>
//         </Form>
//       </Modal>
//     </div>
//   );
// };

// export default TenantsList;
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
  // Sample data based on db.json
  const [rooms, setRooms] = useState([
    {
      id: "b469",
      roomNumber: "201",
      type: "Non-AC",
      status: "Occupied",
      rent: 1,
      sharing: "2",
      tenants: [
        {
          id: 1,
          name: "John Doe",
          image: "https://via.placeholder.com/150",
          email: "john.doe@example.com",
          phoneNumber: "1234567890",
          emergencyContact: "Jane Doe - 0987654321",
          idNumber: "A1234567",
          currentAddress: "123 Main St",
          permanentAddress: "456 Elm St",
          leaseStartDate: moment("2024-01-01"),
          leaseEndDate: moment("2024-12-31"),
          monthlyRent: 500,
          paymentMethod: "cash",
          securityDeposit: 1000,
          occupation: "Engineer",
          employerName: "Tech Corp",
          employerContact: "0987654321",
          nationality: "American",
          medicalConditions: "None",
        },
      ],
    },
    {
      id: "2beb",
      roomNumber: "206",
      type: "Non-AC",
      status: "Occupied",
      rent: 2,
      sharing: "2",
      tenants: [],
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
            {room.tenants.length > 0 ? (
              room.tenants.map((tenant) => (
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
              ))
            ) : (
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
            )}
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
                rules={[{ required: true, message: "Please enter the monthly rent!" }]}
              >
                <Input type="number" prefix={<BankOutlined />} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="paymentMethod"
                label="Payment Method"
                rules={[{ required: true, message: "Please select the payment method!" }]}
              >
                <Select>
                  <Option value="cash">Cash</Option>
                  <Option value="bank">Bank Transfer</Option>
                  <Option value="online">Online Payment</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="securityDeposit"
                label="Security Deposit"
                rules={[{ required: true, message: "Please enter the security deposit amount!" }]}
              >
                <Input type="number" prefix={<BankOutlined />} />
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
                rules={[{ required: true, message: "Please enter the employer's contact number!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="nationality"
                label="Nationality"
                rules={[{ required: true, message: "Please enter the nationality!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="medicalConditions"
                label="Medical Conditions"
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default TenantsList;
