import React from 'react';
import { ScanByType } from '../../helpers/type/ScanByType';

import Chart from 'react-apexcharts';

import style from './charts.module.scss';

interface ScanTypePieChartProps {
    scans: ScanByType[];
}

const options = {
    options: {
        chart: {
            width: 350,
            type: 'donut',
        },
        dataLabels: {
            enabled: false,
        },
        fill: {
            type: 'gradient',
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
    },
};

const ScanTypePieChart = ({ scans }: ScanTypePieChartProps) => {
    return (
        <div id="chart" className={style.drawing}>
            <Chart
                options={{
                    ...options,
                    labels: scans.map((obj) => obj.name),
                }}
                series={scans.map((obj) => obj.data)}
                type="donut"
                height={300}
            />
        </div>
    );
};

export default ScanTypePieChart;
