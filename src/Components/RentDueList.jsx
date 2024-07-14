import React, { useState } from "react";
import { Card, Row, Col, Badge, Tag, Space, Button, message } from "antd";

const initialRentData = [
  {
    key: "1",
    name: "John Doe",
    roomNumber: "101",
    status: "Paid",
    dueDate: "2024-07-10",
    modeOfPayment: "Online",
  },
  {
    key: "2",
    name: "Jane Smith",
    roomNumber: "102",
    status: "Not Paid",
    dueDate: "2024-07-15",
    modeOfPayment: "Cash",
  },
  {
    key: "3",
    name: "Bob Johnson",
    roomNumber: "103",
    status: "Due Soon",
    dueDate: "2024-07-18",
    modeOfPayment: "Cheque",
  },
];

const statusColors = {
  Paid: "green",
  "Not Paid": "red",
  "Due Soon": "blue",
};

const RentDueList = () => {
  const [rentData, setRentData] = useState(initialRentData);

  const handleMarkAsPaid = (key) => {
    setRentData((prevData) =>
      prevData.map((tenant) =>
        tenant.key === key ? { ...tenant, status: "Paid" } : tenant
      )
    );
    message.success("Marked as paid");
  };

  const handleMarkAsUnpaid = (key) => {
    setRentData((prevData) =>
      prevData.map((tenant) =>
        tenant.key === key ? { ...tenant, status: "Not Paid" } : tenant
      )
    );
    message.error("Marked as unpaid");
  };

  return (
    <div style={{ marginTop: "75px" }}>
      <Row gutter={[16, 16]}>
        {rentData.map((tenant) => (
          <Col key={tenant.key} xs={24} sm={12} md={8} lg={6}>
            <Badge.Ribbon
              text={tenant.status}
              color={statusColors[tenant.status]}
            >
              <Card title={`Room ${tenant.roomNumber}`} bordered={false}>
                <p>
                  <strong>Tenant:</strong> {tenant.name}
                </p>
                <p>
                  <strong>Due Date:</strong> {tenant.dueDate}
                </p>
                <p>
                  <strong>Payment Mode:</strong> {tenant.modeOfPayment}
                </p>
                <Space>
                  <Button
                    type="primary"
                    onClick={() => handleMarkAsPaid(tenant.key)}
                  >
                    Mark as Paid
                  </Button>
                  <Button danger onClick={() => handleMarkAsUnpaid(tenant.key)}>
                    Mark as Unpaid
                  </Button>
                </Space>
              </Card>
            </Badge.Ribbon>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default RentDueList;
