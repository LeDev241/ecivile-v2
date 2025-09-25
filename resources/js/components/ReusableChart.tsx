// src/components/ReusableChart.tsx
import React from 'react';
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import CustomTooltip from './CustomTooltip';

interface ReusableChartProps {
    type: 'pie' | 'bar';
    data: any[];
    dataKey: string;
    nameKey?: string;
    colors?: string[];
    xAxisKey?: string;
    innerRadius?: number;
    outerRadius?: number;
    angle?: number;
    radius?: number[];
    height?: number;
}

const DEFAULT_COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];

const ReusableChart: React.FC<ReusableChartProps> = ({
    type,
    data,
    dataKey,
    nameKey,
    colors = DEFAULT_COLORS,
    xAxisKey,
    innerRadius = 70,
    outerRadius = 110,
    angle = -35,
    radius = [6, 6, 0, 0],
    height = 300,
}) => {
    return (
        <ResponsiveContainer width="100%" height={height}>
            {type === 'pie' ? (
                <PieChart>
                    <Pie
                        data={data}
                        dataKey={dataKey}
                        nameKey={nameKey || 'name'}
                        innerRadius={innerRadius}
                        outerRadius={outerRadius}
                        label={({ name, value }) => `${name}: ${value}`}
                        labelLine={false}
                    >
                        {data.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                        ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend iconType="circle" />
                </PieChart>
            ) : (
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey={xAxisKey || 'name'} angle={angle} textAnchor="end" height={80} />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar dataKey={dataKey} radius={radius}>
                        {data.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                        ))}
                    </Bar>
                </BarChart>
            )}
        </ResponsiveContainer>
    );
};

export default ReusableChart;
