import { RootState } from "../../types/common.types";
import { buildLast14Days } from "../../utils/covid19DataProcessor";

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
  buildLast14Days(state.covid19.data, state.covid19.lastUpdateDate);

/**
 * Return list of provinces whose data is not available
 * @param {Object} state
 */
export const getNoDataProvinces = (state: RootState) =>
  state.covid19.noDataProvinces;
