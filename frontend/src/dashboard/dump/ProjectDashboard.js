import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects } from '../../project/redux/projectDuck';
import {
    List,
    ListItemAvatar,
    Avatar,
    ListItemText,
    ListItem,
    Card,
} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LoadingIndicator from '../../common/LoadingIndicator';

const useStyles = makeStyles((theme) => ({
    cardInfo: {
        borderRadius: '16px',
    },
}));

export const ProjectDashboard = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { projects, loadingPoject } = useSelector((state) => ({
        projects: state.project.projectsList.data,
        loading: state.project.projectsList.loading,
    }));

    useEffect(() => {
        dispatch(fetchProjects());
    }, [dispatch]);

    if (loadingPoject) {
        return <LoadingIndicator />;
    }

    return (
        <>
            <h3>Project Information</h3>
            <Card className={classes.cardInfo}>
                <List>
                    {projects.map((project) => (
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <AccountCircleIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={project.name} />
                        </ListItem>
                    ))}
                </List>
            </Card>
        </>
    );
};

export default ProjectDashboard;
