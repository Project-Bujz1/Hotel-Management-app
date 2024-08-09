import React, { useState, useEffect } from "react";
import { List, Card, DatePicker, Button, Tag, Space, message } from "antd";
import moment from "moment";
import "./PaymentHistory.css";

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [dateRange, setDateRange] = useState([null, null]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await fetch('http://localhost:5000/tenants');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data); // Add this line to check the fetched data
        setPayments(data);
        setFilteredPayments(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        message.error('Failed to fetch payment data');
      }
    };
  
    fetchPayments();
  }, []);
  

  const filterPaymentsByDate = (date) => {
    if (!date) {
      setFilteredPayments(payments);
      return;
    }
    const formattedDate = moment(date).format("YYYY-MM-DD");
    setFilteredPayments(
      payments.filter((payment) => payment.dueDate === formattedDate)
    );
  };

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
              title={payment.name} // Display tenant name
              extra={<Tag color={payment.status === "Paid" ? "green" : "red"}>{payment.status}</Tag>}
            >
              <p>
                <strong>Amount Paid:</strong> ${payment.amount}
              </p>
              <p>
                <strong>Payment Date:</strong> {payment.dueDate}
              </p>
              <p>
                <strong>Mode of Payment:</strong> {payment.modeOfPayment}
              </p>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default PaymentHistory;
