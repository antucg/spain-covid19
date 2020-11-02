/**
 * Selector to get last update date from redux store.
 * @param {Object} state
 */
export const getLastUpdateDate = (state) => state.covid19.lastUpdateDate;

/**
 * Return data for last 14 days.
 * @param {Object} state
 */
export const getLast14ByProvice = (state) =>
  state.covid19.data.last_14_by_province;

/**
 * Return list of provinces whose data is not available
 * @param {Object} state
 */
export const getNoDataProvinces = (state) => state.covid19.noDataProvinces;
