// import React, { useState } from "react";
// import { Tabs, Form, Input, Switch, Button, Select, Checkbox, Row, Col } from "antd";
// import "./Settings.css"; // Import the CSS file

// const { TabPane } = Tabs;
// const { Option } = Select;

// const Settings = () => {
//   const [activeScreens, setActiveScreens] = useState({
//     parcelManagement: true,
//     suggestionsBox: false,
//     feedback: true,
//     notice: false,
//     foodMenu: true,
//   });

//   const handleFormSubmit = (values) => {
//     console.log("Form Values:", values);
//   };

//   const handleScreenSelection = (checkedValues) => {
//     setActiveScreens({
//       parcelManagement: checkedValues.includes("parcelManagement"),
//       suggestionsBox: checkedValues.includes("suggestionsBox"),
//       feedback: checkedValues.includes("feedback"),
//       notice: checkedValues.includes("notice"),
//       foodMenu: checkedValues.includes("foodMenu"),
//     });
//   };

//   return (
//     <div className="settings-container" style={{marginTop : "75px"}}>
//       <Tabs defaultActiveKey="1" type="card">
//         <TabPane tab="General Management" key="1">
//           <Form
//             layout="vertical"
//             onFinish={handleFormSubmit}
//             className="general-settings-form"
//           >
//             {/* General Management Form Fields */}
//             <Form.Item
//               label="Site Title"
//               name="siteTitle"
//               rules={[{ required: true, message: "Please enter the site title!" }]}
//             >
//               <Input placeholder="Enter site title" />
//             </Form.Item>

//             <Form.Item
//               label="Enable Notifications"
//               name="enableNotifications"
//               valuePropName="checked"
//             >
//               <Switch defaultChecked />
//             </Form.Item>

//             <Form.Item
//               label="Default Language"
//               name="defaultLanguage"
//               rules={[{ required: true, message: "Please select a language!" }]}
//             >
//               <Select placeholder="Select a language">
//                 <Option value="en">English</Option>
//                 <Option value="es">Spanish</Option>
//                 <Option value="fr">French</Option>
//               </Select>
//             </Form.Item>

//             <Form.Item>
//               <Button type="primary" htmlType="submit">
//                 Save Changes
//               </Button>
//             </Form.Item>
//           </Form>
//         </TabPane>

//         <TabPane tab="Org Settings" key="2">
//           <Tabs defaultActiveKey="1" type="card">
//             <TabPane tab="General Settings" key="1">
//               <Form
//                 layout="vertical"
//                 onFinish={handleFormSubmit}
//                 className="org-settings-form"
//               >
//                 {/* Org Settings Form Fields */}
//                 <Form.Item
//                   label="Organization Name"
//                   name="orgName"
//                   rules={[{ required: true, message: "Please enter the organization name!" }]}
//                 >
//                   <Input placeholder="Enter organization name" />
//                 </Form.Item>

//                 <Form.Item
//                   label="Organization Email"
//                   name="orgEmail"
//                   rules={[{ required: true, message: "Please enter a valid email!" }]}
//                 >
//                   <Input placeholder="Enter organization email" />
//                 </Form.Item>

//                 <Form.Item
//                   label="Enable Auto-Backup"
//                   name="enableAutoBackup"
//                   valuePropName="checked"
//                 >
//                   <Switch defaultChecked />
//                 </Form.Item>

//                 <Form.Item>
//                   <Button type="primary" htmlType="submit">
//                     Save Changes
//                   </Button>
//                 </Form.Item>
//               </Form>
//             </TabPane>

//             <TabPane tab="Screen Management" key="2">
//               <Form
//                 layout="vertical"
//                 onFinish={() => console.log("Screen Management Settings Saved")}
//                 className="screen-management-form"
//               >
//                 <Form.Item label="Select Screens for the Organization">
//                   <Checkbox.Group
//                     style={{ width: "100%" }}
//                     onChange={handleScreenSelection}
//                     defaultValue={[
//                       "parcelManagement",
//                       "feedback",
//                       "foodMenu",
//                     ]}
//                   >
//                     <Row>
//                       <Col span={12}>
//                         <Checkbox value="parcelManagement">
//                           Parcel Management
//                         </Checkbox>
//                       </Col>
//                       <Col span={12}>
//                         <Checkbox value="suggestionsBox">
//                           Suggestions Box
//                         </Checkbox>
//                       </Col>
//                       <Col span={12}>
//                         <Checkbox value="feedback">Feedback</Checkbox>
//                       </Col>
//                       <Col span={12}>
//                         <Checkbox value="notice">Notice</Checkbox>
//                       </Col>
//                       <Col span={12}>
//                         <Checkbox value="foodMenu">Food Menu</Checkbox>
//                       </Col>
//                     </Row>
//                   </Checkbox.Group>
//                 </Form.Item>

//                 <Form.Item>
//                   <Button type="primary" htmlType="submit">
//                     Save Changes
//                   </Button>
//                 </Form.Item>
//               </Form>
//             </TabPane>
//           </Tabs>
//         </TabPane>
//       </Tabs>
//     </div>
//   );
// };

// export default Settings;
import React, { useState, useEffect } from "react";
import { Tabs, Form, Input, Switch, Button, Select, Checkbox, Row, Col } from "antd";
import "./Settings.css"; // Import the CSS file

const { TabPane } = Tabs;
const { Option } = Select;

const Settings = () => {
  const [settings, setSettings] = useState({
    siteTitle: "",
    enableNotifications: false,
    defaultLanguage: "en",
    orgName: "",
    orgEmail: "",
    enableAutoBackup: false,
    activeScreens: {
      parcelManagement: true,
      suggestionsBox: false,
      feedback: true,
      notice: false,
      foodMenu: true,
    },
  });

  // Fetch settings on component mount
  useEffect(() => {
    fetch("http://localhost:5000/settings/1")
      .then((response) => response.json())
      .then((data) => setSettings(data))
      .catch((error) => console.error("Error fetching settings:", error));
  }, []);

  // Handle form submission
  const handleFormSubmit = (values) => {
    const updatedSettings = {
      ...settings,
      ...values,
      activeScreens: settings.activeScreens, // Keep activeScreens unchanged
    };

    fetch("http://localhost:5000/settings/1", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedSettings),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Settings updated:", data);
        setSettings(data);
      })
      .catch((error) => console.error("Error updating settings:", error));
  };

  // Handle screen selection changes
  const handleScreenSelection = (checkedValues) => {
    const updatedActiveScreens = {
      parcelManagement: checkedValues.includes("parcelManagement"),
      suggestionsBox: checkedValues.includes("suggestionsBox"),
      feedback: checkedValues.includes("feedback"),
      notice: checkedValues.includes("notice"),
      foodMenu: checkedValues.includes("foodMenu"),
    };

    setSettings((prevSettings) => ({
      ...prevSettings,
      activeScreens: updatedActiveScreens,
    }));

    // Update settings on the server
    fetch("http://localhost:5000/settings/1", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...settings, activeScreens: updatedActiveScreens }),
    })
      .then((response) => response.json())
      .then((data) => console.log("Screen settings updated:", data))
      .catch((error) => console.error("Error updating screen settings:", error));
  };

  return (
    <div className="settings-container" style={{ marginTop: "75px" }}>
      <Tabs defaultActiveKey="1" type="card">
        <TabPane tab="General Management" key="1">
          <Form
            layout="vertical"
            initialValues={settings}
            onFinish={handleFormSubmit}
            className="general-settings-form"
          >
            <Form.Item
              label="Site Title"
              name="siteTitle"
              rules={[{ required: true, message: "Please enter the site title!" }]}
            >
              <Input placeholder="Enter site title" />
            </Form.Item>

            <Form.Item
              label="Enable Notifications"
              name="enableNotifications"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>

            <Form.Item
              label="Default Language"
              name="defaultLanguage"
              rules={[{ required: true, message: "Please select a language!" }]}
            >
              <Select placeholder="Select a language">
                <Option value="en">English</Option>
                <Option value="es">Spanish</Option>
                <Option value="fr">French</Option>
              </Select>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Save Changes
              </Button>
            </Form.Item>
          </Form>
        </TabPane>

        <TabPane tab="Org Settings" key="2">
          <Tabs defaultActiveKey="1" type="card">
            <TabPane tab="General Settings" key="1">
              <Form
                layout="vertical"
                initialValues={settings}
                onFinish={handleFormSubmit}
                className="org-settings-form"
              >
                <Form.Item
                  label="Organization Name"
                  name="orgName"
                  rules={[{ required: true, message: "Please enter the organization name!" }]}
                >
                  <Input placeholder="Enter organization name" />
                </Form.Item>

                <Form.Item
                  label="Organization Email"
                  name="orgEmail"
                  rules={[{ required: true, message: "Please enter a valid email!" }]}
                >
                  <Input placeholder="Enter organization email" />
                </Form.Item>

                <Form.Item
                  label="Enable Auto-Backup"
                  name="enableAutoBackup"
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Save Changes
                  </Button>
                </Form.Item>
              </Form>
            </TabPane>

            <TabPane tab="Screen Management" key="2">
              <Form
                layout="vertical"
                onFinish={() => console.log("Screen Management Settings Saved")}
                className="screen-management-form"
              >
                <Form.Item label="Select Screens for the Organization">
                  <Checkbox.Group
                    style={{ width: "100%" }}
                    onChange={handleScreenSelection}
                    defaultValue={Object.keys(settings.activeScreens).filter(
                      (key) => settings.activeScreens[key]
                    )}
                  >
                    <Row>
                      <Col span={12}>
                        <Checkbox value="parcelManagement">Parcel Management</Checkbox>
                      </Col>
                      <Col span={12}>
                        <Checkbox value="suggestionsBox">Suggestions Box</Checkbox>
                      </Col>
                      <Col span={12}>
                        <Checkbox value="feedback">Feedback</Checkbox>
                      </Col>
                      <Col span={12}>
                        <Checkbox value="notice">Notice</Checkbox>
                      </Col>
                      <Col span={12}>
                        <Checkbox value="foodMenu">Food Menu</Checkbox>
                      </Col>
                    </Row>
                  </Checkbox.Group>
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Save Changes
                  </Button>
                </Form.Item>
              </Form>
            </TabPane>
          </Tabs>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Settings;
