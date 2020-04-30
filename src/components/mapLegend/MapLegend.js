import React from 'react';
import { injectIntl } from 'react-intl';
import { defineMessages } from 'react-intl.macro';

import { MapLegendWrapper } from '../../styles/MapLegend';

const messages = defineMessages({
  legendTitle: {
    id: 'legend.title',
    defaultMessage: 'Last 14 days',
  },
  legendRed: {
    id: 'legend.red',
    defaultMessage: '> 50 cases',
  },
  legendYellow: {
    id: 'legend.yellow',
    defaultMessage: '< 50 cases',
  },
  legendGreen: {
    id: 'legend.green',
    defaultMessage: '0 cases',
  },
  legendBlack: {
    id: 'legend.black',
    defaultMessage: 'Data not available',
  },
  dataSource: {
    id: 'legend.source',
    defaultMessage: 'Data source: <a>Escovid19data</a>',
  },
});

const MapLegend = (props) => {
  const {
    intl: { formatMessage },
    className,
  } = props;

  return (
    <MapLegendWrapper id="map-legend-wrapper" className={className}>
      <p>{formatMessage(messages.legendTitle)}</p>
      <div>
        <div className="color-box red"></div>
        {formatMessage(messages.legendRed)}
      </div>
      <div>
        <div className="color-box yellow"></div>
        {formatMessage(messages.legendYellow)}
      </div>
      <div>
        <div className="color-box green"></div>
        {formatMessage(messages.legendGreen)}
      </div>
      <div>
        <div className="color-box black"></div>
        {formatMessage(messages.legendBlack)}
      </div>
      <p>
        {formatMessage(messages.dataSource, {
          a: (msg) => (
            <a
              target="_blank"
              href="https://github.com/montera34/escovid19data"
            >
              {msg}
            </a>
          ),
        })}
      </p>
    </MapLegendWrapper>
  );
};

export default injectIntl(MapLegend);
