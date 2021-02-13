import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Switch, IconButton,  } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

import { switchEnabledUser } from '../redux/userDuck';
import RexaDataTable from '../../common/RexaDataTable';
import RexaModal from '../../common/RexaModal';
import AddUserForm from '../smart/AddUserForm';
import ChangePasswordForm from '../smart/ChangePasswordForm';
import { GOOGLE_AUTH_PROVIDER } from '../../../helpers/constants/index';

import classes from './UserListPage.module.scss';

const DEFAULT_MODAL_PASSWORD_STATE = {open: false, userEmail: ''};

const canEditPassword = user => {
    return user.roles.includes('ADMIN') || user.authProvider === GOOGLE_AUTH_PROVIDER;
};

const UserListPage = () => {
    const dispatch = useDispatch();

    const [openModalNewUser, setOpenModalNewUser] = useState(false);
    const [openModalPassword, setOpenModalPassword] = useState(DEFAULT_MODAL_PASSWORD_STATE);

    const { users } = useSelector((state) => ({
        users: state.user.data,
    }));

    const handleChange = (userEmail, enabled) =>
        dispatch(switchEnabledUser(userEmail, !enabled));

    const openModalForNewUser = () => setOpenModalNewUser(true);
    const closeModalForNewUser = () => setOpenModalNewUser(false);

    const openModalForNewPassword = (userEmail) => setOpenModalPassword({open: true, userEmail: userEmail});
    const closeModalForNewPassword = () => setOpenModalPassword(DEFAULT_MODAL_PASSWORD_STATE);

    const toSwitch = user => {
        return (
            <Switch
                checked={user.enabled}
                onChange={() => handleChange(user.email, user.enabled)}
                disabled={user.roles.includes('ADMIN')}
                color="primary"
                name="disableUser"
                inputProps={{
                    'aria-label': 'primary checkbox',
                }}
            />
        );
    };

    const toPassword = user => {
        return (
            <IconButton color="primary" aria-label="edit password" component="span" onClick={() => openModalForNewPassword(user.email)}> 
                <EditIcon />
            </IconButton>
        );
    };

    const data = [
        { name: 'Email', values: users.map((e) => e.email) },
        { name: 'Role', values: users.map((e) => e.roles.join(',')) },
        { name: 'Enabled', values: users.map((e) => toSwitch(e)) },
        { name: 'Password', values: users.map((e) => canEditPassword(e) ? '' : toPassword(e)) },
    ];

    return (
        <div className={classes.rootDiv}>
            <div className={classes.Header}>
                <h3>User Management</h3>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={openModalForNewUser}
                >
                    Add user
                </Button>
            </div>
            <RexaModal open={openModalNewUser} closeModal={closeModalForNewUser}>
                <div>
                    <AddUserForm
                        users={users.map((e) => e.email)}
                        cancelAction={closeModalForNewUser}
                    />
                </div>
            </RexaModal>
            <RexaModal open={openModalPassword.open} closeModal={closeModalForNewPassword}>
                <div>
                    <ChangePasswordForm
                        userEmail={openModalPassword.userEmail}
                        cancelAction={closeModalForNewPassword}
                    />
                </div>
            </RexaModal>
            <RexaDataTable
                data={data}
                loading={false}
                noDataLabel="No users on the platform!"
                fullHeight
            />
        </div>
    );
};

export default UserListPage;
