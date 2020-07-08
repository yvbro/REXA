import Paper from '@material-ui/core/Paper';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import Typography from '@material-ui/core/Typography';
import React, { useEffect } from 'react';
import { fetchPreAchives } from '../redux/dashboardDuck';
import { useDispatch, useSelector } from 'react-redux';
import LoadingIndicator from '../../common/LoadingIndicator';

const useStyles = makeStyles((theme) => ({
    preAchiveRoot: {
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

export const Prearchive = () => {
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
        console.log(preAchives),
        <>
            <Typography className={classes.header} variant="h5">
                Prearchive
            </Typography>
            <TableContainer
                className={classes.preAchiveRoot}
                component={Paper}
            >
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">Project</StyledTableCell>
                            <StyledTableCell align="center">Subject</StyledTableCell>
                            <StyledTableCell align="center">Session</StyledTableCell>
                            <StyledTableCell align="center">Scan Date</StyledTableCell>
                            <StyledTableCell align="center">Upload Date</StyledTableCell>
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

export default Prearchive;
