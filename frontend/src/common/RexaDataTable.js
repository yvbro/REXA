import React from 'react';
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
import {NoData} from './NoData';
import PropTypes from "prop-types";

const useStyles = makeStyles(() => ({
    root: {
        borderRadius: '16px',
        maxHeight: '24rem',
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

export const RexaDataTable = ({key, title, data, loading, noDataLabel}) => {
    const classes = useStyles();

    if (loading) {
        return <LoadingIndicator/>;
    }

    return (
        <>
            <h3>{title}</h3>
            <TableContainer className={classes.root} component={Paper}>
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            {data.map((column, index) => (
                                <StyledTableCell key={`${key}_header_${index}`} align="center">{column.name}</StyledTableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data[0].values.map((_, rowIndex) => (
                            <StyledTableRow key={`${key}_row_${rowIndex}`}>
                                {data.map((row, colIndex) => (
                                    <StyledTableCell key={`${key}_row_cell_${colIndex}`} align="center">
                                        {row.values[rowIndex]}
                                    </StyledTableCell>
                                ))}
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
                {data[0].values.length === 0 && (<NoData label={noDataLabel ? noDataLabel : 'No data found.'} noRadius/>)}
            </TableContainer>
        </>
    );
};

RexaDataTable.propTypes = {
    key: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    noDataLabel: PropTypes.string,
};

export default RexaDataTable;
