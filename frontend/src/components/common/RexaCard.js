import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Typography } from '@material-ui/core';

const RexaCard = (props) => {
    return (
        <Card className={props.className} variant="outlined">
            <CardContent className={props.classNameContent}>
                <Typography variant="h5" gutterBottom>{props.title}</Typography>
                {props.children}
            </CardContent>
        </Card>
    );
};

RexaCard.propTypes = {
    children: PropTypes.object.isRequired,
    className: PropTypes.string,
    classNameContent: PropTypes.string,
    title: PropTypes.string,
};

export default RexaCard;
