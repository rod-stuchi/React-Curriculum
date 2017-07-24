import React, { Component }     from 'react';
import IconGithub               from 'react-icons/lib/fa/github-alt';
import IconDropbox              from 'react-icons/lib/fa/dropbox';
import IconLink                 from 'react-icons/lib/fa/external-link';
import v4                       from 'uuid/v4';
import ContentModal             from './ContentModal';

String.prototype.breakTemplate = function() {
  return this.valueOf().split(/(<br>)/)
    .map(x =>
      /<br>/.test(x)
      ? <br key={v4()} />
      : x.urlTemplate()
    );
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
      : x.boldTemplate()
    );
}

String.prototype.boldTemplate = function() {
  return this.valueOf().split(/(\*{2}[^\*{2}]+\*{2})/)
    .map(x =>
      /\*{2}[^\*{2}]+\*{2}/.test(x)
      ? (() => {
          let m = x.match(/\*{2}([^\*{2}]+)\*{2}/);
          return (
            <span
              style={{fontWeight: '800'}}>
              {m[1]}
            </span>)
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

export const Link = (props) => {
  if (/\.gif$/.test(props.href)) {
    return <ContentModal show={false} href={props.href} link={props.children} type="gif"/>
  } else if (/\.jpg$/.test(props.href)) {
    return <ContentModal show={false} href={props.href} link={props.children} type="jpg"/>
  } else if (/^https:\/\/github.com\//.test(props.href)) {
    return <a target="_blank" href={props.href}><IconGithub/> {props.children}</a>
  } else if (/^https:\/\/www.youtube.com/.test(props.href)) {
    return <ContentModal show={false} href={props.href} link={props.children} type="youtube"/>
  } else if (/^https:\/\/www.dropbox.com/.test(props.href)) {
    return <a target="_blank" href={props.href}><IconDropbox/> {props.children}</a>
  } else {
    return <a target="_blank" href={props.href}><IconLink/> {props.children}</a>
  }
}
