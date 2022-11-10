import React, { ReactNode } from 'react';
import {
    Card,
    CardContent,
    Typography,
    makeStyles,
    CardActions,
} from '@material-ui/core';

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
    actions?: ReactNode | null;
}

function RexaCard({
    children,
    title = '',
    actions = null,
    className = '',
    classNameContent = '',
}: RexaCardProps) {
    const style = useStyles();
    return (
        <Card className={className} variant="outlined">
            <CardContent className={classNameContent}>
                <Typography variant="h5" gutterBottom className={style.bold}>
                    {title}
                </Typography>
                {children}
            </CardContent>
            {actions ? <CardActions>{actions}</CardActions> : null}
        </Card>
    );
}

export default RexaCard;
