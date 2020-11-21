import React from 'react';
import PropTypes from 'prop-types';

import {
    List,
    ListItemAvatar,
    Avatar,
    ListItemText,
    ListItem,
    Card,
    Chip,
    makeStyles,
} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Link } from 'react-router-dom';
import grey from '@material-ui/core/colors/grey';

import LoadingIndicator from '../../common/LoadingIndicator';

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

const ProjectDashboard = ({ projects, loading }) => {
    const classes = useStyles();

    if (loading) {
        return <LoadingIndicator />;
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
                    </Card>
                </>
            )}
        </>
    );
};

ProjectDashboard.propTypes = {
    projects: PropTypes.array,
    loading: PropTypes.bool,
}

export default ProjectDashboard;
