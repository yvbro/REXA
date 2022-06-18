import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { Button, Switch, IconButton, Grid, makeStyles } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

import { switchEnabledUser } from '../redux/userDuck';
import RexaDataTable from '../../common/RexaDataTable';
import RexaModal from '../../common/RexaModal';
import RexaCard from '../../common/RexaCard';
import AddUserForm from '../smart/AddUserForm';
import ChangePasswordForm from '../smart/ChangePasswordForm';
import { GoogleIcon } from '../../auth/dumb/SocialLogin';

import { GOOGLE_AUTH_PROVIDER } from '../../../helpers/constants/index';
import themes from '../../common/theme/theme.scss';

import classes from './UserListPage.module.scss';

const DEFAULT_MODAL_PASSWORD_STATE = { open: false, userEmail: '' };

const useStyles = makeStyles(() => ({
    button: {
        marginLeft: 'auto',
        height: 40,
        marginRight: 8,
        backgroundColor: themes.primaryButtonColor,
        color: 'white',
    },
}));
const UserListPage = ({ page, setPage, rowsPerPage, setRowsPerPage }) => {
    const dispatch = useDispatch();
    const style = useStyles();

    const [openModalNewUser, setOpenModalNewUser] = useState(false);
    const [openModalPassword, setOpenModalPassword] = useState(
        DEFAULT_MODAL_PASSWORD_STATE
    );

    const { users, totalElements } = useSelector((state) => ({
        users: state.user.data,
        totalElements: state.user.totalElements,
    }));

    const handleChange = (userEmail, enabled) =>
        dispatch(switchEnabledUser(userEmail, !enabled));

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

    const toEditComponent = (user) => {
        let component = (
            <IconButton
                color="primary"
                aria-label="edit password"
                component="span"
                onClick={() =>
                    setOpenModalPassword({ open: true, userEmail: user.email })
                }
            >
                <EditIcon />
            </IconButton>
        );

        if (user.roles.includes('ADMIN')) {
            component = (
                <IconButton
                    color="primary"
                    aria-label="edit password"
                    component="span"
                    disabled
                >
                    <EditIcon />
                </IconButton>
            );
        } else if (user.authProvider === GOOGLE_AUTH_PROVIDER) {
            component = <GoogleIcon />;
        }

        return component;
    };

    const data = [
        { name: 'Email', values: users.map((e) => e.email) },
        { name: 'Role', values: users.map((e) => e.roles.join(',')) },
        { name: 'Enabled', values: users.map((e) => toSwitch(e)) },
        { name: 'Actions', values: users.map((e) => toEditComponent(e)) },
    ];

    const action = (
        <Button
            variant="contained"
            onClick={() => setOpenModalNewUser(true)}
            className={style.button}
        >
            Add user
        </Button>
    );

    return (
        <Grid container className={classes.rootDiv} spacing={3}>
            <Grid item md={12} xs={12}>
                <RexaModal
                    open={openModalNewUser}
                    closeModal={() => setOpenModalNewUser(false)}
                    title="addUserModal"
                >
                    <div>
                        <AddUserForm
                            users={users.map((e) => e.email)}
                            closeAction={() => setOpenModalNewUser(false)}
                        />
                    </div>
                </RexaModal>
                <RexaModal
                    open={openModalPassword.open}
                    closeModal={() =>
                        setOpenModalPassword(DEFAULT_MODAL_PASSWORD_STATE)
                    }
                    title="editPasswordModal"
                >
                    <div>
                        <ChangePasswordForm
                            userEmail={openModalPassword.userEmail}
                            closeAction={() =>
                                setOpenModalPassword(DEFAULT_MODAL_PASSWORD_STATE)
                            }
                        />
                    </div>
                </RexaModal>
                <RexaCard
                    title="User Management"
                    className={classes.card}
                    actions={action}
                >
                    <RexaDataTable
                        data={data}
                        setPage={setPage}
                        setRowsPerPage={setRowsPerPage}
                        loading={false}
                        noDataLabel="No users on the platform"
                        fullHeight
                        currentPage={page}
                        totalElements={totalElements}
                        rowsPerPage={rowsPerPage}
                    />
                </RexaCard>
            </Grid>
        </Grid>
    );
};

UserListPage.propTypes = {
    page: PropTypes.number.isRequired,
    setPage: PropTypes.func.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
    setRowsPerPage: PropTypes.func.isRequired,
};

export default UserListPage;
