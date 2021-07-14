export type Measurements = {
  metric: string;
  at: number;
  value: number;
  unit: string;
};

export type ParsedData = {
  label: string;
  data: Measurements[];
};

export type DashboardGraphData = [
  {
    measurements: Measurements[];
  },
];

export type ApiErrorAction = {
  error: string;
};

export type QueryValueState = {
  metricName: string;
  after: number;
};

export type DropdownState = {
  value: string;
};

export type GraphDataProps = {
  graphDataSets: ParsedData[];
};
