import React, { Component } from 'react';
import styled, { injectGlobal } from 'styled-components';
import PersonalInfo from './Personal-info';
import EducationInfo from './Education-info';
import KnowledgeInfo from './Knowledge-info';
import CertificationInfo from './Certification-info';
import WorkExperienceInfo from './WorkExperience-info';
import JsonDB from './rodstu-data.json'

injectGlobal`
  ul,li,h1,h2,h3,h4,h5 {
    padding: 0;
    margin: 0;
  }

  @media print {
    .noprint {
      display: none;
    }
    body {
      transform: scale(1);
    }
`;

const Content = styled.div`
  margin: 30px 50px;
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
