import styled from 'styled-components';

import { MAP_RED, MAP_YELLOW, MAP_GREEN } from './Main';

export const MapLegendWrapper = styled.div`
  background-color: #eee;
  box-shadow: 10px 10px 50px 10px rgba(0, 0, 0, 0.3);
  padding: 15px;
  border: 1px solid #bbb;
  border-radius: 4px;
  display: flex;
  flex-direction: column;

  p {
    font-size: 14px;
    margin-bottom: 15px;

    &:last-child {
      margin-bottom: 0;
      font-size: 12px;
    }
  }

  & > div {
    display: flex;
    flex-direction: row;
    margin-bottom: 15px;
    font-size: 12px;
    align-items: center;

    &:last-child {
      margin-bottom: 0;
    }

    .color-box {
      width: 40px;
      height: 25px;
      border: 1px solid #bbb;
      border-radius: 4px;
      margin-right: 6px;
      opacity: 0.7;

      &.red {
        background-color: ${MAP_RED};
      }

      &.yellow {
        background-color: ${MAP_YELLOW};
      }

      &.green {
        background-color: ${MAP_GREEN};
      }

      &.black {
        background-color: #000;
      }
    }
  }
`;
