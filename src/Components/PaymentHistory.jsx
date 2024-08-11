import React, { useState, useEffect } from "react";
import { List, Card, DatePicker, Tag, Space, Button, message } from "antd";
import moment from "moment";
import { jsPDF } from "jspdf";
import "./PaymentHistory.css";

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [dateRange, setDateRange] = useState([null, null]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const tenantsResponse = await fetch('http://localhost:5000/tenants');
        const roomsResponse = await fetch('http://localhost:5000/rooms');
        if (!tenantsResponse.ok || !roomsResponse.ok) {
          throw new Error('Network response was not ok');
        }
        const tenantsData = await tenantsResponse.json();
        const roomsData = await roomsResponse.json();
        
        const activeRoomIds = new Set(roomsData.map(room => room.id));
        const filteredTenants = tenantsData.filter(tenant => activeRoomIds.has(tenant.roomId));
        
        console.log(filteredTenants);
        setPayments(filteredTenants);
        setFilteredPayments(filteredTenants);
      } catch (error) {
        console.error('Error fetching data:', error);
        message.error('Failed to fetch payment data');
      }
    };
  
    fetchPayments();
  }, []);

  const filterPaymentsByDateRange = (dates) => {
    if (!dates || dates.length === 0) {
      setFilteredPayments(payments);
      return;
    }
    const [start, end] = dates;
    setFilteredPayments(
      payments.filter(
        (payment) =>
          moment(payment.dueDate).isSameOrAfter(start) &&
          moment(payment.dueDate).isSameOrBefore(end)
      )
    );
  };

  const generatePDF = (payment) => {
    const doc = new jsPDF();
    doc.text('Payment Receipt', 10, 10);
    doc.text(`Organization Name: XYZ Hostel`, 10, 20);
    doc.text(`Tenant Name: ${payment.name}`, 10, 30);
    doc.text(`Date of Payment: ${payment.dueDate}`, 10, 40);
    doc.text(`Mode of Payment: ${payment.modeOfPayment}`, 10, 50);
    doc.text(`Amount Paid: $${payment.monthlyRent}`, 10, 60);
    doc.text(`Time: ${moment().format("YYYY-MM-DD HH:mm:ss")}`, 10, 70);
    doc.save(`${payment.name}_receipt.pdf`);
  };

  const handleDownload = (payment) => {
    generatePDF(payment);
  };

  const handleSendEmail = (payment) => {
    // Implement sending email logic here
    message.info('Send email feature is not implemented.');
  };

  const handleSendWhatsApp = (payment) => {
    // Implement sending via WhatsApp logic here
    message.info('Send WhatsApp feature is not implemented.');
  };

  return (
    <div className="payment-history" style={{ marginTop: "75px" }}>
      <Space direction="vertical" size="large" style={{ marginBottom: 16, marginLeft: 1250 }}>
        <DatePicker.RangePicker
          onChange={(dates) => filterPaymentsByDateRange(dates)}
          placeholder={["Start Date", "End Date"]}
        />
      </Space>
      <List
        grid={{ gutter: 16, column: 3 }}
        dataSource={filteredPayments}
        renderItem={(payment) => (
          <List.Item>
            <Card 
              title={payment.name}
              extra={<Tag color={payment.status === "Paid" ? "green" : "red"}>{payment.status}</Tag>}
            >
              <p>
                <strong>Amount Paid:</strong> ${payment.monthlyRent}
              </p>
              <p>
                <strong>Payment Date:</strong> {payment.dueDate}
              </p>
              <p>
                <strong>Mode of Payment:</strong> {payment.modeOfPayment}
              </p>
              {payment.status === "Paid" && (
                <Space>
                  <Button onClick={() => handleDownload(payment)}>Download PDF</Button>
                  <Button onClick={() => handleSendEmail(payment)}>Send Email</Button>
                  <Button onClick={() => handleSendWhatsApp(payment)}>Send WhatsApp</Button>
                </Space>
              )}
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default PaymentHistory; 