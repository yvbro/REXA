import React from 'react';
import PropTypes from 'prop-types';

import {
    makeStyles,
    Table,
    TableCell,
    TableContainer,
    TableHead,
    TableBody,
    TableRow,
    withStyles,
    Paper,
} from '@material-ui/core';

import LoadingIndicator from './LoadingIndicator';
import NoData from './NoData';

const useStyles = makeStyles(() => ({
    root: {
        borderRadius: '16px',
        maxHeight: '24rem',
    },
    root100: {
        borderRadius: '16px',
        maxHeight: '34rem',
    },
    header: {
        textAlign: 'center',
        background: '#f1f0eb',
    },
}));

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: '#2b78e3',
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const RexaDataTable = ({ title, data, loading, noDataLabel, fullHeight }) => {
    const classes = useStyles();

    if (loading) {
        return <LoadingIndicator />;
    }

    const className = fullHeight ? classes.root100 : classes.root;

    return (
        <>
            {title && <h3>{title}</h3>}
            <TableContainer className={className} component={Paper}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {data.map((column, index) => (
                                <StyledTableCell
                                    key={`${title}_header_${index}`}
                                    align="center"
                                >
                                    {column.name}
                                </StyledTableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data[0].values.map((_, rowIndex) => (
                            <StyledTableRow key={`${title}_row_${rowIndex}`}>
                                {data.map((row, colIndex) => (
                                    <StyledTableCell
                                        key={`${title}_row_cell_${colIndex}`}
                                        align="center"
                                    >
                                        {row.values[rowIndex]}
                                    </StyledTableCell>
                                ))}
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
                {data[0].values.length === 0 && (
                    <NoData
                        label={noDataLabel ? noDataLabel : 'No data found.'}
                        noRadius
                    />
                )}
            </TableContainer>
        </>
    );
};

RexaDataTable.propTypes = {
    title: PropTypes.string,
    data: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    noDataLabel: PropTypes.string,
    fullHeight: PropTypes.bool,
};

export default RexaDataTable;
