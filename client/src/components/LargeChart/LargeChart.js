import React, { PureComponent } from "react";
import { PieChart, Pie, Cell } from "recharts";
import renderActiveShape from "./RenderActive";
import "./LargeChart.css";

export default class LargeChart extends PureComponent {
  state = {
    activeIndex: 0,
  };

  onPieEnter = (data, index) => {
    this.setState({
      activeIndex: Number(index),
    });
  };

  render() {
    return (
      <PieChart //container
        width={this.props.dimensions.width}
        height={this.props.dimensions.height}
        onMouseEnter={this.onPieEnter}
      >
        <Pie
          activeIndex={this.state.activeIndex ? this.state.activeIndex : 0}
          activeShape={renderActiveShape}
          data={this.props.data}
          cx={this.props.dimensions.cx}
          cy={this.props.dimensions.cy}
          startAngle={180}
          endAngle={0}
          innerRadius={this.props.dimensions.innerRadius}
          outerRadius={this.props.dimensions.outerRadius}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="cost"
          onMouseEnter={this.onPieEnter}
        >
          {this.props.data?.length
            ? this.props.data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))
            : null}
        </Pie>
        <h3>Monthly Subscription Breakdown</h3>
      </PieChart>
    );
  }
}
