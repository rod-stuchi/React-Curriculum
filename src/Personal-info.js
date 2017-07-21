import React, { Component } from 'react';
import styled      from  'styled-components';
import v4          from 'uuid/v4';
import IconMail    from  'react-icons/lib/fa/envelope-square';
import IconCell    from  'react-icons/lib/fa/phone-square';
import IconTwitter from  'react-icons/lib/fa/twitter-square';
import IconGitHub  from  'react-icons/lib/fa/github-square';

const breakLine = (txt) => {
  return txt.split(/(<br>)/)
    .map(x =>
      /<br>/.test(x)
      ? <br key={v4()} />
      : parseLink(x)
    );
}

const parseLink = (txt) => {
  return txt.split(/(<[^|]+\|[^>]+>)/g)
    .map(x =>
      /^<[^>]+>/.test(x)
      ? (() => {
          let m = x.match(/^<([^|]+)\|([^>]+)>/);
          return (
            <a
              target="_blank"
              key={v4()}
              href={m[2]}>
              {m[2]}
            </a>)
        })()
        : x
    );
}

const PersonalHeader = styled.div`
  color: #212121;
  padding-bottom: 30px;
  h1 {
    margin-left: 8px;
  }
  ul.info {
    margin-left: 10px;
    li {
        list-style-type:none;
    }
  }
  h5.disclaimer {
    background: #bdbdbd;
    padding: 10px;
    border-radius: 10px;
    margin: 10px 0 0 10px;
  }
  ul.contact {
    margin-top: 5px;
    margin-left: 10px;
    li {
        display: inline;
        list-style-type:none;
        padding: 0 10px 0 0;
        a {
          font-weight: 600;
          color: #212121;
        }
        svg {
          font-size: 130%;
          margin-right: 3px;
          color: #4300e4;
       }
      }
  } 
`;

class Personal extends Component {
  getAge(birthDate) {
    let arr = birthDate.split('-');
    if (arr.length === 3) {
      let dt1 = new Date(arr[0], parseInt(arr[1], 10) - 1, arr[2]);
      let dt2 = new Date();
      let dtDiff = new Date(dt2.getTime() - dt1.getTime());
      return (dtDiff.getUTCFullYear() - 1970);
    } else {
      return birthDate;
    }
  }

  render() {
    let {Name, birthDate, nationality, civilStatus, address, cellphone, email, twitter, github, disclaimer} = this.props.data;

    return (
      <PersonalHeader>
        <h1>{Name}</h1>
        <ul className="info">
          <li>{nationality}, {civilStatus}, {this.getAge(birthDate)} anos</li>
          <li>{address}</li>
        </ul>
        <ul className="contact">
          <li><a href={`tel:${cellphone}`}><IconCell/>{cellphone}</a></li>
          <li><a href={`mailto:${email}`}><IconMail/>{email}</a></li>
          <li><a href={`https://github.com/${github}`}><IconGitHub/>{github}</a></li>
          <li><a href={`https://twitter.com/${twitter}`}><IconTwitter/>{twitter}</a></li>
        </ul>
        {disclaimer ?  <h5 className="disclaimer">{breakLine(disclaimer)}</h5> : ''}
      </PersonalHeader>
    )
  }
}

export default Personal;
