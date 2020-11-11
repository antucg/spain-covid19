import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useIntl } from "react-intl";
import { Map, GeoJSON, TileLayer, Popup } from "react-leaflet";

import { LatLngExpression, Layer, StyleFunction } from "leaflet";
import { List } from "@material-ui/icons";
import { isMobile } from "react-device-detect";

import MapLegend from "../mapLegend/MapLegend";
import { MainWrapper, MAP_RED, MAP_YELLOW, MAP_GREEN } from "../../styles/Main";
import spainProvinces from "../../data/spain-provinces.json";
import { FETCH_COVID19_DATA } from "../../redux/sagas";

import { getLast14ByProvice, getNoDataProvinces } from "../../redux/selectors";
import messages from "../../i18n/allMessages";

import * as geojson from "geojson";

const SPAIN_PROVINCES: GeoJSON.GeoJsonObject = spainProvinces as GeoJSON.GeoJsonObject;
const LAT_LNG: LatLngExpression = [37.485818, -5.877067];
const ZOOM = 5;

/**
 * Return a color depending on the number of cases reported in the given province.
 * @param {Number} provinceCode
 * @param {Number} cases
 * @param {Array} noDataProvinces
 */
const getColor = (
  provinceCode: number,
  cases: number,
  noDataProvinces: Array<number>
) => {
  if (noDataProvinces.includes(provinceCode)) {
    return "#000";
  }

  if (cases >= 50) {
    return MAP_RED;
  } else if (cases > 0) {
    return MAP_YELLOW;
  }
  return MAP_GREEN;
};

/**
 * Popup component for map. Render a message as the body of the popup.
 * @param {Object} props
 */
const MapPopup: React.FC = ({ children }) => (
  <Popup>
    <p>{children}</p>
  </Popup>
);

const Main = () => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const [openLegend, setOpenLenged] = useState(false);
  const last14ByProvince = useSelector(getLast14ByProvice);
  const noDataProvinces = useSelector(getNoDataProvinces);

  /**
   * Fetch data from server.
   */
  useEffect(() => {
    dispatch({ type: FETCH_COVID19_DATA });
  }, []);

  /**
   * Close legend when interacting with the map.
   */
  const closeLegend = () => {
    setOpenLenged(false);
  };

  /**
   * Return style object for each of the provinces.
   * @param {Object} feature
   */
  const geoJSONStyle: StyleFunction = (feature) => {
    return {
      color: "#1f2021",
      weight: 1,
      fillOpacity: 0.5,
      fillColor: getColor(
        feature?.properties?.cartodb_id,
        last14ByProvince[feature?.properties?.cartodb_id].accumulated,
        noDataProvinces
      ),
    };
  };

  /**
   * Create a popup to show the data for each province on click.
   * @param {Object} feature
   * @param {Object} layer
   */
  const onEachFeature = (feature: geojson.Feature, layer: Layer): void => {
    const message = intl.formatMessage(
      noDataProvinces.includes(feature.properties?.cartodb_id)
        ? messages.noData
        : messages.provincePopup,
      last14ByProvince[feature.properties?.cartodb_id]
    );
    layer.bindPopup(`<MapPopup>${message}</MapPopup>`);
  };

  return last14ByProvince ? (
    <MainWrapper className={isMobile ? "mobile-layout" : ""}>
      <Map
        center={LAT_LNG}
        zoom={ZOOM}
        onMove={closeLegend}
        onClick={closeLegend}
        onZoom={closeLegend}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <GeoJSON
          data={SPAIN_PROVINCES}
          style={geoJSONStyle}
          onEachFeature={onEachFeature}
        />
      </Map>
      <List
        id="menu-icon"
        className={openLegend ? "hide" : ""}
        onClick={() => setOpenLenged(true)}
      ></List>
      <MapLegend className={openLegend ? "show" : ""}></MapLegend>
    </MainWrapper>
  ) : null;
};

export default Main;
