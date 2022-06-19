import React, { ReactNode } from 'react';
import { Card, CardContent, Typography, makeStyles } from '@material-ui/core';

import theme from './theme/theme.scss';

const useStyles = makeStyles({
    bold: {
        fontWeight: 600,
        color: theme.textColor,
    },
});

interface RexaCardProps {
    children: ReactNode;
    className?: string;
    classNameContent?: string;
    title?: string;
}

const RexaCard = ({
    children,
    className = '',
    classNameContent = '',
    title = '',
}: RexaCardProps) => {
    const style = useStyles();
    return (
        <Card className={className} variant="outlined">
            <CardContent className={classNameContent}>
                <Typography variant="h5" gutterBottom className={style.bold}>
                    {title}
                </Typography>
                {children}
            </CardContent>
        </Card>
    );
};

export default RexaCard;
