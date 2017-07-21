import React, { Component } from 'react';
import IconInfo             from 'react-icons/lib/fa/info-circle';
import IconFolder           from 'react-icons/lib/fa/folder-open';
import IconFolderClosed     from 'react-icons/lib/fa/folder';
import IconCalender         from 'react-icons/lib/fa/calendar';
import v4                   from 'uuid/v4';
import styled               from 'styled-components';
import ContentModal         from './ContentModal';
import {Link}               from './String2Html';

const ExperienceDiv = styled.div`
  padding-bottom: 20px;
  h3 {
    margin-bottom: 10px;
    border-bottom: 2px solid #4300e4;
    padding: 0 0 5px 10px;
  }
  ul.experience {
    margin-left: 10px;
    padding-bottom: 10px;
    li {
      list-style-type:none;
      table {
        border-spacing: 0;
        border-collapse: collapse;
        font-size: 90%;
        width: 100%;
        td.job-role {
          font-style: italic;
          padding-bottom: 5px;
          svg {
            color: #565656;
          }
        }
        td.period, td.journey {
          text-align: right;
        }
        td.company {
          font-size: 130%;
        }
      }
      ul.projects {
        padding-bottom: 10px;
        li {
          padding: 5px 0;
          margin-left: 10px;
          h5 {
            font-size: 102%;
            cursor: pointer;
            line-height: 22px;
            border-radius: 5px;
            padding-left: 5px;
            svg {
              color: #565656;
            }
              &:hover {
                background: #7f82da;
              }
          }
          div.link-github {
            margin: 6px 0 4px 15px;
          }
          p {
            font-size: 93%;
            margin: 0 0 0 15px;
            line-height: 22px;
          }
          a {
              color: #0006b5;
              text-decoration: none;
              white-space: nowrap;
              position: relative;
              &::before {
                content: "";
                position: absolute;
                width: calc(100% - 23px);
                height: 1px;
                bottom: 0;
                left: 23px;
                background-color: #23007e;
                visibility: hidden;
                transform: scaleX(0);
                transition: all 0.3s ease-in-out 0s;
              }
              svg {
                transition: all .15s ease-in-out;
              }
              &:hover {
                color: #23007e;
                &::before {
                  visibility: visible;
                  transform: scaleX(1);
                }
                svg {
                  transform: scale(1.5);
                  transition: all .15s ease-in-out;
                }
              }
          }
        }
      }
    }
  }
`;

const string2Date = (date) => {
  let d = date.split('-').map(x => parseInt(x, 10));
  return d.length === 3 ? new Date(d[0], d[1] -1, d[2]) : undefined;
}

const getWorkPeriod = (date1, date2) => {
  let month = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
  let dt1 = string2Date(date1);
  let dt2 = string2Date(date2);

  if (!dt2) {
    return `${month[dt1.getMonth()]}/${dt1.getFullYear()} - ${date2}`;
  }

  let p = new Date(dt2.getTime() - dt1.getTime());
  let _range = `${month[dt1.getMonth()]}/${dt1.getFullYear()} - ${month[dt2.getMonth()]}/${dt2.getFullYear()}`;

  let m = (p.getMonth() + 1);
  let y = (p.getFullYear() - 1970);
  let _m = m > 1 ? "meses" : "mês";
  let _y = y > 1 ? "anos" : "ano"

  let _rangeLn = y > 0
    ? `${y} ${_y} ` + (m === 0
                      ? ''
                      : `e ${m} ${_m}`
                      )
    : m === 0
      ? ''
      : `${m} ${_m}`;

  return `${_range} (${_rangeLn})`;
}

class ProjectItem extends Component {
  state = { show: true }

  toggleDisplay = (e) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    e.preventDefault();
    this.setState(prevState => {
      return { show: !prevState.show }
    });
  }

  render() {
    let x = this.props.data;
    return (
      <li >
        <h5 onClick={this.toggleDisplay}>{this.state.show ? <IconFolder/> : <IconFolderClosed/>} {x.title}</h5>
        <div style={{display: this.state.show ? 'block' : 'none'}}>
          {
            x.hasOwnProperty('github')
            ? <div className="link-github"> <Link href={"https://github.com/" + x.github}>{x.github}</Link></div>
            : ''
          }
          {
            x.hasOwnProperty("description") 
            ? <p>{x.description.breakTemplate()}</p> 
            : <ul><Projects data={x.descriptions}/></ul>
          }
        </div>
      </li>
    )
  }
}

class Projects extends Component {
  render() {
    return (
      <ul className="projects">
        {this.props.data.map(x =>
          <ProjectItem key={v4()} data={x} />
        )}
      </ul>
    )
  }
}

const getCompany = (props) => {
  return props.sort((x,y) => string2Date(x.period_from).getTime() < string2Date(y.period_from).getTime()).map(x =>
    <li key={v4()}>
      <table>
        <tbody>
        <tr>
          <td colSpan="2" className="company"><h4>{x.company}</h4></td>
        </tr>
        <tr>
          <td className="job-role"><IconInfo/> {x.jobRole}</td>
          <td className="period"><IconCalender/> {getWorkPeriod(x.period_from, x.period_to)}</td>
        </tr>
        </tbody>
      </table>
        <Projects data={x.projects} />
    </li>
  )
}

class Experience extends Component {
  render() {
    let {title, value} = this.props.data;
    return (
      <ExperienceDiv>
        <h3>{title}</h3>
        <ul className="experience">
          {getCompany(value)}
        </ul>
      </ExperienceDiv>
      )
    }
  }

export default Experience;
