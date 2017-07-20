import React, { Component } from 'react';
import IconInfo     from 'react-icons/lib/fa/info-circle';
import IconProj     from 'react-icons/lib/fa/folder-open';
import IconLink     from 'react-icons/lib/fa/external-link';
import IconGithub   from 'react-icons/lib/fa/github-alt';
import IconDropbox  from 'react-icons/lib/fa/dropbox';
import IconCalender from 'react-icons/lib/fa/calendar';
import v4           from 'uuid/v4';
import styled       from 'styled-components';
import ContentModal from './ContentModal';

const ExperienceDiv = styled.div`
  padding-bottom: 30px;
  h3 {
    margin-bottom: 10px;
    border-bottom: 2px solid #4300e4;
    padding: 0 0 5px 10px;
  }
  ul {
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
        li {
          padding: 5px 0;
          h5 {
            svg {
              color: #565656;
            }
          }
          p {
            font-size: 93%;
            margin: 0 0 0 6px;
            line-height: 22px;
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
  }
`;
const Link = (props) => {
  //https://www.youtube.com/watch?v=WOV0d73ut30&width=1280&height=720
  if (/\.gif$/.test(props.href)) {
    return <ContentModal show={false} href={props.href} link={props.children} type="gif"/>
  } else if (/\.jpg$/.test(props.href)) {
    return <ContentModal show={false} href={props.href} link={props.children} type="jpg"/>
  } else if (/^https:\/\/github.com\//.test(props.href)) {
    return <a target="_blank" href={props.href}>&nbsp;<IconGithub/> {props.children}</a>
  } else if (/^https:\/\/www.youtube.com/.test(props.href)) {
    return <ContentModal show={false} href={props.href} link={props.children} type="youtube"/>
  } else if (/^https:\/\/www.dropbox.com/.test(props.href)) {
    return <a target="_blank" href={props.href}>&nbsp;<IconDropbox/> {props.children}</a>
  } else {
    return <a target="_blank" href={props.href}>&nbsp;<IconLink/> {props.children}</a>
  }
}

const string2Date = (date) => {
  let d = date.split('-').map(x => parseInt(x, 10));
  return new Date(d[0], d[1] -1, d[2]);
}

const getWorkPeriod = (date1, date2) => {
  let month = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
  let dt1 = string2Date(date1);
  let dt2 = string2Date(date2);
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
      : `e ${m} ${_m}`;

  return `${_range} (${_rangeLn})`;
}

String.prototype.urlTemplate = function() {
  return this.valueOf().split(/(<[^|]+\|[^>]+>)/g)
    .map(x =>
      /^<[^>]+>/.test(x)
      ? (() => {
          let m = x.match(/^<([^|]+)\|([^>]+)>/);
          return (
            <Link
              key={v4()} 
              href={m[2]}>
              {m[1]}
            </Link>)
        })()
        : x.abbrTemplate()
    );
}

String.prototype.abbrTemplate = function() {
  return this.valueOf().split(/(\|\|[^\|]+\|[^\||]+\|\|)/)
    .map(x =>
      /^\|\|[^\|]+\|[^\||]+\|\|/.test(x)
      ? (() => {
          let m = x.match(/\|\|([^\|]+)\|([^\||]+)\|\|/);
          return (
            <abbr
              title={m[2]}>
              <span>
                {m[1]}
              </span>
            </abbr>)
          })()
      : x.italicTemplate()
    );
}

String.prototype.italicTemplate = function() {
  return this.valueOf().split(/(\*[^\*]+\*)/)
    .map(x =>
      /\*[^\*]+\*/.test(x)
      ? (() => {
          let m = x.match(/\*([^\*]+)\*/);
          return (
            <span
              style={{fontStyle: 'italic'}}>
              {m[1]}
            </span>)
        })()
      : x.emphasisTemplate()
    );
}

String.prototype.emphasisTemplate = function() {
  return this.valueOf().split(/(#[^#]+#)/)
    .map(x =>
      /#[^#]+#/.test(x)
      ? (() => {
          let m = x.match(/#([^#]+)#/);
          return (
            <span
              style={{
                background   : 'rgb(244, 255, 81)',
                borderRadius : '5px',
                padding      : '2px'
              }} >
              {m[1]}
            </span>)
        })()
      : x
    );
}

String.prototype.breakTemplate = function() {
  return this.valueOf().split(/(<br>)/)
    .map(x =>
      /<br>/.test(x)
      ? <br />
      : x.urlTemplate()
    );
}

const getProjects = (props) => {
  return props.map(x => 
    <li key={v4()}>
      <h5><IconProj/> {x.title}</h5>
      {
        x.hasOwnProperty('github')
          ? <div> <Link href={"https://github.com/" + x.github}>{x.github}</Link></div>
          : ''
      }
    <p>{x.hasOwnProperty("description") ? x.description.breakTemplate() : <ul>{getProjects(x.descriptions)}</ul>}</p>
    </li>
  )
}

const getCompany = (props) => {
  return props.sort((x,y) => string2Date(x.period_from).getTime() < string2Date(y.period_from).getTime()).map(x =>
    <li key={v4()}>
      <table>
        <tbody>
        <tr>
          <td className="company"><h4>{x.company}</h4></td>
          <td className="journey"></td>
        </tr>
        <tr>
          <td className="job-role"><IconInfo/> {x.jobRole}</td>
          <td className="period"><IconCalender/> {getWorkPeriod(x.period_from, x.period_to)}</td>
        </tr>
        </tbody>
      </table>
      <ul className="projects">
        {getProjects(x.projects)}
      </ul>
    </li>
  )
}

class Experience extends Component {
  render() {
    let {title, value} = this.props.data;
    return (
      <ExperienceDiv>
        <h3>{title}</h3>
        <ul>
          {getCompany(value)}
        </ul>
      </ExperienceDiv>
      )
    }
  }

export default Experience;
