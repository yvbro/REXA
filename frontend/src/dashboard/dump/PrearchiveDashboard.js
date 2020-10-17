import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
} from '@material-ui/core';
import { fetchPreAchives } from '../redux/dashboardDuck';
import LoadingIndicator from '../../common/LoadingIndicator';

const useStyles = makeStyles((theme) => ({
    preAchiveRoot: {
        marginLeft: '0.3rem',
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

export const PrearchiveDashboard = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const { preAchives, loadingPreArchives } = useSelector((state) => ({
        preAchives: state.dashboard.preAchives.data,
        loadingPreArchives: state.dashboard.preAchives.loading,
    }));

    useEffect(() => {
        dispatch(fetchPreAchives());
    }, [dispatch]);

    if (loadingPreArchives) {
        return <LoadingIndicator />;
    }

    return (
        <>
            <h3>Prearchive</h3>
            <TableContainer className={classes.preAchiveRoot} component={Paper}>
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">Project</StyledTableCell>
                            <StyledTableCell align="center">Subject</StyledTableCell>
                            <StyledTableCell align="center">Session</StyledTableCell>
                            <StyledTableCell align="center">
                                Scan Date
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                Upload Date
                            </StyledTableCell>
                            <StyledTableCell align="center">Status</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {preAchives.map((preAchive) => (
                            <StyledTableRow key={preAchive.project}>
                                <StyledTableCell align="center">
                                    {preAchive.project}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    {preAchive.subject}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    {preAchive.session}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    {preAchive.scanDate}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    {preAchive.updloadDate}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    {preAchive.status}
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default PrearchiveDashboard;
