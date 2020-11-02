import { call, put, takeEvery } from "redux-saga/effects";
import { fetchCovid19Data, getLastUpdateDate } from "../../utils/covid19API";

export const FETCH_COVID19_DATA = "FETCH_COVID19_DATA";
export const FETCH_COVID19_SUCCESSFUL = "FETCH_COVID19_SUCCESSFUL";
export const FETCH_COVID19_FAILED = "FETCH_COVID19_FAILED";

function* fetchCovidData() {
  try {
    const covid19Data = yield call(fetchCovid19Data);
    yield put({
      type: FETCH_COVID19_SUCCESSFUL,
      payload: { data: covid19Data, lastUpdateDate: getLastUpdateDate() },
    });
  } catch (e) {
    yield put({ type: FETCH_COVID19_FAILED, payload: e.message });
  }
}

function* covid19DataSaga() {
  yield takeEvery(FETCH_COVID19_DATA, fetchCovidData);
}

export default covid19DataSaga;
