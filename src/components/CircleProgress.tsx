import type React from "react";

import type { CircleProgressProps } from "@/types/props/CircleProgressProps";

// const getColorInfo = (percentage: number) => {
//   if (percentage < 50) return { color: '#10b981', label: 'Good', bg: 'bg-green-50' };
//   if (percentage < 75) return { color: '#f59e0b', label: 'Fair', bg: 'bg-yellow-50' };
//   if (percentage < 90) return { color: '#f97316', label: 'High', bg: 'bg-orange-50' };
//   return { color: '#ef4444', label: 'Critical', bg: 'bg-red-50' };
// };

function CircleProgress(props: CircleProgressProps): React.JSX.Element {
  const percentage: number = props.percentage;
  const size: number = props.size || 120;
  const strokeWidth: number = props.strokeWidth || 8;
  const color: string = props.color;
  const backgroundColor: string = props.backgroundColor || '#e5e7eb';
  const showPercentage: boolean = props.showPercentage || true;
  const className: string = props.className || ''

  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex flex-row">
      <div className={`inline-flex items-center justify-center ${className}`}>
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={backgroundColor}
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-300 ease-in-out"
          />
        </svg>
      </div>
      {showPercentage && (
        <div className="ml-2 inset-0 flex items-center justify-center">
          <span className="text-sm font-semibold text-gray-700">
            {percentage.toFixed(1)}%
          </span>
        </div>
      )}
    </div>
  );
};

export default CircleProgress;
