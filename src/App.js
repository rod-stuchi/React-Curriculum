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

  @media print {
    .noprint {
      display: none;
    }
`;

const Content = styled.div`
    margin: 2vh 2vw;
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
