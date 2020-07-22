import React from 'react';
import PropTypes from 'prop-types';

import Chart from 'react-apexcharts';

import style from './charts.module.scss';

class ScanUnusablePieChart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            options: {
                chart: {
                    width: 380,
                    type: 'donut',
                },
                dataLabels: {
                    enabled: false
                },
                fill: {
                    type: 'gradient',
                },
                legend: {
                    formatter: function (val, opts) {
                        return val + " - " + opts.w.globals.series[opts.seriesIndex]
                    }
                },
                responsive: [{
                    breakpoint: 480,
                    options: {
                        legend: {
                            position: 'bottom',
                            offsetX: -10,
                            offsetY: 0,
                        }
                    }
                }]
            },
        };
    }

    render() {
        const {unusableScans} = this.props;

        return (
            <div id="chart" className={style.drawing}>
                <Chart
                    options={{...this.state.options, labels: unusableScans.map(obj => obj.name)}}
                    series={unusableScans.map(obj => obj.data)}
                    type="donut"
                    height={350}
                />
            </div>
        );
    }
}

ScanUnusablePieChart.propTypes = {
    unusableScans: PropTypes.array.isRequired,
};

export default ScanUnusablePieChart;
