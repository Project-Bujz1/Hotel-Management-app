// import React, { useState, useEffect } from "react";
// import {
//   Table,
//   Button,
//   Space,
//   Modal,
//   Form,
//   Input,
//   InputNumber,
//   Upload,
//   Popconfirm,
//   Select,
// } from "antd";
// import {
//   UploadOutlined,
//   EditOutlined,
//   DeleteOutlined,
//   HomeOutlined,
//   DollarOutlined,
//   TeamOutlined,
//   PictureOutlined,
//   UserOutlined,
//   AppstoreAddOutlined,
// } from "@ant-design/icons";
// import { fetchRooms, fetchTenants, addRoom, updateRoom, deleteRoom } from "./apiservice";

// const { Option } = Select;

// const RoomList = () => {
//   const [rooms, setRooms] = useState([]);
//   const [tenants, setTenants] = useState([]);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [form] = Form.useForm();
//   const [editingRoom, setEditingRoom] = useState(null);

//   useEffect(() => {
//     Promise.all([fetchRooms(), fetchTenants()])
//       .then(([roomResponse, tenantResponse]) => {
//         // Calculate tenant counts for each room
//         const tenantCountByRoom = tenantResponse.reduce((acc, tenant) => {
//           if (tenant.roomNumber) {
//             acc[tenant.roomNumber] = (acc[tenant.roomNumber] || 0) + 1;
//           }
//           return acc;
//         }, {});

//         // Update room data with tenant counts
//         const updatedRooms = roomResponse.map((room) => ({
//           ...room,
//           tenants: tenantCountByRoom[room.roomNumber] || 0,
//         }));

//         setRooms(updatedRooms);
//         setTenants(tenantResponse);
//       })
//       .catch((error) => console.error("Error fetching data:", error));
//   }, []);

//   const showModal = (room = null) => {
//     setEditingRoom(room);
//     setIsModalVisible(true);
//     if (room) {
//       form.setFieldsValue(room);
//     } else {
//       form.resetFields();
//     }
//   };

//   const handleCancel = () => {
//     setIsModalVisible(false);
//   };

//   const handleAddEditRoom = () => {
//     form.validateFields().then((values) => {
//       const apiCall = editingRoom
//         ? updateRoom(editingRoom.id, values)
//         : addRoom(values);

//       apiCall
//         .then(() => {
//           Promise.all([fetchRooms(), fetchTenants()])
//             .then(([roomResponse, tenantResponse]) => {
//               const tenantCountByRoom = tenantResponse.reduce((acc, tenant) => {
//                 if (tenant.roomNumber) {
//                   acc[tenant.roomNumber] = (acc[tenant.roomNumber] || 0) + 1;
//                 }
//                 return acc;
//               }, {});

//               const updatedRooms = roomResponse.map((room) => ({
//                 ...room,
//                 tenants: tenantCountByRoom[room.roomNumber] || 0,
//               }));

//               setRooms(updatedRooms);
//               setTenants(tenantResponse);
//             })
//             .catch((error) => console.error("Error fetching data:", error));
//           setIsModalVisible(false);
//         })
//         .catch((error) => console.error("Error saving room:", error));
//     });
//   };

//   const handleDelete = (id) => {
//     deleteRoom(id)
//       .then(() => {
//         Promise.all([fetchRooms(), fetchTenants()])
//           .then(([roomResponse, tenantResponse]) => {
//             const tenantCountByRoom = tenantResponse.reduce((acc, tenant) => {
//               if (tenant.roomNumber) {
//                 acc[tenant.roomNumber] = (acc[tenant.roomNumber] || 0) + 1;
//               }
//               return acc;
//             }, {});

//             const updatedRooms = roomResponse.map((room) => ({
//               ...room,
//               tenants: tenantCountByRoom[room.roomNumber] || 0,
//             }));

//             setRooms(updatedRooms);
//             setTenants(tenantResponse);
//           })
//           .catch((error) => console.error("Error fetching data:", error));
//       })
//       .catch((error) => console.error("Error deleting room:", error));
//   };

//   const columns = [
//     {
//       title: "Room Number",
//       dataIndex: "roomNumber",
//       key: "roomNumber",
//       render: (text) => (
//         <Space>
//           <HomeOutlined />
//           {text}
//         </Space>
//       ),
//     },
//     {
//       title: "Type",
//       dataIndex: "type",
//       key: "type",
//       render: (text) => (
//         <Space>
//           <UserOutlined />
//           {text}
//         </Space>
//       ),
//     },
//     {
//       title: "Status",
//       dataIndex: "status",
//       key: "status",
//       render: (text) => (
//         <Space>
//           <EditOutlined />
//           {text}
//         </Space>
//       ),
//     },
//     {
//       title: "Rent",
//       dataIndex: "rent",
//       key: "rent",
//       render: (text) => (
//         <Space>
//           <DollarOutlined />
//           {text}
//         </Space>
//       ),
//     },
//     {
//       title: "Sharing",
//       dataIndex: "sharing",
//       key: "sharing",
//       render: (text) => (
//         <Space>
//           <TeamOutlined />
//           {text}
//         </Space>
//       ),
//     },
//     {
//       title: "Tenants",
//       dataIndex: "tenants",
//       key: "tenants",
//       render: (text) => (
//         <Space>
//           <TeamOutlined />
//           {text}
//         </Space>
//       ),
//     },
//     {
//       title: "Image",
//       dataIndex: "imageUrl",
//       key: "imageUrl",
//       render: (text) =>
//         text ? <img src={text} alt="room" style={{ width: 50, height: 50 }} /> : null,
//     },
//     {
//       title: "Action",
//       key: "action",
//       render: (text, record) => (
//         <Space size="middle">
//           <Button icon={<EditOutlined />} onClick={() => showModal(record)} />
//           <Popconfirm
//             title="Are you sure you want to delete this room?"
//             onConfirm={() => handleDelete(record.id)}
//             okText="Yes"
//             cancelText="No"
//           >
//             <Button icon={<DeleteOutlined />} />
//           </Popconfirm>
//         </Space>
//       ),
//     },
//   ];

//   return (
//     <div>
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "flex-end",
//           marginBottom: 16,
//           marginTop: "75px",
//           marginRight: "20px"
//         }}
//       >
//         <Button
//           type="primary"
//           onClick={() => showModal()}
//           icon={<AppstoreAddOutlined />}
//         >
//           Add Room
//         </Button>
//       </div>

//       <Table columns={columns} dataSource={rooms} />
//       <Modal
//         title={editingRoom ? "Edit Room" : "Add Room"}
//         visible={isModalVisible}
//         onCancel={handleCancel}
//         onOk={handleAddEditRoom}
//       >
//         <Form form={form} layout="vertical">
//           <Form.Item
//             name="roomNumber"
//             label="Room Number"
//             rules={[
//               { required: true, message: "Please input the room number!" },
//             ]}
//             style={{ display: "inline-block", width: "calc(50% - 8px)" }}
//           >
//             <Input prefix={<HomeOutlined />} />
//           </Form.Item>
//           <Form.Item
//             name="type"
//             label="Type"
//             rules={[{ required: true, message: "Please select the room type!" }]}
//             style={{
//               display: "inline-block",
//               width: "calc(50% - 8px)",
//               margin: "0 8px",
//             }}
//           >
//             <Select prefix={<UserOutlined />}>
//               <Option value="AC">AC</Option>
//               <Option value="Non-AC">Non-AC</Option>
//             </Select>
//           </Form.Item>
//           <Form.Item
//             name="status"
//             label="Status"
//             rules={[
//               { required: true, message: "Please select the room status!" },
//             ]}
//             style={{ display: "inline-block", width: "calc(50% - 8px)" }}
//           >
//             <Select prefix={<EditOutlined />}>
//               <Option value="Vacant">Vacant</Option>
//               <Option value="Occupied">Occupied</Option>
//             </Select>
//           </Form.Item>
//           <Form.Item
//             name="rent"
//             label="Rent"
//             rules={[
//               { required: true, message: "Please input the rent amount!" },
//             ]}
//             style={{
//               display: "inline-block",
//               width: "calc(50% - 8px)",
//               margin: "0 8px",
//             }}
//           >
//             <InputNumber
//               prefix={<DollarOutlined />}
//               style={{ width: "100%" }}
//             />
//           </Form.Item>
//           <Form.Item
//             name="sharing"
//             label="Sharing"
//             rules={[
//               { required: true, message: "Please input the number of sharing!" },
//             ]}
//             style={{ display: "inline-block", width: "calc(50% - 8px)" }}
//           >
//             <InputNumber
//               prefix={<TeamOutlined />}
//               style={{ width: "100%" }}
//             />
//           </Form.Item>
//           <Form.Item
//             name="imageUrl"
//             label="Image"
//             style={{ display: "inline-block", width: "calc(50% - 8px)" }}
//           >
//             <Upload
//               listType="picture"
//               beforeUpload={(file) => {
//                 const reader = new FileReader();
//                 reader.onload = () => {
//                   form.setFieldsValue({ imageUrl: reader.result });
//                 };
//                 reader.readAsDataURL(file);
//                 return false;
//               }}
//             >
//               <Button icon={<PictureOutlined />}>Upload</Button>
//             </Upload>
//           </Form.Item>
//         </Form>
//       </Modal>
//     </div>
//   );
// };

// export default RoomList;

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
import { fetchRooms, fetchTenants, addRoom, updateRoom, deleteRoom } from "./apiservice";

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
        // Calculate tenant counts for each room
        const tenantCountByRoom = tenantResponse.reduce((acc, tenant) => {
          if (tenant.roomNumber) {
            acc[tenant.roomNumber] = (acc[tenant.roomNumber] || 0) + 1;
          }
          return acc;
        }, {});

        // Update room data with tenant counts and status
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
      form.setFieldsValue({ status: 'Vacant' }); // Set default status to Vacant
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleAddEditRoom = () => {
    form.validateFields().then((values) => {
      // Determine the status based on the number of tenants and sharing spots
      const updatedValues = {
        ...values,
        status: (values.tenants || 0) >= values.sharing ? 'Occupied' : 'Vacant'
      };

      const apiCall = editingRoom
        ? updateRoom(editingRoom.id, updatedValues)
        : addRoom(updatedValues);

      apiCall
        .then(() => {
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
          setIsModalVisible(false);
        })
        .catch((error) => console.error("Error saving room:", error));
    });
  };

  const handleDelete = (id) => {
    deleteRoom(id)
      .then(() => {
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
        text ? <img src={text} alt="room" style={{ width: 50, height: 50 }} /> : null,
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => showModal(record)} />
          <Popconfirm
            title="Are you sure you want to delete this room?"
            onConfirm={() => handleDelete(record.id)}
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
            style={{ display: "inline-block", width: "calc(50% - 8px)" }}
          >
            <Select prefix={<EditOutlined />} disabled>
              <Option value="Vacant">Vacant</Option>
              <Option value="Occupied">Occupied</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="rent"
            label="Rent"
            rules={[{ required: true, message: "Please input the rent amount!" }]}
            style={{
              display: "inline-block",
              width: "calc(50% - 8px)",
              margin: "0 8px",
            }}
          >
            <InputNumber prefix={<DollarOutlined />} min={0} />
          </Form.Item>
          <Form.Item
            name="sharing"
            label="Sharing"
            rules={[{ required: true, message: "Please input the number of sharing spots!" }]}
            style={{ display: "inline-block", width: "calc(50% - 8px)" }}
          >
            <InputNumber prefix={<TeamOutlined />} min={1} />
          </Form.Item>
          <Form.Item
            name="tenants"
            label="Tenants"
            style={{ display: "inline-block", width: "calc(50% - 8px)" }}
          >
            <InputNumber prefix={<TeamOutlined />} disabled />
          </Form.Item>
          <Form.Item
            name="imageUrl"
            label="Image"
            style={{ display: "inline-block", width: "calc(50% - 8px)" }}
          >
            <Upload>
              <Button icon={<PictureOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default RoomList;
