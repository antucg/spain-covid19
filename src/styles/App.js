import styled from 'styled-components';

export const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;

  p {
    margin: 0;
  }

  @keyframes rotating {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .loading {
    animation: rotating 2s linear infinite;
  }

  .app-header {
    background-color: #282c34;
    height: 50px;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 14px;
    color: white;

    h1 {
      margin: 0 auto;
    }

    h4 {
      margin-left: 15px;
    }

    .loading {
      margin-left: 20px;
    }

    #languages {
      margin-left: auto;
      a {
        color: #fff;
        margin-right: 12px;
        text-decoration: none;
        font-weight: bold;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
`;
