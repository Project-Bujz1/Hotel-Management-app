// import React, { useState } from 'react';
// import { Layout, Menu, Table, Form, Input, Button, Upload, Modal, Tabs, message } from 'antd';
// import { PlusOutlined, InboxOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

// const { Header, Content } = Layout;
// const { TabPane } = Tabs;

// const ParcelManagement = () => {
//   const [parcels, setParcels] = useState([]);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [form] = Form.useForm();

//   const columns = [
//     {
//       title: 'Parcel ID',
//       dataIndex: 'id',
//       key: 'id',
//     },
//     {
//       title: 'Tenant Name',
//       dataIndex: 'tenantName',
//       key: 'tenantName',
//     },
//     {
//       title: 'Room Number',
//       dataIndex: 'roomNumber',
//       key: 'roomNumber',
//     },
//     {
//       title: 'Date Received',
//       dataIndex: 'dateReceived',
//       key: 'dateReceived',
//     },
//     {
//       title: 'Status',
//       dataIndex: 'status',
//       key: 'status',
//     },
//     {
//       title: 'Actions',
//       key: 'actions',
//       render: (text, record) => (
//         <span>
//           <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
//           <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)} />
//         </span>
//       ),
//     },
//   ];

//   const handleAdd = () => {
//     setIsModalVisible(true);
//   };

//   const handleEdit = (record) => {
//     form.setFieldsValue(record);
//     setIsModalVisible(true);
//   };

//   const handleDelete = (id) => {
//     setParcels(parcels.filter(parcel => parcel.id !== id));
//     message.success('Parcel deleted successfully');
//   };

//   const handleModalOk = () => {
//     form.validateFields().then(values => {
//       const newParcel = {
//         ...values,
//         id: values.id || Date.now().toString(),
//         status: values.tenantName ? 'Claimed' : 'Unclaimed',
//         dateReceived: new Date().toLocaleDateString(),
//       };

//       setParcels([...parcels, newParcel]);
//       setIsModalVisible(false);
//       form.resetFields();
//       message.success('Parcel added successfully');
//     });
//   };

//   const handleModalCancel = () => {
//     setIsModalVisible(false);
//     form.resetFields();
//   };

//   return (
//     <Layout className="layout" style={{ minHeight: '100vh' }}>
//       <Header>
//         <div className="logo" style={{marginTop : "75px"}}/>
//       </Header>
//       <Content style={{ padding: '0 50px' }}>
//         <div className="site-layout-content" style={{ margin: '25px 0' }}>
//           <h1>Parcel Management System</h1>
//           <Tabs defaultActiveKey="1">
//             <TabPane tab="All Parcels" key="1">
//               <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd} style={{ marginBottom: 16 }}>
//                 Add New Parcel
//               </Button>
//               <Table columns={columns} dataSource={parcels} />
//             </TabPane>
//             <TabPane tab="Claimed Parcels" key="2">
//               <Table columns={columns} dataSource={parcels.filter(p => p.status === 'Claimed')} />
//             </TabPane>
//             <TabPane tab="Unclaimed Parcels" key="3">
//               <Table columns={columns} dataSource={parcels.filter(p => p.status === 'Unclaimed')} />
//             </TabPane>
//           </Tabs>
//         </div>
//       </Content>

//       <Modal
//         title="Add/Edit Parcel"
//         visible={isModalVisible}
//         onOk={handleModalOk}
//         onCancel={handleModalCancel}
//       >
//         <Form form={form} layout="vertical">
//           <Form.Item name="tenantName" label="Tenant Name">
//             <Input />
//           </Form.Item>
//           <Form.Item name="roomNumber" label="Room Number">
//             <Input />
//           </Form.Item>
//           <Form.Item name="description" label="Description">
//             <Input.TextArea />
//           </Form.Item>
//           <Form.Item name="image" label="Parcel Image">
//             <Upload.Dragger>
//               <p className="ant-upload-drag-icon">
//                 <InboxOutlined />
//               </p>
//               <p className="ant-upload-text">Click or drag file to this area to upload</p>
//             </Upload.Dragger>
//           </Form.Item>
//         </Form>
//       </Modal>
//     </Layout>
//   );
// };

// export default ParcelManagement;

import React, { useState, useEffect } from 'react';
import { Layout, Menu, Table, Form, Input, Button, Upload, Modal, Tabs, message } from 'antd';
import { PlusOutlined, InboxOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Header, Content } = Layout;
const { TabPane } = Tabs;

const API_BASE_URL = 'https://smart-hostel-management-json-server.onrender.com';

const ParcelManagement = () => {
  const [parcels, setParcels] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingParcel, setEditingParcel] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchParcels();
  }, []);

  const fetchParcels = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/parcels`);
      setParcels(response.data);
    } catch (error) {
      message.error('Failed to fetch parcels');
    }
  };

  const columns = [
    {
      title: 'Parcel ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Tenant Name',
      dataIndex: 'tenantName',
      key: 'tenantName',
    },
    {
      title: 'Room Number',
      dataIndex: 'roomNumber',
      key: 'roomNumber',
    },
    {
      title: 'Date Received',
      dataIndex: 'dateReceived',
      key: 'dateReceived',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <span>
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)} />
        </span>
      ),
    },
  ];

  const handleAdd = () => {
    setEditingParcel(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (record) => {
    setEditingParcel(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/parcels/${id}`);
      message.success('Parcel deleted successfully');
      fetchParcels();
    } catch (error) {
      message.error('Failed to delete parcel');
    }
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      const parcelData = {
        ...values,
        status: values.tenantName ? 'Claimed' : 'Unclaimed',
        dateReceived: new Date().toLocaleDateString(),
      };

      if (editingParcel) {
        await axios.put(`${API_BASE_URL}/parcels/${editingParcel.id}`, parcelData);
        message.success('Parcel updated successfully');
      } else {
        await axios.post(`${API_BASE_URL}/parcels`, parcelData);
        message.success('Parcel added successfully');
      }

      setIsModalVisible(false);
      form.resetFields();
      fetchParcels();
    } catch (error) {
      message.error('Failed to save parcel');
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <Layout className="layout" style={{ minHeight: '100vh' }}>
      <Header>
        <div className="logo" />
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <div className="site-layout-content" style={{ margin: '16px 0' }}>
          <h1>Parcel Management System</h1>
          <Tabs defaultActiveKey="1">
            <TabPane tab="All Parcels" key="1">
              <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd} style={{ marginBottom: 16 }}>
                Add New Parcel
              </Button>
              <Table columns={columns} dataSource={parcels} />
            </TabPane>
            <TabPane tab="Claimed Parcels" key="2">
              <Table columns={columns} dataSource={parcels.filter(p => p.status === 'Claimed')} />
            </TabPane>
            <TabPane tab="Unclaimed Parcels" key="3">
              <Table columns={columns} dataSource={parcels.filter(p => p.status === 'Unclaimed')} />
            </TabPane>
          </Tabs>
        </div>
      </Content>

      <Modal
        title={editingParcel ? "Edit Parcel" : "Add New Parcel"}
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="tenantName" label="Tenant Name">
            <Input />
          </Form.Item>
          <Form.Item name="roomNumber" label="Room Number">
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="image" label="Parcel Image">
            <Upload.Dragger>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
            </Upload.Dragger>
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default ParcelManagement;