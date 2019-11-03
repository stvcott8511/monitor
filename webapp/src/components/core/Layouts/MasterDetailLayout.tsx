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

interface MasterListRowProps {
  index: number;
  style: any;
}

function composeMasterListRow(list: MasterListConfig[]) {
  return function (props: MasterListRowProps) {
    const { index, style } = props;
    const {
      name,
      onClick = (name: string) => { },
    } = list[index];

    return (
      <ListItem
        button
        style={style}
        key={`master_list_row_${index}`}
        onClick={() => onClick(name)}>
        <ListItemText primary={name} />
      </ListItem>
    );
  }
}

export interface MasterListConfig {
  name: string;
  onClick?: (name: string) => void;
}

export interface MasterDetailLayoutProps {
  masterList: MasterListConfig[];
}

const MasterDetailLayout: React.FunctionComponent<MasterDetailLayoutProps> = (props) => {
  const {
    children,
    masterList = [],
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
                  {composeMasterListRow(masterList)}
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