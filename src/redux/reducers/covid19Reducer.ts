import { FETCH_COVID19_SUCCESSFUL, FETCH_COVID19_FAILED } from "../sagas";
import { Action } from "../../types/common.types";

const initialState = {
  data: [],
  lastUpdateDate: null,
  noDataProvinces: [15, 27, 32, 36],
};

export const covid19 = (state = initialState, action: Action) => {
  switch (action.type) {
    case FETCH_COVID19_SUCCESSFUL:
      return { ...state, ...action.payload };
    case FETCH_COVID19_FAILED:
      return { ...state, data: {} };
    default:
      return state;
  }
};
