import React, { useState, useEffect } from "react";
import { List, Card, Tag, Space, Button, message, Input, Spin } from "antd";
import moment from "moment";
import { jsPDF } from "jspdf";
import orgLogo from "../assets/logo-1.png";
import "./PaymentHistory.css";
import { DownloadOutlined, MailOutlined, WhatsAppOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [dateRange, setDateRange] = useState([null, null]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true); // State to handle loading
  const [loadingPDF, setLoadingPDF] = useState(false); // State to handle PDF generation loading

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

  const StyledButton = styled(Button)`
  border-radius: 50px;
  padding: 0 20px;
  height: 40px;
  font-size: 14px;
  background-color: black !important;
  border-color: white !important;
  color: white !important;
  font-weight: 600;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  transition: all 0.15s ease;
  &:hover {
    background-color: white !important;
    border-color: black !important;
    color: black !important;
  }
`;

  const generatePDF = (payment) => {
    const doc = new jsPDF();
  
    // Add logo
    doc.addImage(orgLogo, 'PNG', 10, 10, 40, 20);
  
    // Add title
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text('SriKrishna Men Hostel', 60, 20);
  
    // Add hostel address
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text('123 Hostel Lane, City, State, ZIP', 60, 30);
  
    // Add a horizontal line
    doc.setLineWidth(1);
    doc.setDrawColor(0, 0, 0);
    doc.line(10, 40, 200, 40);
  
    // Add receipt title
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('Rent Payment Receipt', 10, 50);
  
    // Add dashed line
    doc.setLineWidth(1);
    doc.setDrawColor(0, 0, 0);
    doc.line(10, 55, 200, 55);
  
    // Add tenant information
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Tenant Information', 10, 70);
  
    doc.setFont('helvetica', 'normal');
    doc.text(`Name: ${payment.name}`, 10, 85);
    doc.text(`Date of Payment: ${moment(payment.dueDate).format('YYYY-MM-DD')}`, 10, 100);
    doc.text(`Amount Paid: $${payment.monthlyRent}`, 10, 115);
    doc.text(`Mode of Payment: ${payment.modeOfPayment}`, 10, 130);
  
    // Add payment reference
    doc.setFont('helvetica', 'bold');
    doc.text('Payment Reference:', 10, 145);
    doc.setFont('helvetica', 'normal');
    doc.text(`REF-${Math.floor(Math.random() * 1000000)}`, 10, 160);
  
    // Add issue timestamp
    doc.setFont('helvetica', 'bold');
    doc.text('Issued On:', 10, 175);
    doc.setFont('helvetica', 'normal');
    doc.text(moment().format('YYYY-MM-DD HH:mm:ss'), 10, 190);
  
    // Add footer
    doc.setFontSize(10);
    doc.setFont('helvetica', 'italic');
    doc.text('Thank you for your payment!', 10, 210);
    doc.text('For any queries, please contact us at srikrishnamenpg@gmail.com', 10, 220);
  
    // Save the PDF
    doc.save(`${payment.name}_receipt.pdf`);
    setLoadingPDF(false); // End loading PDF
  };
  

  const handleDownload = (payment) => {
    setLoadingPDF(true); // Start loading PDF
    setTimeout(() => {
      generatePDF(payment);
    }, 0);
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
<StyledButton
  onClick={() => handleDownload(payment)}
  style={{ flex: 1, minWidth: '120px' }}
  loading={loadingPDF}
  icon={<DownloadOutlined />} // Add the icon here
>
  Download
</StyledButton>
                      <StyledButton 
                        onClick={() => handleSendEmail(payment)} 
                        style={{ flex: 1, minWidth: '120px' }}
                        icon={<WhatsAppOutlined />} // Add the icon here
                      >
                        Send Email
                      </StyledButton>
                      <StyledButton 
                        onClick={() => handleSendWhatsApp(payment)} 
                        style={{ flex: 1, minWidth: '120px' }}
                        icon={<MailOutlined />} // Add the icon here
                      >
                        Send WhatsApp
                      </StyledButton>
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
