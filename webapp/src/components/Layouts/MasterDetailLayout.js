import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList as List } from 'react-window';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexGrow: 1,
  },
  masterListContainer: {
    borderRightColor: theme.palette.divider,
    borderRightStyle: 'solid',
    borderRightWidth: 1,
  },
}));

function composeMasterListRow(key, list) {
  return function (props) {
    const { index, style } = props;

    return (
      <ListItem button style={style} key={`master_list_row_${index}`}>
        <ListItemText primary={list[index][key]} />
      </ListItem>
    );
  }
}

function MasterDetailLayout(props) {
  const {
    children,
    masterList = [{ name: 'Item 1 ' }],
    masterKey = 'name'
  } = props;
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Grid item sm={2} className={classes.masterListContainer}>
        <AutoSizer>
          {
            ({ height, width }) => {
              return (
                <List
                  height={height}
                  width={width}
                  itemSize={60}
                  itemCount={masterList.length}>
                  {composeMasterListRow(masterKey, masterList)}
                </List>
              )
            }
          }
        </AutoSizer>
      </Grid>
      <Grid item sm={10}>
        {children}
      </Grid>
    </Grid>
  );
}

export default MasterDetailLayout;