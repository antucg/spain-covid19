import React, { Component } from 'react';
import { IntlProvider } from 'react-intl';
import translations from './i18n/locales';
import App from './App';

class AppIntlWrapper extends Component {
  render() {
    const locale = window.location.search.replace('?locale=', '') || 'es';
    const messages = translations[locale];
    return (
      <IntlProvider locale={locale} key={locale} messages={messages}>
        <App />
      </IntlProvider>
    );
  }
}

export default AppIntlWrapper;
