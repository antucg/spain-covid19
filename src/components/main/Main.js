import React, { Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { defineMessages } from 'react-intl.macro';
import { Map, GeoJSON, TileLayer } from 'react-leaflet';
import { List } from '@material-ui/icons';
import { isMobile } from 'react-device-detect';

import MapLegend from '../mapLegend/MapLegend';
import { MainWrapper, MAP_RED, MAP_YELLOW, MAP_GREEN } from '../../styles/Main';
import spainProvinces from '../../data/spain-provinces.json';
import { FETCH_COVID19_DATA } from '../../redux/sagas';

const messages = defineMessages({
  provincePopup: {
    id: 'main.provincePopup',
    defaultMessage:
      'Province: {name}<br />Accumulated cases in last 15 days: {accumulated}',
  },
  noData: {
    id: 'main.noData',
    defaultMessage: 'Province: {name}<br />,Data not available.',
  },
});

class Main extends Component {
  state = {
    lat: 37.485818,
    lng: -5.877067,
    zoom: 5,
    openLegend: false,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({ type: FETCH_COVID19_DATA });
  }

  geoJSONStyle = (feature) => {
    const { last_14_by_province: last14ByProvince } = this.props.data;

    return {
      color: '#1f2021',
      weight: 1,
      fillOpacity: 0.5,
      fillColor: this.getColor(
        feature.properties.cartodb_id,
        last14ByProvince[feature.properties.cartodb_id].accumulated
      ),
    };
  };

  getColor(provinceCode, cases) {
    if (this.props.noDataProvinces.includes(provinceCode)) {
      return '#000';
    }

    if (cases >= 50) {
      return MAP_RED;
    } else if (cases > 0) {
      return MAP_YELLOW;
    }
    return MAP_GREEN;
  }

  onEachFeature = (feature, layer) => {
    const {
      intl: { formatMessage },
      data: { last_14_by_province: last14ByProvince },
      noDataProvinces,
    } = this.props;

    const data = last14ByProvince[feature.properties.cartodb_id];
    let popupContent = '';
    if (noDataProvinces.includes(feature.properties.cartodb_id)) {
      popupContent = popupContent = `<Popup><p>${formatMessage(
        messages.noData,
        data
      )}</p></Popup>`;
    } else {
      popupContent = `<Popup><p>${formatMessage(
        messages.provincePopup,
        data
      )}</p></Popup>`;
    }

    layer.bindPopup(popupContent);
  };

  onMenuClick = () => {
    this.setState({ openLegend: true });
  };

  closeLegend = () => {
    this.setState({ openLegend: false });
  };

  render() {
    const { last_14_by_province: last14ByProvince } = this.props.data;
    const { openLegend } = this.state;

    return last14ByProvince ? (
      <MainWrapper className={isMobile ? 'mobile-layout' : ''}>
        <Map
          center={[this.state.lat, this.state.lng]}
          zoom={this.state.zoom}
          onMove={this.closeLegend}
          onClick={this.closeLegend}
          onZoom={this.closeLegend}
        >
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <GeoJSON
            data={spainProvinces}
            style={this.geoJSONStyle}
            onEachFeature={this.onEachFeature}
          />
        </Map>
        <List
          id="menu-icon"
          className={openLegend ? 'hide' : ''}
          onClick={this.onMenuClick}
        ></List>
        <MapLegend className={openLegend ? 'show' : ''}></MapLegend>
      </MainWrapper>
    ) : (
      <div></div>
    );
  }
}

export default connect(({ covid19 }) => ({
  data: covid19.data,
  noDataProvinces: covid19.noDataProvinces,
}))(injectIntl(Main));
