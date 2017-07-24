import styled      from  'styled-components';

const getLevel = (level, color) => {
  return `
    &.level${level} {
      &:before {
        background: ${color};
        border-radius: 50%;
        box-shadow: 0 0 2px rgba(0,0,0,0.75);
        color: #fff;
        content: "${level}";
        display: inline-block;
        font-size: 14px;
        height: 16px;
        line-height: 16px;
        width: 16px;
        margin: 0 4px 0 1px;
        text-align: center;
      }
    }`;
}

const KnowledgeDiv = styled.div`
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
    font-size: 90%;
    td:nth-child(n+1):nth-child(-n+2) {
      vertical-align: top;
      position: relative;
      top: 6px;
      text-align: right;
      font-weight: bold;
    }
    svg {
      color: #565656;
      font-size: 80%;
      position: relative;
      top: -3px;
      padding-left: 5px;
    }
    .items {
      ul {
        li {
          list-style-type: none;
          display: inline-block;
          border: 1px solid #c6c6c6;
          border-radius: 3px;
          line-height: 24px;
          margin: 2px 3px;
          padding: 0 3px 0 2px;
          span {
            &.version {
              font-size: 70%;
              padding-left: 3px;
              color: #212121;
            }
            ${getLevel(1, "#e27f76")}
            ${getLevel(2, "#d49d04")}
            ${getLevel(3, "#198d55")}
          }
        }
      }
    }
      .noborders {
        text-align: center;
        padding-top: 15px;
        li {
          border: none !important;
          font-size: 70%; 
        }
      }
  }
`;

export default KnowledgeDiv;
