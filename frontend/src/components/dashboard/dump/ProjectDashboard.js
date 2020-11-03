import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';

import {useDispatch, useSelector} from 'react-redux';
import {fetchProjects} from '../../project/redux/projectDuck';
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
import {Link} from 'react-router-dom';
import grey from '@material-ui/core/colors/grey';

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
    const {projects, loading} = useSelector((state) => ({
        projects: state.project.projectsList.data,
        loading: state.project.projectsList.loading,
    }));

    useEffect(() => {
        dispatch(fetchProjects());
    }, [dispatch]);

    if (loading) {
        return;
    }

    return (
        <>
            {projects.length > 0 && (
                <>
                    <h3>List of projects</h3>
                    <Card className={classes.cardInfo}>
                        <List>
                            {projects.map((project, index) => (
                                <ListItem key={`dashboard_${index}`}>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <AccountCircleIcon/>
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
                    </Card>
                </>
            )}
        </>
    );
};

export default ProjectDashboard;
