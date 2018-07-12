import React, { Component } from "react";
import v4                   from "uuid/v4";
import IconMail             from "react-icons/lib/fa/envelope-square";
import IconCell             from "react-icons/lib/fa/phone-square";
import IconTwitter          from "react-icons/lib/fa/twitter-square";
import IconGitHub           from "react-icons/lib/fa/github-square";
import PersonalHeader       from "./Personal.styled.js";

const breakLine = txt => {
  return txt
    .split(/(<br>)/)
    .map(x => (/<br>/.test(x) ? <br key={v4()} /> : parseLink(x)));
};

const parseLink = txt => {
  return txt.split(/(<[^|]+\|[^>]+>)/g).map(
    x =>
      /^<[^>]+>/.test(x)
        ? (() => {
            let m = x.match(/^<([^|]+)\|([^>]+)>/);
            return (
              <a target="_blank" key={v4()} href={m[2]}>
                {m[2]}
              </a>
            );
          })()
        : x
  );
};

class Personal extends Component {
  getAge(birthDate) {
    let arr = birthDate.split("-");
    if (arr.length === 3) {
      let dt1 = new Date(arr[0], parseInt(arr[1], 10) - 1, arr[2]);
      let dt2 = new Date();
      let dtDiff = new Date(dt2.getTime() - dt1.getTime());
      return dtDiff.getUTCFullYear() - 1970;
    } else {
      return birthDate;
    }
  }

  render() {
    let {
      Name,
      birthDate,
      birthDateSuffix,
      nationality,
      civilStatus,
      address,
      cellphone,
      email,
      twitter,
      github,
      disclaimer
    } = this.props.data;

    return (
      <PersonalHeader>
        <h1>{Name}</h1>
        <ul className="info">
          <li>
            {nationality}, {civilStatus}, {this.getAge(birthDate)}{" "}
            {birthDateSuffix}
          </li>
          <li>{address}</li>
        </ul>
        <ul className="contact">
          {cellphone ? (
            <li>
              <a href={`tel:${cellphone}`}>
                <IconCell />
                {cellphone}
              </a>
            </li>
          ) : (
            ""
          )}
          {email ? (
            <li>
              <a href={`mailto:${email}`}>
                <IconMail />
                {email}
              </a>
            </li>
          ) : (
            ""
          )}
          {github ? (
            <li>
              <a href={`https://github.com/${github}`}>
                <IconGitHub />
                {github}
              </a>
            </li>
          ) : (
            ""
          )}
          {twitter ? (
            <li>
              <a href={`https://twitter.com/${twitter}`}>
                <IconTwitter />
                {twitter}
              </a>
            </li>
          ) : (
            ""
          )}
        </ul>
        {disclaimer ? (
          <h5 className="disclaimer">{breakLine(disclaimer)}</h5>
        ) : (
          ""
        )}
      </PersonalHeader>
    );
  }
}

export default Personal;
