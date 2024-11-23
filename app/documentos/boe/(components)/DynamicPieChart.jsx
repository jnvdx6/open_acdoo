"use client"
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const DynamicPieChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={30}
          outerRadius={40}
          fill="#8884d8"
          dataKey="value"
        >
          <Cell key="cell-0" fill="#FFFFFF" />
          <Cell key="cell-1" fill="#FFA500" />
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default DynamicPieChart;