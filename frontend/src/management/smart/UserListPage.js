import React from 'react';

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
    Typography,
    Switch,
} from '@material-ui/core';

import { NoUserData } from '../dumb/NoUserData';
import { switchEnabledUser } from '../redux/userDuck';
import { useDispatch, useSelector } from 'react-redux';

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

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3),
    },
    table: {
        minWidth: 700,
    },
    header: {
        textAlign: 'center',
        background: '#f1f0eb',
    },
}));

const UserListPage = () => {
    const classes = useStyles();

    const dispatch = useDispatch();

    const { users } = useSelector((state) => ({
        users: state.user.users.data,
    }));

    const handleChange = (userEmail, enabled) =>
        dispatch(switchEnabledUser(userEmail, !enabled));

    return (
        <>
            {users ? (
                <div className={classes.root}>
                    <Typography className={classes.header} variant="h5">
                        User Management
                    </Typography>
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
                                            <Switch
                                                checked={user.enabled}
                                                onChange={() =>
                                                    handleChange(
                                                        user.email,
                                                        user.enabled
                                                    )
                                                }
                                                disabled={user.roles.includes(
                                                    'ADMIN'
                                                )}
                                                color="primary"
                                                name="disableUser"
                                                inputProps={{
                                                    'aria-label': 'primary checkbox',
                                                }}
                                            />
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
        </>
    );
};

export default UserListPage;
