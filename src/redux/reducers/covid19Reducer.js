import {
  FETCH_COVID19_SUCCESSFUL,
  FETCH_COVID19_FAILED,
  LAST_UPDATE_DATE,
} from '../sagas';

const initialState = {
  data: {},
  lastUpdateDate: null,
  noDataProvinces: [15, 27, 32, 36],
};

export const covid19 = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COVID19_SUCCESSFUL:
      return { ...state, data: action.payload };
    case FETCH_COVID19_FAILED:
      return { ...state, data: {} };
    case LAST_UPDATE_DATE:
      return {
        ...state,
        data: { ...state.data, lastUpdateDate: action.payload },
      };
    default:
      return state;
  }
};
