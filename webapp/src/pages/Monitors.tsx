import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import React, { useEffect } from 'react';
import { Route, RouteComponentProps, Switch, withRouter } from 'react-router-dom';
import PrimaryLayout from '../components/Layouts/PrimaryLayout';
import MonitorsGrid from '../components/Monitors/MonitorsGrid';
import { MonitorDto } from '../dtos/monitorDtos';
import { getMonitor } from '../services/monitorsService';
import { getParams } from '../utilities/router';
import Events from './Events';

const MONITORS_ROUTE_PROPS = Object.freeze({
  path: '/monitors/:monitorName/events',
});

export interface MonitorsRouteParams {
  monitorName: string;
}

export interface MonitorsProps extends RouteComponentProps {

}

/**
 * Monitors renders a UI control of the available monitors in the system. 
 * 
 * @param props 
 */
const Monitors: React.FunctionComponent<MonitorsProps> = (props) => {
  const {
    history,
    location,
    match,
  } = props;
  const [selectedMonitor, setSelectedMonitor] = React.useState<MonitorDto>();
  const [selectedTabValue, setSelectedTabValue] = React.useState<number>(0);
  const title = `Monitor${(selectedMonitor ? (': ' + selectedMonitor.monName) : '')}`;

  useEffect(() => {
    // Get Monitor object from service if loading via URL vs. navigation.
    let params = getParams<MonitorsRouteParams>(location.pathname, MONITORS_ROUTE_PROPS);
    !selectedMonitor && params.monitorName
      && (
        async () => {
          const result = await getMonitor(params.monitorName as string);
          setSelectedMonitor(result);
        }
      )();

    !params.monitorName && setSelectedMonitor(undefined);
  }, [selectedMonitor, location.pathname]);

  function handleSelectedMonitor(monitor: MonitorDto) {
    setSelectedMonitor(monitor);
    history.push(`/monitors/${monitor.monName}/events`);
  }

  function handleClickNavigation() {
    const { pathname } = location;
    const paths = pathname.split('/')
      .filter((path) => path.length > 0);
    (paths.length > 1) && history.goBack();
  }

  function handleChangeTab(event: React.ChangeEvent<{}>, newValue: number) {
    setSelectedTabValue(newValue);
  }

  return (
    <PrimaryLayout
      PrimaryAppBarProps={{
        title,
        onClickNavigation: handleClickNavigation,
        NavigationIconComponent: selectedMonitor && ArrowBackIcon,
        TabNavigationProps: {
          TabsProps: {
            'aria-label': 'monitors tab navigation',
            value: selectedTabValue,
            onChange: handleChangeTab,
            centered: true,
          },
          tabPropsList: [
            // {
            //   label: 'Home',
            // },
          ],
        }
      }}>
      <Switch>
        <Route path={match.path} exact render={routeProps => (
          <MonitorsGrid onSelectMonitor={handleSelectedMonitor} {...routeProps} />
        )} />
        <Route
          path={`${match.path}/:monitorName/events`}
          render={routeProps => <Events monitor={selectedMonitor} {...routeProps} />} />
      </Switch>
    </PrimaryLayout>
  );
}

export default withRouter(Monitors);