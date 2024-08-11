import React, { useState, useEffect } from "react";
import { List, Card, DatePicker, Tag, Space, Button, message } from "antd";
import moment from "moment";
import { jsPDF } from "jspdf";
import orgLogo from "../assets/logo-1.png";
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
    
    // Add logo
    doc.addImage(orgLogo, 'PNG', 10, 10, 40, 20); // Adjust the size and position as needed
    
    // Add title
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('SriKrishna Men Hostel', 60, 20); // Adjust position based on logo
    
    // Add header and section titles
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.text('Rent Payment Receipt', 60, 30); // Adjust position
    
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