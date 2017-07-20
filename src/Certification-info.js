import React, { Component } from 'react';
import v4          from  'uuid/v4';
import styled      from  'styled-components';
import IconRArrow  from  'react-icons/lib/fa/arrow-right';

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

class Certification extends Component {
  render() {
    let {title, value} = this.props.data;
    return (
      <CertificationDiv>
        <h3>{title}</h3>
        <table>
          <tbody>
          {value.map((x,i) =>
          <tr key={v4()}>
            <td>{x.key}</td>
            <td><IconRArrow/></td>
            <td>{x.value}</td>
          </tr>
          )}
          </tbody>
        </table>
      </CertificationDiv>
      )
    }
  }

  export default Certification;
