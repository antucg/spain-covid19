import { rootReducer } from "../redux/reducers/index";

// Redux

export type RootState = ReturnType<typeof rootReducer>;

export interface Action {
  type: string;
  payload: any;
}

// Translation

export type Locales = "es" | "en";

// API data

interface CsvRow {
  ine_code: string;
  date: string;
  province: string;
  cases_accumulated: string;
}

export type CsvData = CsvRow[];

export interface Last14DaysData {
  [ine_code: string]: {
    name: string;
    accumulated: number;
  };
}

export interface AccumulatedByDate {
  accumulated: number;
  new_cases: number;
}

export interface CasesByProvince {
  [ine_code: string]: {
    [date: string]: string | AccumulatedByDate;
  };
}

// Components

export interface AppProps {
  isLandscape: boolean;
}
