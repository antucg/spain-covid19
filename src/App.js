import React, { Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { defineMessages } from 'react-intl.macro';
import moment from 'moment';
import { AppWrapper } from './styles/App.js';
import Main from './components/main/Main.js';
import { Loop } from '@material-ui/icons';
import { isMobile, withOrientationChange } from 'react-device-detect';

const messages = defineMessages({
  title: {
    id: 'app.title',
    defaultMessage: 'Spain Covid-19',
  },
  updateDate: {
    id: 'app.updateDate',
    defaultMessage: 'Data last update date: {lastUpdateDate}',
  },
});

class App extends Component {
  render() {
    const {
      intl: { formatMessage },
      lastUpdateDate,
      isLandscape,
    } = this.props;
    return (
      <AppWrapper>
        <header className="app-header">
          {lastUpdateDate ? (
            <h4>
              {formatMessage(messages.updateDate, {
                lastUpdateDate: moment(lastUpdateDate).format('DD-MM-YYYY'),
              })}
            </h4>
          ) : (
            <Loop className="loading" />
          )}
          {(!isMobile || isLandscape) && (
            <h1>{formatMessage(messages.title)}</h1>
          )}
          <div id="languages">
            <a href="/?locale=es">Español</a>
            <a href="/?locale=en">English</a>
          </div>
        </header>
        <Main />
      </AppWrapper>
    );
  }
}

export default connect(({ covid19 }) => ({
  lastUpdateDate: covid19.data.lastUpdateDate,
}))(withOrientationChange(injectIntl(App)));
