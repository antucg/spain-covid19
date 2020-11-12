import { readRemoteFile } from "react-papaparse";
import {
  buildCasesByProvinceAndDate,
  getLastUpdateDate,
} from "./covid19DataProcessor";

import { CsvData } from "../types/common.types";

const DATA_URL =
  "https://raw.githubusercontent.com/montera34/escovid19data/master/data/output/covid19-provincias-spain_consolidated.csv";

/**
 * Fetch CSV data from repository and builds data for map.
 * @returns {Promise<Object>}
 */
export const fetchCovid19Data = () =>
  new Promise((resolve, reject) => {
    readRemoteFile(DATA_URL, {
      header: true,
      complete: (results: { data: CsvData }) =>
        resolve({
          data: buildCasesByProvinceAndDate(results.data),
          lastUpdateDate: getLastUpdateDate(results.data),
        }),
      error: reject,
    });
  });
