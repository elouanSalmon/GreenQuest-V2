// Dashboard.js

// Add this import at the top of Dashboard.js
import { Cell } from 'recharts';

const COLORS = [
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  '#FF8042',
  '#8884d8',
  '#8dd1e1',
  '#a4de6c',
  '#d0ed57',
  '#ffc658',
  '#d84a37',
  '#66b3ff',
  '#99ff99',
  '#ffcc66',
  '#c45850',
'#e8c3b9',
'#c2d6d6',
'#6699cc',
'#8c1aff',
'#e066ff',
'#5cd65c',
'#ff8c1a',
];

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

  const chartData = [
    {
      category: 'Flying',
      value: data.reduce((acc, curr) => acc + curr.flying, 0),
    },
    {
      category: 'Car',
      value: data.reduce((acc, curr) => acc + curr.car, 0),
    },
    {
      category: 'Shopping',
      value: data.reduce((acc, curr) => acc + curr.shopping, 0),
    },
    {
      category: 'Home',
      value: data.reduce((acc, curr) => acc + curr.home, 0),
    },
    {
      category: 'Energy',
      value: data.reduce((acc, curr) => acc + curr.energy, 0),
    },
  ];

  const totalCarbonFootprint = chartData.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div>
      <h1>Carbon Footprint Dashboard 🌍</h1>
      <h2>
        Total Carbon Emission Score: {totalCarbonFootprint.toFixed(2)}{' '}
        <span role="img" aria-label="footprints">
          👣
        </span>
      </h2>
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
        <Bar dataKey="value" fill="#8884d8">
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % 20]} />
          ))}
        </Bar>
      </BarChart>
    </div>
  );
}

export default Dashboard;