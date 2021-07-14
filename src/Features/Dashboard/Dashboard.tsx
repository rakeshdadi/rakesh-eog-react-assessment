import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from './reducer';
import { useQuery } from '@apollo/client';

// Material UI
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

// Components
import Graph from '../../components/VisualGraph';
// import MetricCard from '../../components/MetricCard';

// Query
import { GET_MULTI_MESURMENTS } from '../../Query/query';

// Types
import { DropdownState, QueryValueState } from './types';
import { IState } from '../../store';

// Constats
import { options } from './constants';

const useStyles = makeStyles((theme) => ({
    search_Card_section: {
      display: 'grid',
      padding: '1rem',
    },
    graph_section: {
      padding: '1rem',
    },
  }));

const getDashboardData = (state: IState) => state.dashboard;

const Dashboard = () => {
  const classes = useStyles();
  const [queryValue, setQueryValue] = useState<QueryValueState[]>([]);
  const [selectedDropdownVal, setSelectedDropdownVal] = useState<DropdownState[] | null>(null);
  const dispatch = useDispatch();
  const { dashboardGraphData } = useSelector(getDashboardData);

  const onTagChange = (e: React.ChangeEvent<{}>, values: DropdownState[]) => {
    const selectedQuerys = values.map((item: DropdownState) => {
      return {
        metricName: item.value,
        after: Math.round(new Date().getTime() - 30 * 60000),
      };
    });

    setQueryValue(selectedQuerys);
    setSelectedDropdownVal(values);
  };

  const { data, error } = useQuery(GET_MULTI_MESURMENTS, {
    variables: {
      input: queryValue,
    },
  });

  useEffect(() => {
      console.log(error)
    if (error) {
      dispatch(actions.dashboardApiErrorReceived({ error: error.message }));
      return;
    }
    if (!data) return;
    const { getMultipleMeasurements } = data;
    dispatch(actions.dashboardDataRecevied(getMultipleMeasurements));
  }, [dispatch, data, error]);

  return (
    <div className={classes.search_Card_section}>
        <Autocomplete
          value={selectedDropdownVal || []}
          multiple
          id="tags-standard"
          limitTags={2}
          style={{ width: 300, float: 'left' }}
          options={options}
          getOptionLabel={(option) => option.value}
          onChange={onTagChange}
          renderInput={(params) => <TextField {...params} label="Multiple values" variant="outlined" />}
        />
        {/* To Do showing the card based on the selection from the dropdown */}
        {/* <MetricCard /> */}

      <div className={classes.graph_section}>
        <Graph graphDataSets={dashboardGraphData} />
      </div>
    </div>
  );
};

export default Dashboard;
