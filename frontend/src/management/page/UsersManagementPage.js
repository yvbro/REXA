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

import AppLayout from '../../app/AppLayout';
import { fetchUsers } from '../redux/userDuck';
import LoadingIndicator from '../../common/LoadingIndicator';
import { NoUserData } from '../dumb/NoUserData';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
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

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3),
    },
    table: {
        minWidth: 700,
    },
}));

const UsersManagementPage = () => {
    const classes = useStyles();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const { users, loading } = useSelector((state) => ({
        users: state.user.users.data,
        loading: state.user.users.loading,
    }));

    return (
        <AppLayout>
            {loading ? (
                <LoadingIndicator />
            ) : users ? (
                <div className={classes.root}>
                    <TableContainer component={Paper}>
                        <Table
                            className={classes.table}
                            aria-label="customized table"
                        >
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>Email</StyledTableCell>
                                    <StyledTableCell>Roles</StyledTableCell>
                                    <StyledTableCell>Enabled</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map((user, index) => (
                                    <StyledTableRow key={`user_${index}`}>
                                        <StyledTableCell component="th" scope="row">
                                            {user.email}
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            {user.roles.join(',')}
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            {user.activated}
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            ) : (
                <NoUserData />
            )}
        </AppLayout>
    );
};

export default UsersManagementPage;
