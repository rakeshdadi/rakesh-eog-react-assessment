import { gql } from '@apollo/client';

export const GET_MULTI_MESURMENTS = gql`
  query ($input: [MeasurementQuery]) {
    getMultipleMeasurements(input: $input) {
      measurements {
        metric
        at
        value
        unit
      }
    }
  }
`;

export const COMMENTS_SUBSCRIPTION = gql`
  subscription {
    newMeasurement {
      metric
      at
      value
      unit
    }
  }
`;
