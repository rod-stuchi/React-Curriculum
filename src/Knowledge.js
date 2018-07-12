/*eslint no-useless-escape: "off"*/
import React, { Component } from "react";
import v4                   from "uuid/v4";
import firstBy              from "thenby";
import IconRArrow           from "react-icons/lib/fa/arrow-right";
import KnowledgeDiv         from "./Knowledge.styled.js";

class Knowledge extends Component {
  render() {
    let { title, value } = this.props.data;
    return (
      <KnowledgeDiv>
        <h3>{title}</h3>
        <table>
          <tbody>
            {value.map(x => (
              <tr key={v4()}>
                <td>{x.topic}</td>
                <td>
                  <IconRArrow />
                </td>
                <td className="items">
                  <ul>
                    {x.subtopic
                      .sort(firstBy("value", -1).thenBy("key", 1))
                      .map(v => {
                        let key = /(.*)(\([^\)]+\))/.test(v.key)
                          ? v.key.match(/(.*)(\([^\)]+\))/).slice(1)
                          : v.key;

                        return Array.isArray(key) ? (
                          <li key={v4()}>
                            <nobr>
                              <span className={`level${v.value}`}> </span>
                              {key[0].trim()}
                              <span className="version">{key[1].trim()}</span>
                            </nobr>
                          </li>
                        ) : (
                          <li key={v4()}>
                            <nobr>
                              <span className={`level${v.value}`}> </span>
                              {v.key}
                            </nobr>
                          </li>
                        );
                      })}
                  </ul>
                </td>
              </tr>
            ))}
            <tr>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td className="items noborders">
                <ul>
                  <li>
                    {" "}
                    <span className="level1" />Básico{" "}
                  </li>
                  <li>
                    {" "}
                    <span className="level2" />Intermediário{" "}
                  </li>
                  <li>
                    {" "}
                    <span className="level3" />Avançado{" "}
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </KnowledgeDiv>
    );
  }
}

export default Knowledge;
