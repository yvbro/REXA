import React from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { ProcessorStats } from '../../helpers/type/ProcessorStats';
import { extractAssessorsProcTypeAndStatus, PROC_STATUS } from '../../helpers/xnat';
import { Assessor } from '../../models/project/Assessor';

import styles from './charts.module.scss';

interface StackedProjectColumnChartProps {
    assessors: Assessor[];
}

const options: ApexOptions = {
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
        type: 'category',
        categories: PROC_STATUS,
    },
    legend: {
        position: 'right',
        offsetY: 40,
    },
    fill: {
        opacity: 1,
    },
};

function StackedProjectColumnChart({ assessors }: StackedProjectColumnChartProps) {
    let processorsStats: ProcessorStats[] = [];

    if (assessors) {
        processorsStats = extractAssessorsProcTypeAndStatus(assessors);
    }

    return (
        <div id="chart" className={styles.drawing}>
            <Chart
                options={options}
                series={processorsStats}
                type="bar"
                height={400}
            />
        </div>
    );
}

export default StackedProjectColumnChart;
