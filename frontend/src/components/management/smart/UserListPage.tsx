import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { Button, Switch, IconButton, Grid, makeStyles } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

import RexaDataTable from '../../common/RexaDataTable';
import RexaModal from '../../common/RexaModal';
import RexaCard from '../../common/RexaCard';
import AddUserForm from './AddUserForm';
import ChangePasswordForm from './ChangePasswordForm';
import { GoogleIcon } from '../../auth/dumb/SocialLogin';

import { GOOGLE_AUTH_PROVIDER } from '../../../helpers/constants/index';
import themes from '../../common/theme/theme.scss';

import classes from './UserListPage.module.scss';
import { UserRexa } from '../../../models/management/UserRexa';
import { Page } from '../../../models/Page';
import { RexaRole } from '../../../models/management/RexaRole';
import useUsersManagementService from '../../../services/useUsersManagementService';

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

interface UserListPageProps {
    pageOfUsers: Page<UserRexa>;
    page: number;
    setPage: (page: number) => void;
    rowsPerPage: number;
    setRowsPerPage: (page: number) => void;
}

const UserListPage = ({
    page,
    setPage,
    pageOfUsers,
    rowsPerPage,
    setRowsPerPage,
}: UserListPageProps) => {
    const style = useStyles();
    const { switchEnabledUser } = useUsersManagementService();
    const [openModalNewUser, setOpenModalNewUser] = useState(false);
    const [openModalPassword, setOpenModalPassword] = useState(
        DEFAULT_MODAL_PASSWORD_STATE
    );

    const handleChange = (userEmail: string, enabled: boolean) =>
        switchEnabledUser({ userEmail: userEmail, enabled: !enabled });

    const toSwitch = (user: UserRexa) => {
        return (
            <Switch
                defaultChecked={user.enabled}
                onChange={() => handleChange(user.email, user.enabled)}
                disabled={user.roles.includes(RexaRole.ADMIN)}
                color="primary"
                name="disableUser"
                inputProps={{
                    'aria-label': 'primary checkbox',
                }}
            />
        );
    };

    const toEditComponent = (user: UserRexa) => {
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

        if (user.roles.includes(RexaRole.ADMIN)) {
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
        { name: 'Email', values: pageOfUsers.content.map((user) => user.email) },
        {
            name: 'Role',
            values: pageOfUsers.content.map((user) => user.roles.join(',')),
        },
        {
            name: 'Enabled',
            values: pageOfUsers.content.map((user) => toSwitch(user)),
        },
        {
            name: 'Actions',
            values: pageOfUsers.content.map((user) => toEditComponent(user)),
        },
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
                            users={pageOfUsers.content.map((user) => user.email)}
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
                        totalElements={pageOfUsers.totalElements}
                        rowsPerPage={rowsPerPage}
                    />
                </RexaCard>
            </Grid>
        </Grid>
    );
};

export default UserListPage;
