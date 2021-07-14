import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import { GraphDataProps } from '../Features/Dashboard/types';

const useStyles = makeStyles({
  conitainer: {
    width: '100%',
    height: '500px',
    margin: '2rem 0rem',
  },
  'graph-container': {
    width: '100%',
    height: '100%',
  },
});

const getColor = (name: string) => {
  switch (name) {
    case 'waterTemp':
      return 'red';
    case 'injValveOpen':
      return 'green';
    case 'casingPressure':
      return 'gray';
    case 'tubingPressure':
      return 'black';
    case 'oilTemp':
      return 'blue';
    case 'flareTemp':
      return 'yellow';
    default:
      break;
  }
};

const Graph = ({ graphDataSets }: GraphDataProps) => {
  const classes = useStyles();
  if (graphDataSets.length === 0) return null;
  return (
    <div className={classes.conitainer}>
      <div className={classes['graph-container']}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart>
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis
              dataKey="at"
              tickFormatter={(unixTime) => moment(unixTime).format('HH:mm')}
              type="number"
              domain={['auto', 'auto']}
            />
            <YAxis dataKey="value" />
            {graphDataSets.map((s, idx) => (
              <Line
                dataKey="value"
                data={s.data}
                name={s.label}
                key={idx}
                stroke={getColor(s.label)}
                strokeWidth={1}
                dot={false}
              />
            ))}
            <Tooltip labelFormatter={(value) => new Date(value).toLocaleString()} />
            <Legend />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Graph;
