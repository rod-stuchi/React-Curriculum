import React, { Component }  from "react";
import IconInfo              from "react-icons/lib/fa/info-circle";
import IconFolder            from "react-icons/lib/fa/folder-open";
import IconFolderClosed      from "react-icons/lib/fa/folder";
import IconCalender          from "react-icons/lib/fa/calendar";
import v4                    from "uuid/v4";
import { Link, string2Html } from "./String2Html";
import ExperienceDiv         from "./WorkExperience.styled.js";

const string2Date = date => {
  let d = date.split("-").map(x => parseInt(x, 10));
  return d.length === 3 ? new Date(d[0], d[1] - 1, d[2]) : undefined;
};

const getWorkPeriod = (date1, date2) => {
  let month = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez"
  ];
  let dt1 = string2Date(date1);
  let dt2 = string2Date(date2);

  if (!dt2) {
    return `${month[dt1.getMonth()]}/${dt1.getFullYear()} - ${date2}`;
  }

  let p = new Date(dt2.getTime() - dt1.getTime());
  let _range = `${month[dt1.getMonth()]}/${dt1.getFullYear()} - ${
    month[dt2.getMonth()]
  }/${dt2.getFullYear()}`;

  let m = p.getMonth() + 1;
  let y = p.getFullYear() - 1970;
  let _m = m > 1 ? "meses" : "mês";
  let _y = y > 1 ? "anos" : "ano";

  let _rangeLn =
    y > 0
      ? `${y} ${_y} ` + (m === 0 ? "" : `e ${m} ${_m}`)
      : m === 0
        ? ""
        : `${m} ${_m}`;

  return `${_range} (${_rangeLn})`;
};

class ProjectItem extends Component {
  constructor(props) {
    super(props);
    this.state = { show: this.props.toggleAll };
  }

  toggleDisplay = e => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    e.preventDefault();
    this.setState(prevState => {
      return { show: !prevState.show };
    });
  };

  render() {
    let x = this.props.data;
    return (
      <li>
        <h5 onClick={this.toggleDisplay}>
          {this.state.show ? <IconFolder /> : <IconFolderClosed />} {x.title}
        </h5>
        <div style={{ display: this.state.show ? "block" : "none" }}>
          {x.hasOwnProperty("github") ? (
            <div className="link-github">
              {" "}
              <Link href={"https://github.com/" + x.github}>{x.github}</Link>
            </div>
          ) : (
            ""
          )}
          {x.hasOwnProperty("description") ? (
            <p>{string2Html(x.description)}</p>
          ) : (
            <ul>
              <Projects data={x.descriptions} toggleAll={this.state.show} />
            </ul>
          )}
        </div>
      </li>
    );
  }
}

class Projects extends Component {
  render() {
    const { data, toggleAll } = this.props;
    return (
      <ul className="projects">
        {data.map(x => (
          <ProjectItem key={v4()} data={x} toggleAll={toggleAll} />
        ))}
      </ul>
    );
  }
}

const sortByDate = (x, y) =>
  string2Date(x.period_from).getTime() < string2Date(y.period_from).getTime() ? 1 : -1;

const renderCompanies = (x, toggleAll) => (
  <li key={v4()}>
    <table>
      <tbody>
        <tr>
          <td colSpan="2" className="company">
            <h4>{string2Html(x.company)}</h4>
          </td>
        </tr>
        <tr>
          <td className="job-role">
            <IconInfo /> {x.jobRole}
          </td>
          <td className="period">
            <IconCalender /> {getWorkPeriod(x.period_from, x.period_to)}
          </td>
        </tr>
      </tbody>
    </table>
    <Projects data={x.projects} toggleAll={toggleAll} />
  </li>
);

const renderProjects = (x, toggleAll) => (
  <li key={v4()}>
    <table>
      <tbody>
        <tr>
          <td colSpan="2" className="company">
            <h4>{string2Html(x.company)}</h4>
          </td>
        </tr>
        <tr />
      </tbody>
    </table>
    <Projects data={x.projects} toggleAll={toggleAll} />
  </li>
);

const getCompany = (props, toggleAll) => {
  const projects = props.filter(x => !x.period_from);
  const companies = props.filter(x => !!x.period_from);
  const companiesRendered = companies
    .sort((x, y) => sortByDate(x, y))
    .map(x => renderCompanies(x, toggleAll));
  const projectsRendered = projects.map(x => renderProjects(x, toggleAll));

  return [...projectsRendered, ...companiesRendered];
};

class Experience extends Component {
  render() {
    const { title, value } = this.props.data;
    const { toggleAll } = this.props;
    return (
      <ExperienceDiv>
        <h3>{title}</h3>
        <ul className="experience">{getCompany(value, toggleAll)}</ul>
      </ExperienceDiv>
    );
  }
}

export default Experience;
