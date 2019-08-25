import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import EventsTable from './components/Events/EventsTable';
import MasterDetailLayout from './components/Layouts/MasterDetailLayout';
import PrimaryLayout from './components/Layouts/PrimaryLayout';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
  },
}));

function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <PrimaryLayout PrimaryAppBarProps={{ title: 'Monitor' }}>
        <MasterDetailLayout>
          <EventsTable events={[
            {
              name: 'Test Event',
              date: new Date(),
              message: 'This is a test event.',
              details: 'More details would be in here and probably really large information.',
            },
          ]} />
        </MasterDetailLayout>
      </PrimaryLayout>
    </div>
  );
}

export default App;
