import React, { Component } from "react";
import { IntlProvider } from "react-intl";
import translations from "./i18n/locales";
import App from "./App";

interface Language {
  [key: string]: string;
}

type Locales = "es" | "en";

const AppIntlWrapper = () => {
  const locale: string = window.location.search.replace("?locale=", "") || "es";
  const messages: Language = translations[locale as Locales];

  return (
    <IntlProvider locale={locale} key={locale} messages={messages}>
      <App />
    </IntlProvider>
  );
};

export default AppIntlWrapper;
