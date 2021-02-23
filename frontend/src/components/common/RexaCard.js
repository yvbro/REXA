import React from 'react';
import PropTypes from 'prop-types';
import {Card, CardContent, Typography, makeStyles, CardActions} from '@material-ui/core';

import { textColor } from './theme/theme.scss';

const useStyles = makeStyles({
    bold: {
        fontWeight: 600,
        color: textColor,
    }
});

const RexaCard = (props) => {
    const style = useStyles();
    return (
        <Card className={props.className} variant="outlined">
            <CardContent className={props.classNameContent}>
                <Typography variant="h5" gutterBottom className={style.bold}>{props.title}</Typography>
                {props.children}
            </CardContent>
            {props.actions && (
                <CardActions>
                    {props.actions}
                </CardActions>
            )}
        </Card>
    );
};

RexaCard.propTypes = {
    children: PropTypes.object.isRequired,
    className: PropTypes.string,
    classNameContent: PropTypes.string,
    title: PropTypes.string,
    actions: PropTypes.object,
};

export default RexaCard;
