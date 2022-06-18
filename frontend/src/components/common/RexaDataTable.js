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
    TableFooter,
} from '@material-ui/core';
import TablePaginationActions from '@material-ui/core/TablePagination/TablePaginationActions';

import LoadingIndicator from './LoadingIndicator';
import NoData from './NoData';

import theme from './theme/theme.scss';

const useStyles = makeStyles(() => ({
    root: {
        borderRadius: theme.borderRadius,
    },
    root100: {
        borderRadius: theme.borderRadius,
    },
    header: {
        textAlign: 'center',
        background: theme.backgroundColor,
    },
}));

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.themeColor,
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
    setPage,
    loading,
    noDataLabel,
    fullHeight,
    rowsPerPage,
    currentPage,
    totalElements,
    setRowsPerPage,
}) => {
    const classes = useStyles();

    const handleChangePage = (_, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    if (loading) {
        return <LoadingIndicator />;
    }

    const className = fullHeight ? classes.root100 : classes.root;

    return (
        <Paper>
            <TableContainer className={className}>
                <Table stickyHeader aria-label="values table">
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
                    {totalElements !== 0 && (
                        <TableFooter>
                            <TableRow>
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
                            </TableRow>
                        </TableFooter>
                    )}
                </Table>
                {totalElements === 0 && (
                    <NoData
                        label={noDataLabel ? noDataLabel : 'No data found'}
                        noRadius
                    />
                )}
            </TableContainer>
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
    setPage: PropTypes.func.isRequired,
    setRowsPerPage: PropTypes.func.isRequired,
};

RexaDataTable.defaultProps = {
    rowsPerPage: 10,
    fullHeight: false,
    noDataLabel: '',
    key: '',
};

export default RexaDataTable;
