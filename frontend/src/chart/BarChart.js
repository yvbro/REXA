import React from 'react';
import PropTypes from 'prop-types';

import Chart from 'chart.js';

class BarChart extends React.Component {
  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
  }

  componentDidMount() {
    const { data, title, color } = this.props;

    this.myChart = new Chart(this.chartRef.current, {
      type: 'bar',
      data: {
        labels: data.map((d) => d.label),
        datasets: [{
          label: title,
          data: data.map((d) => d.value),
          backgroundColor: color,
        }],
      },
    });
  }

  render() {
    return (
      <canvas ref={this.chartRef} />
    );
  }
}

BarChart.propTypes = {
  data: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default BarChart;
