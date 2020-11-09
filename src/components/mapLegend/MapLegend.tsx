import React from "react";
import { useIntl } from "react-intl";

import { MapLegendWrapper } from "../../styles/MapLegend";
import messages from "../../i18n/allMessages";

interface ColorLegendProps {
  className: string;
  text: string;
}

interface MapLegendProps {
  className: string;
}

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
  const { formatMessage } = useIntl();
  return (
    <MapLegendWrapper id="map-legend-wrapper" className={className}>
      <p>{formatMessage(messages.legendTitle)}</p>
      <ColorLegend className="red" text={formatMessage(messages.legendRed)} />
      <ColorLegend
        className="yellow"
        text={formatMessage(messages.legendYellow)}
      />
      <ColorLegend
        className="green"
        text={formatMessage(messages.legendGreen)}
      />
      <ColorLegend
        className="black"
        text={formatMessage(messages.legendBlack)}
      />
      <p>
        {formatMessage(messages.dataSource, {
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
