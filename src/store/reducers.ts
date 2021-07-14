import { reducer as weatherReducer } from '../Features/Weather/reducer';
import { reducer as dashboardReducdr, metricReducer } from '../Features/Dashboard/reducer';

export default {
  weather: weatherReducer,
  dashboard: dashboardReducdr,
  metricReducer
};
