import React from 'react';

interface CustomTooltipProps {
    active?: boolean;
    payload?: any[];
    label?: string | number;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="rounded-lg border border-gray-200 bg-white p-3 shadow-lg">
                <p className="font-medium text-gray-900">{label}</p>
                <p className="font-semibold text-blue-600">
                    {payload[0].value} déclaration{payload[0].value > 1 ? 's' : ''}
                </p>
            </div>
        );
    }
    return null;
};

export default CustomTooltip;
