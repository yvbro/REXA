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
    Paper,
    withStyles,
    TablePagination,
} from '@material-ui/core';
import TablePaginationActions from '@material-ui/core/TablePagination/TablePaginationActions';

import LoadingIndicator from './LoadingIndicator';
import NoData from './NoData';

import { themeColor, backgroundColor, borderRadius } from './theme/theme.scss';

const useStyles = makeStyles(() => ({
    root: {
        borderRadius: borderRadius,
        maxHeight: '25rem',
    },
    root100: {
        borderRadius: borderRadius,
        maxHeight: '35rem',
    },
    header: {
        textAlign: 'center',
        background: backgroundColor,
    },
}));

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: themeColor,
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

const RexaDataTable = ({
    key,
    data,
    loading,
    noDataLabel,
    fullHeight,
    rowsPerPage,
    currentPage,
    totalElements,
    handleChangePage,
    handleChangeRowsPerPage,
}) => {
    const classes = useStyles();

    if (loading) {
        return <LoadingIndicator />;
    }

    const className = fullHeight ? classes.root100 : classes.root;

    return (
        <Paper>
            <TableContainer className={className}>
            <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        {data.map((column, index) => (
                            <StyledTableCell
                                key={`${key}_header_${index}`}
                                align="center"
                            >
                                {column.name}
                            </StyledTableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data[0].values.map((_, rowIndex) => (
                        <StyledTableRow key={`${key}_row_${rowIndex}`}>
                            {data.map((row, colIndex) => (
                                <StyledTableCell
                                    key={`${key}_row_cell_${colIndex}`}
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
                    label={noDataLabel ? noDataLabel : 'No data found'}
                    noRadius
                />
            )}
        </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 15]}
                colSpan={3}
                count={totalElements}
                rowsPerPage={rowsPerPage}
                page={currentPage}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
            />
        </Paper>
    );
};

RexaDataTable.propTypes = {
    key: PropTypes.string,
    data: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    noDataLabel: PropTypes.string,
    fullHeight: PropTypes.bool,
    currentPage: PropTypes.number.isRequired,
    totalElements: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number,
    handleChangePage: PropTypes.func.isRequired,
    handleChangeRowsPerPage: PropTypes.func.isRequired,
};

RexaDataTable.defaultProps = {
    rowsPerPage: 10,
    fullHeight: false,
    noDataLabel: '',
    key: '',
}

export default RexaDataTable;
