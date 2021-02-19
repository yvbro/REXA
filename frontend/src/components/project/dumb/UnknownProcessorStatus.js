import React from 'react';
import PropTypes from 'prop-types';

import {
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    makeStyles
} from '@material-ui/core';
import LabelOffIcon from '@material-ui/icons/LabelOff';

import classes from './project.module.scss';
import RexaCard from '../../common/RexaCard';
import { themeColor } from '../../../helpers/constants/variables.scss';

const useStyles = makeStyles({
    avatar: {
        color: themeColor,
    },
});

const UnknownProcessorStatus = ({ unknownStatus }) => {
    const style = useStyles();

    return (
        <RexaCard title='Unknown Processing status' className={classes.cardExtra} classNameContent={classes.cardExtraContent}>
            <List className={classes.scrollableList}>
                {unknownStatus &&
                    unknownStatus.map((status) => (
                        <ListItem key={status}>
                            <ListItemIcon>
                                <LabelOffIcon className={style.avatar}/>
                            </ListItemIcon>
                            <ListItemText primary={status} />
                        </ListItem>
                    ))}
            </List>
        </RexaCard>
    );
};

UnknownProcessorStatus.propTypes = {
    unknownStatus: PropTypes.array.isRequired,
};

export default UnknownProcessorStatus;
