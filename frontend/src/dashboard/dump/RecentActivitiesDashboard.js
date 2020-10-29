import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
    makeStyles,
    Table,
    TableCell,
    TableContainer,
    TableHead,
    TableBody,
    TableRow,
    withStyles,
    Paper,
    Chip,
} from '@material-ui/core';
import {fetchRecentActivities} from '../redux/dashboardDuck';
import LoadingIndicator from '../../common/LoadingIndicator';
import {getXnatUri} from '../../utils/xnat';
import {NoData} from '../../common/NoData';

const useStyles = makeStyles(() => ({
    recentActivitiesRoot: {
        borderRadius: '16px',
        maxHeight: '24rem',
    },
    header: {
        textAlign: 'center',
        background: '#f1f0eb',
    },
}));

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: '#2b78e3',
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

export const RecentActivitiesDashboard = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const {recentActivities, loadingRecentActivities, xnatHost} = useSelector(
        (state) => ({
            recentActivities: state.dashboard.recentActivities.data,
            loadingRecentActivities: state.dashboard.recentActivities.loading,
            xnatHost: state.settings.xnatHost,
        })
    );

    useEffect(() => {
        dispatch(fetchRecentActivities());
    }, [dispatch]);

    if (loadingRecentActivities) {
        return <LoadingIndicator/>;
    }

    return (
        <>
            <h3>Recent Activities</h3>
            <TableContainer
                className={classes.recentActivitiesRoot}
                component={Paper}
            >
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">Project</StyledTableCell>
                            <StyledTableCell align="center">Type</StyledTableCell>
                            <StyledTableCell align="center">Label</StyledTableCell>
                            <StyledTableCell align="center">Element</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {recentActivities.map((activitie) => (
                            <StyledTableRow key={activitie.project}>
                                <StyledTableCell align="center">
                                    {activitie.project}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    {activitie.typeDesc}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <Chip
                                        label={activitie.label}
                                        clickable
                                        color="primary"
                                        component="a"
                                        href={getXnatUri(xnatHost, activitie.id)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        variant="outlined"
                                    />
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    {activitie.elementName}
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
                {recentActivities.length === 0 && (
                    <NoData label="No recent activities data" noRadius/>
                )}
            </TableContainer>
        </>
    );
};

export default RecentActivitiesDashboard;
