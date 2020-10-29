import React from 'react';

import {useDispatch, useSelector} from 'react-redux';

import {
    makeStyles,
    Switch,
} from '@material-ui/core';

import {switchEnabledUser} from '../redux/userDuck';
import RexaDataTable from "../../common/RexaDataTable";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3),
    },
}));

const UserListPage = () => {
    const classes = useStyles();

    const dispatch = useDispatch();

    const {users} = useSelector((state) => ({
        users: state.user.users.data,
    }));

    const handleChange = (userEmail, enabled) =>
        dispatch(switchEnabledUser(userEmail, !enabled));

    const toSwitch = (user) => {
        return (<Switch
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
        />);
    }

    const data = [
        {name: 'Email', values: users.map(e => e.email)},
        {name: 'Role', values: users.map(e => e.roles.join(','))},
        {name: 'Enabled', values: users.map(e => toSwitch(e))},
    ];

    return (
        <div className={classes.root}>
            <RexaDataTable key='user'
                               title='User Management'
                               data={data}
                               loading={false}
                               noDataLabel='No users on the platform!'/>
        </div>
    );
};

export default UserListPage;
