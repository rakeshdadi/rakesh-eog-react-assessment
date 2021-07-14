import { createSlice, PayloadAction } from 'redux-starter-kit';
import { DashboardGraphData, ParsedData, ApiErrorAction } from './types';

const initialState = {
  dashboardGraphData: [
    {
      label: '',
      data: [
        {
          metric: '',
          at: 0,
          value: 0,
          unit: '',
        },
      ],
    },
  ],
};

const slice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    dashboardDataRecevied: (state, action: PayloadAction<DashboardGraphData>) => {
      let parsedData: ParsedData[] = [];
      action.payload.forEach((element, idx) => {
        parsedData.push({
          label: element.measurements[idx].metric,
          data: element.measurements,
        });
      });
      state.dashboardGraphData = parsedData;
    },
    dashboardApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
  },
});

const MetricCardSlice = createSlice({
  name: 'metricCard',
  initialState,
  reducers: {
    metricCardDataRecevied: (state, action: PayloadAction<DashboardGraphData>) => {},
    metricCardApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
  },
});

export const reducer = slice.reducer;
export const metricReducer = MetricCardSlice.reducer;

export const actions = slice.actions;
export const metricActions = MetricCardSlice.actions;
