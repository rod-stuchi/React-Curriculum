import React, { Component } from 'react';
import styled, { injectGlobal } from 'styled-components';
import PersonalInfo from './Personal-info';
import EducationInfo from './Education-info';
import KnowledgeInfo from './Knowledge-info';
import CertificationInfo from './Certification-info';
import WorkExperienceInfo from './WorkExperience-info';
import JsonDB from './data.json'

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
    let { Personal, Education, Knowledge, Certification, WorkExperience } = JsonDB;
    return (
      <Content className="App">
        <PersonalInfo data={{...Personal}}/>
        <EducationInfo data={{...Education}}/>
        <KnowledgeInfo data={{...Knowledge}}/>
        <CertificationInfo data={{...Certification}}/>
        <WorkExperienceInfo data={{...WorkExperience}}/>
      </Content>
    );
  }
}

export default App;
