import React, { Component } from "react";
import { IntlProvider } from "react-intl";
import translations from "./i18n/locales";
import App from "./App";

type Locales = "es" | "en";

const AppIntlWrapper = () => {
  const locale = window.location.search.replace("?locale=", "") || "es";
  const messages = translations[locale as Locales];

  return (
    <IntlProvider locale={locale} messages={messages}>
      <App />
    </IntlProvider>
  );
};

export default AppIntlWrapper;
