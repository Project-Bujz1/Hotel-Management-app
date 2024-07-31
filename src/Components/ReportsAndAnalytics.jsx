import React from 'react';
import { Card, Row, Col, Statistic, Progress } from 'antd';
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, Cell } from 'recharts';
import { statusColors } from './ComplaintsList'; // Make sure this aligns with your actual statusColors import

// Example data
const rentData = [
  { key: '1', name: 'John Doe', roomNumber: '101', status: 'Paid', dueDate: '2024-07-10', modeOfPayment: 'Online', isNonNative: true, category: 'Student', stayDuration: 120 },
  { key: '2', name: 'Jane Smith', roomNumber: '102', status: 'Not Paid', dueDate: '2024-07-15', modeOfPayment: 'Cash', isNonNative: false, category: 'Employee', stayDuration: 250 },
  { key: '3', name: 'Bob Johnson', roomNumber: '103', status: 'Due Soon', dueDate: '2024-07-18', modeOfPayment: 'Cheque', isNonNative: false, category: 'Employee', stayDuration: 90 },
  // Add more data as needed
];

// Complaints Data
const complaintsData = [
  { key: '1', roomNumber: '101', complaint: 'Leaking faucet', status: 'Pending' },
  { key: '2', roomNumber: '102', complaint: 'Broken window', status: 'In Progress' },
  { key: '3', roomNumber: '103', complaint: 'No hot water', status: 'Completed' },
  // Add more data as needed
];

// Rooms Data
const totalRooms = 6;
const occupiedRooms = 4;

// Transform data for Pie Chart
const statusCounts = rentData.reduce((acc, tenant) => {
  acc[tenant.status] = (acc[tenant.status] || 0) + 1;
  return acc;
}, {});

const pieData = Object.keys(statusCounts).map(status => ({
  name: status,
  value: statusCounts[status]
}));

// Define colors for each status
const paymentStatusColors = {
  Paid: '#52c41a', // Green
  'Not Paid': '#f5222d', // Red
  'Due Soon': '#1890ff', // Blue
};

// Transform data for Bar Chart
const barData = rentData.map(tenant => ({
  name: tenant.name,
  rent: Math.floor(Math.random() * 500) + 100 // Example rent amount, replace with actual rent data if available
}));

// Calculate statistics
const totalTenants = rentData.length;
const paidTenants = statusCounts['Paid'] || 0;
const notPaidTenants = statusCounts['Not Paid'] || 0;
const dueSoonTenants = statusCounts['Due Soon'] || 0;
const nonNativeTenants = rentData.filter(tenant => tenant.isNonNative).length;
const studentTenants = rentData.filter(tenant => tenant.category === 'Student').length;
const employeeTenants = rentData.filter(tenant => tenant.category === 'Employee').length;
const longTermTenants = rentData.filter(tenant => tenant.stayDuration > 180).length;

const complaintsRaised = complaintsData.length;
const complaintsResolved = complaintsData.filter(c => c.status === 'Completed').length;
const complaintsPending = complaintsData.filter(c => c.status === 'Pending').length;
const complaintsInProgress = complaintsData.filter(c => c.status === 'In Progress').length;

const totalRoomsCapacity = totalRooms;
const vacantRooms = totalRooms - occupiedRooms;
const occupancyPercentage = Math.round((occupiedRooms / totalRoomsCapacity) * 100);
const vacancyPercentage = 100 - occupancyPercentage;

const ReportsAndAnalytics = () => {
  return (
    <div style={{ padding: '20px', marginTop: '75px' }}>
      <Row gutter={[16, 16]}>
        {/* Pie Chart */}
        <Col span={24} md={12}>
          <Card title="Payment Status Distribution">
            <PieChart width={400} height={400}>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={150}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={paymentStatusColors[entry.name] || '#8884d8'} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </Card>
        </Col>

        {/* Bar Chart */}
        <Col span={24} md={12}>
          <Card title="Rent Amount by Tenant">
            <BarChart
              width={500}
              height={300}
              data={barData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="rent" fill="#82ca9d" />
            </BarChart>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
        <Col span={24} md={12} lg={6}>
          <Card title="Occupancy & Vacancy">
            <Statistic title="Occupancy %" value={occupancyPercentage} suffix="%" />
            <Statistic title="Vacancy %" value={vacancyPercentage} suffix="%" style={{ marginTop: '16px' }} />
          </Card>
        </Col>

        <Col span={24} md={12} lg={6}>
          <Card title="Tenant Categories">
            <Statistic title="Non-Native Tenants" value={nonNativeTenants} />
            <Statistic title="Students" value={studentTenants} style={{ marginTop: '16px' }} />
            <Statistic title="Employees" value={employeeTenants} style={{ marginTop: '16px' }} />
          </Card>
        </Col>

        <Col span={24} md={12} lg={6}>
          <Card title="Long-Term Tenants">
            <Statistic title="Tenants Staying Over 6 Months" value={longTermTenants} />
          </Card>
        </Col>

        <Col span={24} md={12} lg={6}>
          <Card title="Complaints Status">
            <Statistic title="Total Complaints" value={complaintsRaised} />
            <Statistic title="Resolved Complaints" value={complaintsResolved} style={{ marginTop: '16px' }} />
            <Statistic title="Pending Complaints" value={complaintsPending} style={{ marginTop: '16px' }} />
            <Statistic title="In Progress Complaints" value={complaintsInProgress} style={{ marginTop: '16px' }} />
          </Card>
        </Col>

        <Col span={24} md={12} lg={6}>
          <Card title="Rent Payment Status">
            <Progress percent={paidTenants / totalTenants * 100} status="active" strokeColor="#52c41a" format={() => `${paidTenants} Paid`} />
            <Progress percent={notPaidTenants / totalTenants * 100} status="exception" strokeColor="#f5222d" format={() => `${notPaidTenants} Not Paid`} style={{ marginTop: '16px' }} />
            <Progress percent={dueSoonTenants / totalTenants * 100} status="normal" strokeColor="#1890ff" format={() => `${dueSoonTenants} Due Soon`} style={{ marginTop: '16px' }} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ReportsAndAnalytics;
