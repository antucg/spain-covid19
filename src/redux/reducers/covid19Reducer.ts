import { FETCH_COVID19_SUCCESSFUL, FETCH_COVID19_FAILED } from "../sagas";

interface Action {
  type: string;
  payload: any;
}

export interface State {
  data: { [key: string]: any };
  lastUpdateDate: string | null;
  noDataProvinces: number[];
}

const initialState: State = {
  data: {},
  lastUpdateDate: null,
  noDataProvinces: [15, 27, 32, 36],
};

export const covid19 = (state = initialState, action: Action): State => {
  switch (action.type) {
    case FETCH_COVID19_SUCCESSFUL:
      return { ...state, ...action.payload };
    case FETCH_COVID19_FAILED:
      return { ...state, data: {} };
    default:
      return state;
  }
};