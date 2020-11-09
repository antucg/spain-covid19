import React from "react";
import { useSelector } from "react-redux";
import { useIntl } from "react-intl";
import moment from "moment";
import { AppWrapper } from "./styles/App";
import Main from "./components/main/Main";
import { Loop } from "@material-ui/icons";
import { isMobile, withOrientationChange } from "react-device-detect";

import { getLastUpdateDate } from "./redux/selectors";

import messages from "./i18n/allMessages";

interface AppProps {
  isLandscape: boolean;
}

const App = ({ isLandscape }: AppProps) => {
  const { formatMessage } = useIntl();
  const lastUpdateDate = useSelector(getLastUpdateDate);

  return (
    <AppWrapper>
      <header className="app-header">
        {lastUpdateDate ? (
          <h4>
            {formatMessage(messages.updateDate, {
              lastUpdateDate: moment(lastUpdateDate).format("DD-MM-YYYY"),
            })}
          </h4>
        ) : (
          <Loop className="loading" />
        )}
        {(!isMobile || isLandscape) && <h1>{formatMessage(messages.title)}</h1>}
        <div id="languages">
          <a href="?locale=es">Español</a>
          <a href="?locale=en">English</a>
        </div>
      </header>
      <Main />
    </AppWrapper>
  );
};

export default withOrientationChange(App);
