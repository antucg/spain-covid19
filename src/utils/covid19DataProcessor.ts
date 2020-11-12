import moment from "moment";

import {
  CasesByProvince,
  Last14DaysData,
  CsvData,
  AccumulatedByDate,
} from "../types/common.types";

/**
 * Build an object of this format:
 * {
 *   ine_code: {
 *     name: String,
 *     accumulated: Number,
 *   },
 *   ...
 * }
 * @param data Object from {@link buildCasesByProvinceDate} method.
 * @returns {Object}
 */
export const buildLast14Days = (data: CasesByProvince, lastDate: string) => {
  const result: Last14DaysData = {};

  for (let ine_code of Object.keys(data)) {
    result[ine_code] = {
      name: data[ine_code].name as string,
      accumulated: 0,
    };

    // Accumulate last 15 days of new cases
    for (let i = 0; i < 15; ++i) {
      const currentDate = moment(lastDate)
        .subtract(i, "days")
        .format("YYYY-MM-DD");
      result[ine_code].accumulated += data[ine_code][currentDate]
        ? (data[ine_code][currentDate] as AccumulatedByDate).new_cases
        : 0;
    }
  }
  return result;
};

/**
 * Return the last date in which the data was updated.
 * @param {Object} data
 * @returns {String} Date
 */
export const getLastUpdateDate = (data: CsvData) => {
  if (!data.length) {
    return "";
  }
  return data[data.length - 1].date || data[data.length - 2].date;
};

/**
 * Build an object of this format:
 * {
 *   ine_code: {
 *     name: String,
 *     date1: {
 *       accumulated: Number,
 *       new_cases: Number
 *     },
 *     date2: {
 *       accumulated: Number,
 *       new_cases: Number
 *     },
 *     ...
 *   }
 * }
 * @param data Object from readRemoteFile call.
 * @returns {Object}
 */
export const buildCasesByProvinceAndDate = (data: CsvData) => {
  const result: CasesByProvince = {};

  data.forEach((row) => {
    if (row.date) {
      if (!result[row.ine_code]) {
        result[row.ine_code] = {
          name: row.province,
        };
      }
      result[row.ine_code][row.date] = {
        accumulated: 0,
        new_cases: 0,
      };

      const dateMinus1 = moment(row.date)
        .subtract(1, "days")
        .format("YYYY-MM-DD");

      // Some times, accumulated can be NA, let's grab the one from the previous
      // day or 0 if it is the first day
      let currentAccumulated = parseInt(row.cases_accumulated, 10);
      if (isNaN(currentAccumulated)) {
        currentAccumulated = result[row.ine_code][dateMinus1]
          ? (result[row.ine_code][dateMinus1] as AccumulatedByDate)[
              "accumulated"
            ]
          : 0;
      }

      (result[row.ine_code][
        row.date
      ] as AccumulatedByDate).accumulated = currentAccumulated;
      // Calculate new cases by subtracting accumulated of the previous day
      if (result[row.ine_code][dateMinus1]) {
        // Current date - previous date
        (result[row.ine_code][row.date] as AccumulatedByDate).new_cases =
          currentAccumulated -
          (result[row.ine_code][dateMinus1] as AccumulatedByDate).accumulated;
      } else {
        // First date
        (result[row.ine_code][
          row.date
        ] as AccumulatedByDate).new_cases = currentAccumulated;
      }
    }
  });
  return result;
};
