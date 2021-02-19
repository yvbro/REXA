import React from 'react';
import PropTypes from 'prop-types';

import Chart from 'react-apexcharts';
import {extractAssessorsProcTypeAndStatus, PROC_STATUS} from '../../helpers/xnat';

import classes from './charts.module.scss';

class StackedProjectColumnChart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            options: {
                chart: {
                    type: 'bar',
                    height: 400,
                    stacked: true,
                    toolbar: {
                        show: false,
                    },
                    zoom: {
                        enabled: false,
                    },
                },
                responsive: [
                    {
                        breakpoint: 480,
                        options: {
                            legend: {
                                position: 'bottom',
                                offsetX: -10,
                                offsetY: 0,
                            },
                        },
                    },
                ],
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
                    offsetY: 40,
                },
                fill: {
                    opacity: 1,
                },
            },
        };
    }

    render() {
        const { assessors } = this.props;

        let processorsStats = [];
        if (assessors) {
            processorsStats = extractAssessorsProcTypeAndStatus(assessors);
        }

        return (
            <div id="chart" className={classes.drawing}>
                <Chart
                    options={this.state.options}
                    series={processorsStats}
                    type="bar"
                    height={400}
                />
            </div>
        );
    }
}

StackedProjectColumnChart.propTypes = {
    assessors: PropTypes.array.isRequired,
};

export default StackedProjectColumnChart;
