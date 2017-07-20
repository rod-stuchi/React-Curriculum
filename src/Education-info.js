import React, { Component } from 'react';
import v4          from  'uuid/v4';
import styled      from  'styled-components';
import IconRArrow  from  'react-icons/lib/fa/arrow-right';


const getTable = (props) => {
  return (
    <table>
      <tbody>
      {
        props.map(x => {
          return [
            <tr className="course" key={v4()}>
              <td className="course-topic" rowSpan={x.values.length}>{x.key}</td>
              <td className="course-icon" rowSpan={x.values.length}><IconRArrow/></td>
              <td className="course-value">{x.values[0]}</td>
            </tr>
          ].concat(
            x.values.slice(1).map(y =>
              <tr key={v4()}>
                <td className="course-value">{y}</td>
              </tr>
            )
          )
        })
      }
    </tbody>
    </table>
  )
}

const EducationDiv = styled.div`
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
    svg {
      color: #565656;
      font-size: 80%;
      position: relative;
      top: -3px;
      padding-left: 5px;
    }
    tr.course {
      td {
        &:nth-child(1) {
          font-size: 90%;
          padding-top: 10px;
          font-weight: bold;
          vertical-align: top;
          text-align:right;
        }
        &:nth-child(2) {
          vertical-align: top;
          padding-top: 10px;
        }
      }
      td.course-value {
        padding-top: 10px;
      }
    }
    td.course-value {
      padding-left: 10px;
      font-size: 90%;
    }
  }`;

class Education extends Component {
  render() {
    let {title, value} = this.props.data;
    return (
      <EducationDiv>
        <h3>{title}</h3>
        {getTable(value)}
      </EducationDiv>
    )
  }
}

export default Education;
