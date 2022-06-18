import React from 'react';

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
import { toast } from 'react-toastify';

import LoadingIndicator from '../../common/LoadingIndicator';
import RexaCard from '../../common/RexaCard';

import theme from '../../common/theme/theme.scss';
import classes from './dashboard.module.scss';
import NoData from '../../common/NoData';
import { Project } from '../../../models/project/Project';
import { useQuery } from 'react-query';
import axios, { AxiosError } from 'axios';
import { RexaError } from '../../../models/management/RexaError';

const useStyles = makeStyles(() => ({
    avatar: {
        backgroundColor: theme.avatarColor,
    },
}));

const ProjectDashboard = () => {
    const style = useStyles();

    const { isLoading, data: projects } = useQuery(
        ['fetchProject'],
        () => axios.get<Project[]>('/private/projects'),
        {
            onError: (error: AxiosError<RexaError>) => {
                toast.error(error?.response?.data?.message);
            },
        }
    );

    if (isLoading) {
        return <LoadingIndicator />;
    }

    return (
        <>
            <RexaCard
                title="Projects"
                classNameContent={classes.tableCardContent}
                className={classes.tableCard}
            >
                {projects && projects.data.length > 0 ? (
                    <List className={classes.listProjects}>
                        {projects?.data.map((project, index) => (
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
