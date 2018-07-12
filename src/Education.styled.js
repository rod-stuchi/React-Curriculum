import styled from "styled-components";

const EducationDiv = styled.div`
  padding-bottom: 30px;
  h3 {
    margin-bottom: 10px;
    border-bottom: 2px solid #4300e4;
    padding: 0 0 5px 10px;
  }
  table {
    margin-left: 10px;
    border-spacing: 0;
    border-collapse: collapse;
    svg {
      color: #565656;
      font-size: 80%;
      position: relative;
      top: -3px;
      padding-left: 5px;
    }
    tr.course {
      td {
        &:nth-child(1) {
          font-size: 90%;
          padding-top: 10px;
          font-weight: bold;
          vertical-align: top;
          text-align: right;
        }
        &:nth-child(2) {
          vertical-align: top;
          padding-top: 10px;
        }
      }
      td.course-value {
        padding-top: 10px;
      }
    }
    td.course-value {
      padding-left: 10px;
      font-size: 90%;
    }
  }
`;

export default EducationDiv;
