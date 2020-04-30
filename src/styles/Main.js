import styled from 'styled-components';

export const MAP_RED = '#CC0000';
export const MAP_YELLOW = '#FFFF00';
export const MAP_GREEN = '#4C9900';

export const MainWrapper = styled.div`
  flex: 1;

  .leaflet-container {
    height: 100%;
  }

  #map-legend-wrapper {
    position: fixed;
    right: 25px;
    bottom: 25px;
    z-index: 1000;
  }

  #menu-icon {
    position: fixed;
    right: 25px;
    bottom: 25px;
    z-index: 1000;
    background-color: #eee;
    box-shadow: 10px 10px 50px 10px rgba(0, 0, 0, 0.3);
    padding: 15px;
    border: 1px solid #bbb;
    border-radius: 4px;
    display: none;
  }

  &.mobile-layout {
    #map-legend-wrapper:not(.show) {
      display: none;
    }

    #menu-icon:not(.hide) {
      display: block;
    }
  }
`;
