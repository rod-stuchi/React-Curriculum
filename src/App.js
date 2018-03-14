import React, { Component }     from 'react';
import styled, { injectGlobal } from 'styled-components';
import Personal                 from './Personal';
import Education                from './Education';
import Knowledge                from './Knowledge';
import Certification            from './Certification';
import WorkExperience           from './WorkExperience';
import JsonDB                   from './data.json'

injectGlobal`
  ul,li,h1,h2,h3,h4,h5,body {
    padding: 0;
    margin: 0;
    font-family: 'Roboto', sans-serif;
  }

  body {
    padding: 40px 0;
    background: rgba(242,242,242,1);
    background: -moz-linear-gradient(top, rgba(242,242,242,1) 0%, rgba(242,242,242,1) 50%, rgba(133,133,133,1) 100%);
    background: -webkit-gradient(left top, left bottom, color-stop(0%, rgba(242,242,242,1)), color-stop(50%, rgba(242,242,242,1)), color-stop(100%, rgba(133,133,133,1)));
    background: -webkit-linear-gradient(top, rgba(242,242,242,1) 0%, rgba(242,242,242,1) 50%, rgba(133,133,133,1) 100%);
    background: -o-linear-gradient(top, rgba(242,242,242,1) 0%, rgba(242,242,242,1) 50%, rgba(133,133,133,1) 100%);
    background: -ms-linear-gradient(top, rgba(242,242,242,1) 0%, rgba(242,242,242,1) 50%, rgba(133,133,133,1) 100%);
    background: linear-gradient(to bottom, rgba(242,242,242,1) 0%, rgba(242,242,242,1) 50%, rgba(133,133,133,1) 100%);
    background-attachment: fixed;
  }

  @media only screen and (max-width: 900px) {
    body {
      padding: 0;
    }
  }

  @media print {
    body {
      background: none;
    }
    .noprint {
      display: none;
    }
  }
`;

const Content = styled.div`
    border-radius: 20px;
    padding: 12px;
    box-shadow: 0px 2px 20px 1px rgba(0,0,0,0.75);
    background-color: rgba(255, 255, 255, 0.8);
    margin: 20px auto;
    max-width: 900px;

    @media only screen and (max-width: 900px) {
      border-radius: 0;
      margin: 0;
      background-color: #fffff;
    }

    @media print {
      background-color: #fffff;
      padding: 3px;
      border-radius: 0;
      box-shadow: none;
      max-width: auto;
    }
`;

class App extends Component {
  render() {
    let { Personal       : _personal
        , Education      : _education
        , Knowledge      : _knowledge
        , Certification  : _certification
        , WorkExperience : _workExperience
        } = JsonDB;

    return (
      <Content className="App">
        <Personal data={{..._personal}}/>
        <Education data={{..._education}}/>
        <Knowledge data={{..._knowledge}}/>
        <Certification data={{..._certification}}/>
        <WorkExperience data={{..._workExperience}}/>
      </Content>
    );
  }
}

export default App;
