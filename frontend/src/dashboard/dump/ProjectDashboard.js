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
    Chip,
} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LoadingIndicator from '../../common/LoadingIndicator';
import { Link } from 'react-router-dom';

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
            <h3>List of projects</h3>
            <Card className={classes.cardInfo}>
                <List>
                    {projects.map((project) => (
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <AccountCircleIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText>
                                <Link
                                    to={{
                                        pathname: '/rexa/project',
                                        project: { name: project.name },
                                    }}
                                >
                                    <Chip
                                        label={project.name}
                                        clickable
                                        color="primary"
                                        component="a"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        variant="outlined"
                                    />
                                </Link>
                            </ListItemText>
                        </ListItem>
                    ))}
                </List>
            </Card>
        </>
    );
};

export default ProjectDashboard;
