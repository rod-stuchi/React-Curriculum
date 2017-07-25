import React, { Component } from 'react';
import v4                   from 'uuid/v4';
import IconRArrow           from 'react-icons/lib/fa/arrow-right';
import CertificationDiv     from './Certification.styled.js';

class Certification extends Component {
  render() {
    let {title, value} = this.props.data;
    return (
      <CertificationDiv>
        <h3>{title}</h3>
        <table>
          <tbody>
          {value.map((x) =>
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
