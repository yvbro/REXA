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
import grey from '@material-ui/core/colors/grey';
import { NoData } from '../../common/NoData';

const useStyles = makeStyles(() => ({
    cardInfo: {
        borderRadius: '16px',
    },
    alignItemsAndJustifyContent: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        color: grey[500],
    },
    iconDef: {
        fontSize: 80,
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
                {projects.length === 0 ? (
                    <NoData label="No project found" />
                ) : (
                    <List>
                        {projects.map((project, index) => (
                            <ListItem key={`dashboard_${index}`}>
                                <ListItemAvatar>
                                    <Avatar>
                                        <AccountCircleIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText>
                                    <Link
                                        to={{
                                            pathname: '/rexa/project',
                                            project: project.id,
                                        }}
                                    >
                                        <Chip
                                            label={project.name}
                                            clickable
                                            color="primary"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            variant="outlined"
                                        />
                                    </Link>
                                </ListItemText>
                            </ListItem>
                        ))}
                    </List>
                )}
            </Card>
        </>
    );
};

export default ProjectDashboard;
