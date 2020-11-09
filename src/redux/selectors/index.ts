import { RootState } from "../reducers";

/**
 * Selector to get last update date from redux store.
 * @param {Object} state
 */
export const getLastUpdateDate = (state: RootState) =>
  state.covid19.lastUpdateDate;

/**
 * Return data for last 14 days.
 * @param {Object} state
 */
export const getLast14ByProvice = (state: RootState) =>
  state.covid19.data.last_14_by_province;

/**
 * Return list of provinces whose data is not available
 * @param {Object} state
 */
export const getNoDataProvinces = (state: RootState) =>
  state.covid19.noDataProvinces;
