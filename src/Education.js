import React, { Component } from "react";
import v4                   from "uuid/v4";
import IconRArrow           from "react-icons/lib/fa/arrow-right";
import EducationDiv         from "./Education.styled.js";

const getTable = props => {
  return (
    <table>
      <tbody>
        {props.map(x => {
          return [
            <tr className="course" key={v4()}>
              <td className="course-topic" rowSpan={x.values.length}>
                {x.key}
              </td>
              <td className="course-icon" rowSpan={x.values.length}>
                <IconRArrow />
              </td>
              <td className="course-value">{x.values[0]}</td>
            </tr>
          ].concat(
            x.values.slice(1).map(y => (
              <tr key={v4()}>
                <td className="course-value">{y}</td>
              </tr>
            ))
          );
        })}
      </tbody>
    </table>
  );
};

class Education extends Component {
  render() {
    let { title, value } = this.props.data;
    return (
      <EducationDiv>
        <h3>{title}</h3>
        {getTable(value)}
      </EducationDiv>
    );
  }
}

export default Education;
