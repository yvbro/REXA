import React from 'react';

import BarChart from '../../chart/BarChart';
import AppLayout from '../../app/AppLayout';
import HeaderPage from '../../common/HeaderPage';

const MOCK_DATA = [
    {
        label: 'NEED_INPUTS',
        value: 45,
    },
    {
        label: 'NEED_TO_RUN',
        value: 10,
    },
    {
        label: 'JOB_RUNNING',
        value: 15,
    },
    {
        label: 'JOB_FAILED',
        value: 3,
    },
    {
        label: 'READY_TO_UPLOAD',
        value: 20,
    },
    {
        label: 'UPLOADING',
        value: 13,
    },
    {
        label: 'READY_TO_COMPLETE',
        value: 21,
    },
    {
        label: 'COMPLETE',
        value: 87,
    },
    {
        label: 'NO_DATA',
        value: 1,
    },
    {
        label: 'UNKNOWN',
        value: 0,
    },
];

class DashboardPage extends React.Component {
    getMockData() {
        return MOCK_DATA;
    }

    render() {
        const myData = this.getMockData();
        return (
            <AppLayout>
                <HeaderPage title={'Rexa Main Dashboard'} />
                <BarChart data={myData} title="Processes Report" color="#70CAD1" />
            </AppLayout>
        );
    }
}

export default DashboardPage;
