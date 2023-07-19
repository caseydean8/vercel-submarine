import React from "react";
import { PieChart, Pie, Cell } from "recharts";
import "./SmallChart.css";

const customLabel = ({ percent }) => {
  return `${(percent * 100).toFixed(0)}%`;
};

const SmallChart = (props) => {
  if (props.data) {
    return (
      <PieChart width={350} height={350}>
        <Pie
          cx="50%"
          cy="50%"
          outerRadius={100}
          startAngle={180}
          endAngle={-180}
          dataKey="cost"
          label={customLabel}
          data={props.data}
          fill="#8884d8"
        >
          {props.data?.length
            ? props.data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))
            : null}
        </Pie>
      </PieChart>
    );
  }
};
// }

export default SmallChart;
