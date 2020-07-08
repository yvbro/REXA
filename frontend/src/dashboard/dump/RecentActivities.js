import Paper from '@material-ui/core/Paper';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import React, { useEffect } from 'react';
import { fetchRecentActivities } from '../redux/dashboardDuck';
import { useDispatch, useSelector } from 'react-redux';
import LoadingIndicator from '../../common/LoadingIndicator';

const useStyles = makeStyles((theme) => ({
    recentActivitiesRoot: {
        marginLeft: '0.3rem',
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

export const RecentActivities = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const { recentActivities, loadingRecentActivities } = useSelector((state) => ({
        recentActivities: state.dashboard.recentActivities.data,
        loadingRecentActivities: state.dashboard.recentActivities.loading,
    }));

    useEffect(() => {
        dispatch(fetchRecentActivities());
    }, [dispatch]);

    if (loadingRecentActivities) {
        return <LoadingIndicator />;
    }

    return (
        <>
            <Typography className={classes.header} variant="h5">
                Recent Activities
            </Typography>
            <TableContainer
                className={classes.recentActivitiesRoot}
                component={Paper}
            >
                <Table aria-label="customized table">
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
                                    {activitie.label}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    {activitie.elementName}
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default RecentActivities;
