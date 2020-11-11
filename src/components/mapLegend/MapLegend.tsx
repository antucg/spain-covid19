import React from "react";
import { useIntl } from "react-intl";

import { MapLegendWrapper } from "../../styles/MapLegend";
import messages from "../../i18n/allMessages";

import { ColorLegendProps, MapLegendProps } from "./mapLegend.types";

const ColorLegend: React.FC<ColorLegendProps> = ({
  className,
  text,
}: ColorLegendProps) => {
  return (
    <div>
      <div className={`color-box ${className}`}></div>
      {text}
    </div>
  );
};

const MapLegend: React.FC<MapLegendProps> = ({ className }) => {
  const intl = useIntl();
  return (
    <MapLegendWrapper id="map-legend-wrapper" className={className}>
      <p>{intl.formatMessage(messages.legendTitle)}</p>
      <ColorLegend
        className="red"
        text={intl.formatMessage(messages.legendRed)}
      />
      <ColorLegend
        className="yellow"
        text={intl.formatMessage(messages.legendYellow)}
      />
      <ColorLegend
        className="green"
        text={intl.formatMessage(messages.legendGreen)}
      />
      <ColorLegend
        className="black"
        text={intl.formatMessage(messages.legendBlack)}
      />
      <p>
        {intl.formatMessage(messages.dataSource, {
          a: (msg: String) => (
            <a
              target="_blank"
              rel="noopener"
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

export default MapLegend;
