import React, { useState, useEffect } from "react";
import { Card, Row, Col, Badge, Space, Button, message } from "antd";

const statusColors = {
  Paid: "green",
  "Not Paid": "red",
  "Due Soon": "blue",
};

const RentDueList = () => {
  const [rentData, setRentData] = useState([]);

  useEffect(() => {
    const fetchRentData = async () => {
      try {
        const response = await fetch("http://localhost:3030/rooms");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        const rentDetails = data.flatMap((room) =>
          room.tenants.map((tenant) => ({
            key: tenant.id,
            name: tenant.name,
            roomNumber: room.roomNumber,
            status: tenant.rentStatus,
            dueDate: tenant.dueDate,
            modeOfPayment: tenant.modeOfPayment,
          }))
        );
        setRentData(rentDetails);
      } catch (error) {
        console.error("Error fetching rent data:", error);
        message.error("Failed to fetch rent data");
      }
    };

    fetchRentData();
  }, []);

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
