import React from 'react';
import { useSubscription } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grow from '@material-ui/core/Grow';
// Query
import { COMMENTS_SUBSCRIPTION } from '../Query/query';

const useStyles = makeStyles((theme) => ({
  root: {
    height: 50,
  },
  container: {
    display: 'flex',
  },
  paper: {
    margin: theme.spacing(1),
  },
  pos: {
    marginBottom: 12,
  },
  metricContainer: {
    padding: '1rem',
  },
}));

const MetricCard = () => {
  const classes = useStyles();
  const { data: subData } = useSubscription(COMMENTS_SUBSCRIPTION, {
    onSubscriptionComplete: () => {
      console.log('hellloo');
    },
  });

  if (!subData) return null;

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Grow in={true}>
          <Paper elevation={4} className={classes.paper}>
            <div className={classes.metricContainer}>{/* <h2>{subData.newMeasurement.metric}</h2> */}</div>
          </Paper>
        </Grow>
      </div>
    </div>
  );
};

export default MetricCard;
