import React from 'react';
import PropTypes from 'prop-types';

import {
    List,
    ListItemAvatar,
    Avatar,
    ListItemText,
    ListItem,
    Chip,
    makeStyles
} from '@material-ui/core';
import WorkIcon from '@material-ui/icons/Work';
import { Link } from 'react-router-dom';

import LoadingIndicator from '../../common/LoadingIndicator';
import RexaCard from '../../common/RexaCard';

import { textColor } from '../../../helpers/constants/variables.scss';
import classes from './dashboard.module.scss';

const useStyles = makeStyles(() => ({
    avatar: {
        backgroundColor: textColor,
    },
}));

const ProjectDashboard = ({ projects, loading }) => {
    const style = useStyles();

    if (loading) {
        return <LoadingIndicator />;
    }

    return (
        <>
            {projects.length > 0 && (
                <RexaCard title='Projects' className={classes.tableCard} classNameContent={classes.tableCardContent}>
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
                </RexaCard>
            )}
        </>
    );
};

ProjectDashboard.propTypes = {
    projects: PropTypes.array,
    loading: PropTypes.bool,
};

export default ProjectDashboard;
