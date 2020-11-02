import { defineMessages } from "react-intl.macro";

const messages = defineMessages({
  /**
   * App.js
   */
  title: {
    id: "app.title",
    defaultMessage: "Spain Covid-19",
  },
  updateDate: {
    id: "app.updateDate",
    defaultMessage: "Data last update date: {lastUpdateDate}",
  },

  /**
   * Main.js
   */
  provincePopup: {
    id: "main.provincePopup",
    defaultMessage:
      "Province: {name}<br />Accumulated cases in last 15 days: {accumulated}",
  },
  noData: {
    id: "main.noData",
    defaultMessage: "Province: {name}<br />,Data not available.",
  },

  /**
   * MapLegend.js
   */
  legendTitle: {
    id: "legend.title",
    defaultMessage: "Last 14 days",
  },
  legendRed: {
    id: "legend.red",
    defaultMessage: "> 50 cases",
  },
  legendYellow: {
    id: "legend.yellow",
    defaultMessage: "< 50 cases",
  },
  legendGreen: {
    id: "legend.green",
    defaultMessage: "0 cases",
  },
  legendBlack: {
    id: "legend.black",
    defaultMessage: "Data not available",
  },
  dataSource: {
    id: "legend.source",
    defaultMessage: "Data source: <a>Escovid19data</a>",
  },
});

export default messages;
