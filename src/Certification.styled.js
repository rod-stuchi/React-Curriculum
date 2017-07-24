import styled               from 'styled-components';

const CertificationDiv = styled.div`
  padding-bottom: 30px;
  h3 {
    margin-bottom: 10px;
    border-bottom: 2px solid #4300e4;
    padding: 0 0 5px 10px;
  }
  table {
    margin-left: 10px;
    border-spacing: 0;
    border-collapse: collapse;
    font-size: 90%;
    td:nth-child(n+1):nth-child(-n+2) {
      vertical-align: top;
      text-align: right;
      font-weight: bold;
    }
    td:last-child {
      padding-left: 10px;
    }
    svg {
      color: #565656;
      font-size: 80%;
      position: relative;
      top: -3px;
      padding-left: 5px;
    }
`;

export default CertificationDiv;
