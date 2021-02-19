import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CameraIcon from '@material-ui/icons/Camera';
import DeviceHubIcon from '@material-ui/icons/DeviceHub';
import EventNoteIcon from '@material-ui/icons/EventNote';
import {
    List,
    ListItemAvatar,
    Avatar,
    ListItemText,
    ListItem,
} from '@material-ui/core';
import RexaCard from '../../common/RexaCard';

import { themeColor } from '../../../helpers/constants/variables.scss';
import classes from './project.module.scss';

const useStyles = makeStyles({
    avatar: {
        backgroundColor: themeColor,
    },
});

const ProjectInfo = ({ project }) => {
    const style = useStyles();

    return (
        <RexaCard title='Project information' className={classes.card}>
            <List>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar className={style.avatar}>
                            <AccountCircleIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary="Subject"
                        secondary={project.numberOfSubject}
                    />
                </ListItem>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar className={style.avatar}>
                            <EventNoteIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary="Session"
                        secondary={project.numberOfSession}
                    />
                </ListItem>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar className={style.avatar}>
                            <CameraIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary="Scan"
                        secondary={project.numberOfScan}
                    />
                </ListItem>
                {project.assessors && (
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar className={style.avatar}>
                                <DeviceHubIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary="Processes"
                            secondary={project.assessors.length}
                        />
                    </ListItem>
                )}
            </List>
        </RexaCard>
    );
};

ProjectInfo.propTypes = {
    project: PropTypes.object.isRequired,
};

export default ProjectInfo;
