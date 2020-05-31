import React from "react";
import PropTypes from 'prop-types';

import Chart from "react-apexcharts";
import {PROC_STATUS} from "../utils/xnat";

class StackedProjectColumnChart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            options: {
                chart: {
                    type: 'bar',
                    height: 350,
                    stacked: true,
                    toolbar: {
                        show: false
                    },
                    zoom: {
                        enabled: false
                    }
                },
                responsive: [{
                    breakpoint: 480,
                    options: {
                        legend: {
                            position: 'bottom',
                            offsetX: -10,
                            offsetY: 0
                        }
                    }
                }],
                plotOptions: {
                    bar: {
                        horizontal: false,
                    },
                },
                xaxis: {
                    type: 'Process status',
                    categories: PROC_STATUS,
                },
                legend: {
                    position: 'right',
                    offsetY: 40
                },
                fill: {
                    opacity: 1
                }
            },
        };
    }

    render() {
        const {assessors} = this.props;

        return (
            <div id="chart">
                <Chart options={this.state.options} series={assessors} type="bar" height={350}/>
            </div>
        );
    }
}

StackedProjectColumnChart.propTypes = {
  assessors: PropTypes.array.isRequired,
};

export default StackedProjectColumnChart;
