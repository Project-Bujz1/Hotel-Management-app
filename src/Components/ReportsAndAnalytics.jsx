import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Statistic, Progress, Spin } from 'antd';
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, Cell } from 'recharts';

const ReportsAndAnalytics = () => {
  const [rentData, setRentData] = useState([]);
  const [complaintsData, setComplaintsData] = useState([]);
  const [roomsData, setRoomsData] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state for data fetching

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading
      try {
        const [rentResponse, complaintsResponse, roomsResponse] = await Promise.all([
          fetch('https://smart-hostel-management-json-server.onrender.com/tenants'),
          fetch('https://smart-hostel-management-json-server.onrender.com/complaints'),
          fetch('https://smart-hostel-management-json-server.onrender.com/rooms')
        ]);
        const [rentData, complaintsData, roomsData] = await Promise.all([
          rentResponse.json(),
          complaintsResponse.json(),
          roomsResponse.json()
        ]);

        const validRoomNumbers = roomsData.map(room => room.roomNumber);
        const filteredTenants = rentData.filter(tenant => validRoomNumbers.includes(tenant.roomNumber));
        
        setRentData(filteredTenants);
        setComplaintsData(complaintsData);
        setRoomsData(roomsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchData();
  }, []);

  const totalRooms = roomsData.length;
  const occupiedRooms = roomsData.filter(room => room.status === 'Occupied').length;

  const statusCounts = rentData.reduce((acc, tenant) => {
    acc[tenant.status] = (acc[tenant.status] || 0) + 1;
    return acc;
  }, {});

  const pieData = Object.keys(statusCounts).map(status => ({
    name: status,
    value: statusCounts[status]
  }));

  const paymentStatusColors = {
    Paid: '#52c41a',
    'Not Paid': '#f5222d',
    'Due Soon': '#1890ff'
  };

  const barData = rentData.map(tenant => ({
    name: tenant.name,
    monthlyRent: tenant.monthlyRent
  }));

  const totalTenants = rentData.length;
  const paidTenants = statusCounts['Paid'] || 0;
  const notPaidTenants = statusCounts['Not Paid'] || 0;
  const dueSoonTenants = statusCounts['Due Soon'] || 0;

  const complaintsRaised = complaintsData.length;
  const complaintsResolved = complaintsData.filter(c => c.status === 'Completed').length;
  const complaintsPending = complaintsData.filter(c => c.status === 'Pending').length;
  const complaintsInProgress = complaintsData.filter(c => c.status === 'In Progress').length;

  const occupancyPercentage = totalRooms ? Math.round((occupiedRooms / totalRooms) * 100) : 0;
  const vacancyPercentage = 100 - occupancyPercentage;

  return (
    <div style={{ padding: '20px', marginTop: '75px' }}>
      <Spin spinning={loading} size='small'>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12} lg={8}>
            <Card title="Payment Status Distribution">
              <PieChart width={300} height={300}>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={120}
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

          <Col xs={24} md={24} lg={16}>
            <Card title="Rent Amount by Tenant">
              <div style={{ overflowX: 'auto' }}>
                <BarChart
                  width={700}
                  height={300}
                  data={barData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="monthlyRent" fill="#82ca9d" />
                </BarChart>
              </div>
            </Card>
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
          <Col xs={24} sm={12} lg={6}>
            <Card title="Occupancy & Vacancy">
              <Statistic title="Occupancy %" value={occupancyPercentage} suffix="%" />
              <Statistic title="Vacancy %" value={vacancyPercentage} suffix="%" style={{ marginTop: '16px' }} />
            </Card>
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <Card title="Tenant Categories">
              <Statistic title="Non-Native Tenants" value={rentData.filter(tenant => tenant.occupation !== 'Employee').length} />
              <Statistic title="Students" value={rentData.filter(tenant => tenant.occupation === 'Student').length} style={{ marginTop: '16px' }} />
              <Statistic title="Employees" value={rentData.filter(tenant => tenant.occupation === 'Employee').length} style={{ marginTop: '16px' }} />
            </Card>
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <Card title="Long-Term Tenants">
              <Statistic title="Tenants Staying Over 6 Months" value={rentData.filter(tenant => {
                const dueDate = new Date(tenant.dueDate);
                const today = new Date();
                return (today - dueDate) > 6 * 30 * 24 * 60 * 60 * 1000;
              }).length} />
            </Card>
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <Card title="Complaints Status">
              <Statistic title="Total Complaints" value={complaintsRaised} />
              <Statistic title="Resolved Complaints" value={complaintsResolved} style={{ marginTop: '16px' }} />
              <Statistic title="Pending Complaints" value={complaintsPending} style={{ marginTop: '16px' }} />
              <Statistic title="In Progress Complaints" value={complaintsInProgress} style={{ marginTop: '16px' }} />
            </Card>
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <Card title="Rent Payment Status">
              <Progress percent={totalTenants ? (paidTenants / totalTenants * 100) : 0} status="active" />
              <Progress percent={totalTenants ? (notPaidTenants / totalTenants * 100) : 0} status="exception" />
              <Progress percent={totalTenants ? (dueSoonTenants / totalTenants * 100) : 0} status="normal" />
            </Card>
          </Col>
        </Row>
      </Spin>
    </div>
  );
};

export default ReportsAndAnalytics;
