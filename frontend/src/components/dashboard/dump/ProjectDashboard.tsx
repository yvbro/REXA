import React from 'react';
import PropTypes from 'prop-types';

import {
    List,
    ListItemAvatar,
    Avatar,
    ListItemText,
    ListItem,
    Chip,
    makeStyles,
} from '@material-ui/core';
import WorkIcon from '@material-ui/icons/Work';
import { Link } from 'react-router-dom';

import LoadingIndicator from '../../common/LoadingIndicator';
import RexaCard from '../../common/RexaCard';

import theme from '../../common/theme/theme.scss';
import classes from './dashboard.module.scss';
import NoData from '../../common/NoData';

const useStyles = makeStyles(() => ({
    avatar: {
        backgroundColor: theme.avatarColor,
    },
}));

interface ProjectDashboardProps {
    projects: Project[];
    loading: boolean;
}

const ProjectDashboard = ({ projects, loading }: ProjectDashboardProps) => {
    const style = useStyles();

    if (loading) {
        return <LoadingIndicator />;
    }

    return (
        <>
            <RexaCard
                title="Projects"
                classNameContent={classes.tableCardContent}
                className={classes.tableCard}
            >
                {projects.length > 0 ? (
                    <List className={classes.listProjects}>
                        {projects.map((project, index) => (
                            <ListItem key={`dashboard_${index}`}>
                                <ListItemAvatar>
                                    <Avatar className={style.avatar}>
                                        <WorkIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText>
                                    <Link
                                        to={{
                                            pathname: '/rexa/project',
                                            state: { project: project.id },
                                        }}
                                    >
                                        <Chip
                                            label={project.name}
                                            clickable
                                            color="primary"
                                            variant="outlined"
                                        />
                                    </Link>
                                </ListItemText>
                            </ListItem>
                        ))}
                    </List>
                ) : (
                    <NoData label={'No projects'} noRadius />
                )}
            </RexaCard>
        </>
    );
};

export default ProjectDashboard;
