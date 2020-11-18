import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Switch } from '@material-ui/core';

import { switchEnabledUser } from '../redux/userDuck';
import RexaDataTable from '../../common/RexaDataTable';
import RexaModal from '../../common/RexaModal';
import AddUserForm from '../smart/AddUserForm';

import classes from './UserListPage.module.scss';

const UserListPage = () => {
    const dispatch = useDispatch();

    const [openModal, setOpenModal] = useState(false);

    const { users } = useSelector((state) => ({
        users: state.user.data,
    }));

    const handleChange = (userEmail, enabled) =>
        dispatch(switchEnabledUser(userEmail, !enabled));

    const openModalForNewUser = () => setOpenModal(true);
    const closeModalForNewUser = () => setOpenModal(false);

    const toSwitch = (user) => {
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

    const data = [
        { name: 'Email', values: users.map((e) => e.email) },
        { name: 'Role', values: users.map((e) => e.roles.join(',')) },
        { name: 'Enabled', values: users.map((e) => toSwitch(e)) },
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
            <RexaModal
                open={openModal}
                closeModal={closeModalForNewUser}
            >
                <AddUserForm users={users.map((e) => e.email)} cancelAction={closeModalForNewUser}/>
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
