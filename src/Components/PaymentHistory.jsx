import React, { useState, useEffect } from "react";
import { List, Card, Tag, Space, Button, message, Input, Spin } from "antd";
import moment from "moment";
import { jsPDF } from "jspdf";
import orgLogo from "../assets/logo-1.png";
import "./PaymentHistory.css";

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [dateRange, setDateRange] = useState([null, null]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true); // State to handle loading

  useEffect(() => {
    const fetchPayments = async () => {
      setLoading(true); // Start loading

      try {
        const tenantsResponse = await fetch('https://smart-hostel-management-json-server.onrender.com/tenants');
        const roomsResponse = await fetch('https://smart-hostel-management-json-server.onrender.com/rooms');

        if (!tenantsResponse.ok || !roomsResponse.ok) {
          throw new Error('Network response was not ok');
        }

        const tenantsData = await tenantsResponse.json();
        const roomsData = await roomsResponse.json();
        
        const activeRoomIds = new Set(roomsData.map(room => room.id));
        const filteredTenants = tenantsData.filter(tenant => activeRoomIds.has(tenant.roomId));
        
        setPayments(filteredTenants);
        setFilteredPayments(filteredTenants);
      } catch (error) {
        console.error('Error fetching data:', error);
        message.error('Failed to fetch payment data');
      } finally {
        setLoading(false); // End loading
      }
    };
  
    fetchPayments();
  }, []);

  const handleSearch = (value) => {
    setSearchTerm(value);
    const lowercasedValue = value.toLowerCase();

    setFilteredPayments(
      payments.filter(
        (payment) =>
          payment.name.toLowerCase().includes(lowercasedValue) ||
          payment.roomNumber.toLowerCase().includes(lowercasedValue)
      )
    );
  };

  const generatePDF = (payment) => {
    const doc = new jsPDF();

    // Add logo
    doc.addImage(orgLogo, 'PNG', 10, 10, 40, 20);

    // Add title
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('SriKrishna Men Hostel', 60, 20);

    // Add header and section titles
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.text('Rent Payment Receipt', 60, 30);

    // Add dashed line
    doc.setLineWidth(0.5);
    doc.setDrawColor(0, 0, 0);
    doc.setLineDash([4, 2]);
    doc.line(10, 40, 200, 40);

    // Add tenant information
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Tenant Name:', 10, 55);
    doc.setFont('helvetica', 'normal');
    doc.text(payment.name, 50, 55);

    doc.setFont('helvetica', 'bold');
    doc.text('Date of Payment:', 10, 65);
    doc.setFont('helvetica', 'normal');
    doc.text(moment(payment.dueDate).format('YYYY-MM-DD'), 50, 65);

    doc.setFont('helvetica', 'bold');
    doc.text('Amount Paid:', 10, 75);
    doc.setFont('helvetica', 'normal');
    doc.text(`$${payment.monthlyRent}`, 50, 75);

    doc.setFont('helvetica', 'bold');
    doc.text('Mode of Payment:', 10, 85);
    doc.setFont('helvetica', 'normal');
    doc.text(payment.modeOfPayment, 50, 85);

    // Add additional information
    doc.setFont('helvetica', 'bold');
    doc.text('Payment Reference:', 10, 95);
    doc.setFont('helvetica', 'normal');
    doc.text(`REF-${Math.floor(Math.random() * 1000000)}`, 50, 95);

    // Add timestamp
    doc.setFont('helvetica', 'bold');
    doc.text('Issued On:', 10, 105);
    doc.setFont('helvetica', 'normal');
    doc.text(moment().format('YYYY-MM-DD HH:mm:ss'), 50, 105);

    // Add footer
    doc.setFontSize(10);
    doc.setFont('helvetica', 'italic');
    doc.text('Thank you for your payment!', 10, 120);
    doc.text('For any queries, please contact us at srikrishnamenpg@gmail.com', 10, 125);

    // Save the PDF
    doc.save(`${payment.name}_receipt.pdf`);
  };

  const handleDownload = (payment) => {
    generatePDF(payment);
  };

  const handleSendEmail = (payment) => {
    message.info('Send email feature is not implemented.');
  };

  const handleSendWhatsApp = (payment) => {
    message.info('Send WhatsApp feature is not implemented.');
  };

  return (
    <div className="payment-history">
      {loading ? (
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <Spin size="small" />
        </div>
      ) : (
        <>
          <Space direction="vertical" size="small" style={{ marginBottom: 16 }}>
            <Input.Search
              placeholder="Search by tenant name or room number"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              style={{ width: '100%', maxWidth: 400 }}
            />
          </Space>
          <List
            grid={{ gutter: 16, column: 1 }}
            dataSource={filteredPayments}
            renderItem={(payment) => (
              <List.Item>
                <Card 
                  title={payment.name}
                  extra={<Tag color={payment.status === "Paid" ? "green" : "red"}>{payment.status}</Tag>}
                  style={{ width: '100%' }}
                >
                  <p>
                    <strong>Amount Paid:</strong> ${payment.monthlyRent}
                  </p>
                  <p>
                    <strong>Payment Date:</strong> {moment(payment.dueDate).format('YYYY-MM-DD')}
                  </p>
                  <p>
                    <strong>Mode of Payment:</strong> {payment.modeOfPayment}
                  </p>
                  {payment.status === "Paid" && (
                    <Space direction="horizontal" size="small" style={{ flexWrap: 'wrap' }}>
                      <Button onClick={() => handleDownload(payment)} style={{ flex: 1, minWidth: '120px' }}>Download PDF</Button>
                      <Button onClick={() => handleSendEmail(payment)} style={{ flex: 1, minWidth: '120px' }}>Send Email</Button>
                      <Button onClick={() => handleSendWhatsApp(payment)} style={{ flex: 1, minWidth: '120px' }}>Send WhatsApp</Button>
                    </Space>
                  )}
                </Card>
              </List.Item>
            )}
          />
        </>
      )}
    </div>
  );
};

export default PaymentHistory;
