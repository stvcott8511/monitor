import React from 'react';
import clsx from 'clsx';
import TableCell from '@material-ui/core/TableCell';
import { AutoSizer, Column, Table } from 'react-virtualized';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {

  },
  flexContainer: {
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
  },
  tableRow: {
    cursor: 'pointer',
  },
  tableRowHover: {
    '&:hover': {
      backgroundColor: theme.palette.grey[200],
    },
  },
  tableCell: {
    flex: 1,
  },
  noClick: {
    cursor: 'initial',
  },
}));

export function VirtualizedTableCell(props) {
  const {
    cellData,
    columnIndex,
    columns,
    onRowClick,
    rowHeight,
  } = props;
  const classes = useStyles();

  return (
    <TableCell
      component="div"
      className={clsx(classes.tableCell, classes.flexContainer, {
        [classes.noClick]: onRowClick == null,
      })}
      variant="body"
      style={{ height: rowHeight }}
      align={(columnIndex != null && columns[columnIndex].numeric) || false ? 'right' : 'left'}
    >
      {cellData}
    </TableCell>
  );
};

function Header(props) {
  const {
    columns,
    columnIndex,
    headerHeight,
    label,
  } = props;
  const classes = useStyles();
  return (
    <TableCell
      component="div"
      className={clsx(classes.tableCell, classes.flexContainer, classes.noClick)}
      variant="head"
      style={{ height: headerHeight }}
      align={columns[columnIndex].numeric || false ? 'right' : 'left'}>
      <span>{label}</span>
    </TableCell>
  );
}

function VirtualizedTable(props) {
  const {
    columns = [],
    headerHeight = 48,
    onRowClick,
    rowHeight = 48,
    ...tableProps
  } = props;
  const classes = useStyles();

  const getRowClassName = ({ index }) => {
    return clsx(classes.tableRow, classes.flexContainer, {
      [classes.tableRowHover]: index !== -1 && onRowClick != null,
    });
  };

  return (
    <AutoSizer>
      {
        ({ height, width }) => (
          <Table
            height={height}
            width={width}
            onRowClick={onRowClick}
            rowHeight={rowHeight}
            headerHeight={headerHeight}
            {...tableProps}
            rowClassName={getRowClassName}>
            {
              columns.map((column, index) => {
                const { cellRenderer, dataKey, ...other } = column;
                return (
                  <Column
                    key={`${dataKey}_${index}`}
                    headerRenderer={headerProps => (
                      <Header
                        {...headerProps}
                        columns={columns}
                        columnIndex={index}
                        headerHeight={headerHeight} />
                    )}
                    className={classes.flexContainer}
                    cellRenderer={
                      cellRenderer
                        ? cellProps => cellRenderer({
                          ...cellProps,
                          columns,
                          onRowClick,
                          rowHeight,
                        })
                        : cellProps => (
                          <VirtualizedTableCell
                            {...cellProps}
                            columns={columns}
                            onRowClick={onRowClick}
                            rowHeight={rowHeight} />
                        )
                    }
                    dataKey={dataKey}
                    {...other} />
                );
              })
            }
          </Table>
        )
      }
    </AutoSizer>
  )
}

export default VirtualizedTable;
