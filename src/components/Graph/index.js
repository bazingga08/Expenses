// @flow

import React, { Component } from 'react';
import Chart from 'chart.js';

// importing the style from the external css file
import './graph.css';

// declaring the type of props and states used in this component
type Props = {
  graph_data_1: Array<object>,
  graph_color_1: string,
  graph_data_2: Array<object>,
  graph_color_2: string,
  getValue: ()=> void,
};

class Graph extends Component<Props> {
  componentDidMount() {
    // assigning values and preparing options for the chart to be displayed in desired format
    Chart.defaults.global.legend.labels.usePointStyle = true;
    Chart.defaults.global.elements.line.fill = false;

    const elemId = 'chart123';
    const ctx2 = document.getElementById(elemId);
    new Chart(ctx2, {
      type: 'line',
      data: {
       labels: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10"],
        datasets: [{
          label: 'income',
          data: this.props.graph_data_1,
          pointHoverRadius: 4,
          pointHoverBackgroundColor: "#FFF",
          pointHoverBorderColor: this.props.graph_color_1,
          pointHoverBorderWidth: 2,
          borderColor: this.props.graph_color_1,
        },{
          label: 'expenses',
          data: this.props.graph_data_2,
          pointHoverRadius: 4,
          pointHoverBackgroundColor: "#FFF",
          pointHoverBorderColor: this.props.graph_color_2,
          pointHoverBorderWidth: 2,
          borderColor: this.props.graph_color_2,
        }],
      },
      options: {
        onClick: (e, element) => {
          if (element.length > 0) {
            var value = element[0]._index;
            this.props.getValue(value)
          }
        },
        responsive: true,
        legend: {
          display: false,
        },
        scales: {
          yAxes: [{
            // display: false,
            gridLines: {
              borderDash: [5, 15],
              borderDashOffset: 4,
            },
            ticks: {
                display: false,
                beginAtZero: false,
                steps: 5,
                stepValue: 1000,
            }
          }],
        },
        tooltips: {
            enabled: false,
            mode: 'y',
        },
        events: ['click', 'mousemove'],
      },
    });
  }


  render() {
    return (
      <div className="graph-container">
        <canvas id='chart123'></canvas>
      </div>
    );
  }
}

export default Graph;
