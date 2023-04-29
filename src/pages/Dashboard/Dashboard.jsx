import React, { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../../services/firebase';

function Dashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const carbonFootprintQuery = query(collection(db, 'carbon-footprint'));
      const querySnapshot = await getDocs(carbonFootprintQuery);
      setData(querySnapshot.docs.map(doc => doc.data()));
    };

    fetchData();
  }, []);

  console.log('Data:', data);
  const chartData = [
    {
      category: 'Transportation',
      value: data.reduce(
        (acc, curr) => acc + parseFloat(curr.transportation),
        0
      ),
    },
    {
      category: 'Housing',
      value: data.reduce((acc, curr) => acc + parseFloat(curr.housing), 0),
    },
    {
      category: 'Food',
      value: data.reduce((acc, curr) => acc + parseFloat(curr.food), 0),
    },
  ];

  return (
    <div>
      <h1>Carbon Footprint Dashboard</h1>
      <BarChart
        width={600}
        height={300}
        data={chartData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="category" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
    </div>
  );
}

export default Dashboard;
