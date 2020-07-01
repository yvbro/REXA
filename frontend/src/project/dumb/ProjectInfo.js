import React from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import CameraIcon from "@material-ui/icons/Camera";
import DeviceHubIcon from "@material-ui/icons/DeviceHub";
import EventNoteIcon from "@material-ui/icons/EventNote";
import {
  List,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItem,
  Card,
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    width: "100%",
    maxWidth: 360,
  },
  cardInfo: {
      width: 300,
      borderRadius: "16px"
  }
});

export const ProjectInfo = ({ project }) => {
  const classes = useStyles();

  return (
    <>
      <h3>Project Information</h3>
      <Card className={classes.cardInfo}>
        <List className={classes.root}>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <AccountCircleIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Subject" secondary={project.numberOfSubject} />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <EventNoteIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Session" secondary={project.numberOfSession} />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <CameraIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Scan" secondary={project.numberOfScan} />
          </ListItem>
          {project.assessors && (
            <ListItem>
              <ListItemAvatar>
                <Avatar>
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
      </Card>
    </>
  )
};

ProjectInfo.propTypes = {
  project: PropTypes.object.isRequired,
};
