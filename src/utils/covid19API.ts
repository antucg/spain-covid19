import { readRemoteFile } from "react-papaparse";
import moment from "moment";

const DATA_URL =
  "https://raw.githubusercontent.com/montera34/escovid19data/master/data/output/covid19-provincias-spain_consolidated.csv";
let parsedData;

/**
 * Fetch CSV data from repository and builds data for map.
 * @returns {Promise<Object>}
 */
export const fetchCovid19Data = () =>
  new Promise((resolve, reject) => {
    const response = {};
    readRemoteFile(DATA_URL, {
      header: true,
      complete: (results) => {
        parsedData = results;
        // console.log('Results:', results);
        response.by_province_date = buildCasesByProvinceDate(results);
        response.last_14_by_province = buildLast14Days(
          response.by_province_date
        );
        resolve(response);
      },
      error: reject,
    });
  });

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
const buildCasesByProvinceDate = (data) => {
  const result = {};

  data.data.forEach((row) => {
    if (row.date) {
      if (!result[row.ine_code]) {
        result[row.ine_code] = {};
        result[row.ine_code]["name"] = row.province;
      }
      result[row.ine_code][row.date] = {};

      const dateMinus1 = moment(row.date)
        .subtract(1, "days")
        .format("YYYY-MM-DD");

      // Some times, accumulated can be NA, let's grab the one from the previous
      // day or 0 if it is the first day
      let currentAccumulated = parseInt(row.cases_accumulated, 10);
      if (isNaN(currentAccumulated)) {
        currentAccumulated = result[row.ine_code][dateMinus1]
          ? result[row.ine_code][dateMinus1]["accumulated"]
          : 0;
      }

      result[row.ine_code][row.date]["accumulated"] = currentAccumulated;
      // Calculate new cases by subtracting accumulated of the previous day
      if (result[row.ine_code][dateMinus1]) {
        // Current date - previous date
        result[row.ine_code][row.date]["new_cases"] =
          currentAccumulated - result[row.ine_code][dateMinus1]["accumulated"];
      } else {
        // First date
        result[row.ine_code][row.date]["new_cases"] = currentAccumulated;
      }
    }
  });
  return result;
};

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
const buildLast14Days = (data) => {
  const result = {};
  const lastDate = getLastUpdateDate();
  for (let ine_code of Object.keys(data)) {
    result[ine_code] = {
      name: data[ine_code].name,
      accumulated: 0,
    };
    // Accumulate last 15 days of new cases
    for (let i = 0; i < 15; ++i) {
      const currentDate = moment(lastDate)
        .subtract(i, "days")
        .format("YYYY-MM-DD");
      result[ine_code].accumulated += data[ine_code][currentDate]
        ? data[ine_code][currentDate].new_cases
        : 0;
    }
  }
  return result;
};

/**
 * Get date of the last available data.
 * @returns {String}
 */
export const getLastUpdateDate = () => {
  if (!parsedData) {
    throw new Error("Data not parsed");
  }

  // Last row seems to be empty, let's return previous one just in case
  return (
    parsedData.data[parsedData.data.length - 1].date ||
    parsedData.data[parsedData.data.length - 2].date
  );
};
