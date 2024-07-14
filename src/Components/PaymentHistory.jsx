// import React from 'react';
// import { Table } from 'antd';

// const columns = [
//   {
//     title: 'Tenant Name',
//     dataIndex: 'name',
//     key: 'name',
//   },
//   {
//     title: 'Room Number',
//     dataIndex: 'roomNumber',
//     key: 'roomNumber',
//   },
//   {
//     title: 'Amount Paid',
//     dataIndex: 'amountPaid',
//     key: 'amountPaid',
//   },
//   {
//     title: 'Payment Date',
//     dataIndex: 'paymentDate',
//     key: 'paymentDate',
//   },
// ];

// const data = [
//   {
//     key: '1',
//     name: 'John Doe',
//     roomNumber: '101',
//     amountPaid: '5000',
//     paymentDate: '2024-06-01',
//   },
//   {
//     key: '2',
//     name: 'Jane Smith',
//     roomNumber: '102',
//     amountPaid: '8000',
//     paymentDate: '2024-06-02',
//   },
// ];

// const PaymentHistory = () => (
//   <div>
//     <h2>Payment History</h2>
//     <Table columns={columns} dataSource={data} />
//   </div>
// );

// export default PaymentHistory;
import React, { useState } from "react";
import { List, Card, DatePicker, Button, Tag, Space, message } from "antd";
import moment from "moment";
import "./PaymentHistory.css";

const initialPayments = [
  {
    key: "1",
    tenantName: "John Doe",
    amount: 500,
    paymentDate: "2024-07-10",
    paymentMode: "Credit Card",
  },
  {
    key: "2",
    tenantName: "Jane Smith",
    amount: 450,
    paymentDate: "2024-07-11",
    paymentMode: "Bank Transfer",
  },
  {
    key: "3",
    tenantName: "Bob Johnson",
    amount: 600,
    paymentDate: "2024-07-12",
    paymentMode: "Cash",
  },
  // Add more initial payment data as needed
];

const PaymentHistory = () => {
  const [payments, setPayments] = useState(initialPayments);
  const [filteredPayments, setFilteredPayments] = useState(initialPayments);
  const [dateRange, setDateRange] = useState([null, null]);

  const filterPaymentsByDate = (date) => {
    if (!date) {
      setFilteredPayments(payments);
      return;
    }
    const formattedDate = moment(date).format("YYYY-MM-DD");
    setFilteredPayments(
      payments.filter((payment) => payment.paymentDate === formattedDate)
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
          moment(payment.paymentDate).isSameOrAfter(start) &&
          moment(payment.paymentDate).isSameOrBefore(end)
      )
    );
  };

  return (
    <div className="payment-history" style={{ marginTop: "75px" }}>
      <h2>Payment History</h2>
      <Space direction="vertical" size="large" style={{ marginBottom: 16 }}>
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
              title={payment.tenantName}
              extra={<Tag color="blue">{payment.paymentMode}</Tag>}
            >
              <p>
                <strong>Amount Paid:</strong> ${payment.amount}
              </p>
              <p>
                <strong>Payment Date:</strong> {payment.paymentDate}
              </p>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default PaymentHistory;
