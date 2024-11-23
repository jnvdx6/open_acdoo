"use client"
import React, { useEffect, useState } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts';

function MacroeconomicChart() {
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('/api/macroeconomic-chart-data');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const chartData = await response.json();
                setData(chartData);
            } catch (error) {
                console.error('Error fetching macroeconomic chart data:', error);
            }
        }
        fetchData();
    }, []);

    const formatYAxis = (value, metric) => {
        if (metric === 'pib') {
            return `${value.toFixed(0)}B`;
        }
        return `${value.toFixed(0)}%`;
    };

    const formatTooltip = (value, name) => {
        if (name === 'PIB') {
            return [`${value.toFixed(2)} B€`, name];
        }
        return [`${value.toFixed(2)}%`, name];
    };

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip bg-neutral-100 dark:bg-neutral-800 p-4 border border-neutral-200 dark:border-neutral-700 rounded shadow">
                    <p className="label font-semibold text-neutral-800 dark:text-neutral-200">{`${label}`}</p>
                    {payload.map((pld) => (
                        <p key={pld.name} className="text-neutral-600 dark:text-neutral-400">
                            {`${pld.name}: ${formatTooltip(pld.value, pld.name)[0]}`}
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="">
            <ResponsiveContainer width="100%" height={400}>
                <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <XAxis 
                        dataKey="quarter" 
                        tick={{ fill: 'currentColor' }}
                        axisLine={{ stroke: '#9CA3AF' }}
                        tickLine={{ stroke: '#9CA3AF' }}
                        className="text-neutral-600 dark:text-neutral-400"
                    />
                    <YAxis 
                        yAxisId="left" 
                        tickFormatter={(value) => formatYAxis(value, 'pib')}
                        tick={{ fill: 'currentColor' }}
                        axisLine={{ stroke: '#9CA3AF' }}
                        tickLine={{ stroke: '#9CA3AF' }}
                        className="text-neutral-600 dark:text-neutral-400"
                    />
                    <YAxis 
                        yAxisId="right" 
                        orientation="right" 
                        tickFormatter={(value) => formatYAxis(value, 'percentage')}
                        tick={{ fill: 'currentColor' }}
                        axisLine={{ stroke: '#9CA3AF' }}
                        tickLine={{ stroke: '#9CA3AF' }}
                        className="text-neutral-600 dark:text-neutral-400"
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend 
                        verticalAlign="top" 
                        height={36}
                        wrapperStyle={{
                            paddingBottom: '20px',
                            fontWeight: 'bold',
                        }}
                        className="text-neutral-800 dark:text-neutral-200"
                    />
                    <Line 
                        yAxisId="left" 
                        type="monotone" 
                        dataKey="pib" 
                        stroke="#FF6B35" 
                        name="PIB" 
                        strokeWidth={2}
                        dot={false}
                    />
                    <Line 
                        yAxisId="right" 
                        type="monotone" 
                        dataKey="deuda" 
                        stroke="#EF4444" 
                        name="Deuda" 
                        strokeWidth={2}
                        dot={false}
                    />
                    <Line 
                        yAxisId="right" 
                        type="monotone" 
                        dataKey="desempleo" 
                        stroke="#10B981" 
                        name="Desempleo" 
                        strokeWidth={2}
                        dot={false}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default MacroeconomicChart;