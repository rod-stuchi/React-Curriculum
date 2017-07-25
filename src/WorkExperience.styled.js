import styled from 'styled-components';

const ExperienceDiv = styled.div`
  padding-bottom: 20px;
  h3 {
    margin-bottom: 10px;
    border-bottom: 2px solid #4300e4;
    padding: 0 0 5px 10px;
  }
  ul.experience {
    margin-left: 10px;
    padding-bottom: 10px;
    li {
      list-style-type:none;
      table {
        border-spacing: 0;
        border-collapse: collapse;
        font-size: 90%;
        width: 100%;
        td.job-role {
          font-style: italic;
          padding-bottom: 5px;
          svg {
            color: #565656;
          }
        }
        td.period, td.journey {
          text-align: right;
        }
        td.company {
          font-size: 130%;
        }
      }
      ul.projects {
        padding-bottom: 10px;
        li {
          padding: 5px 0;
          margin-left: 10px;
          h5 {
            font-size: 102%;
            cursor: pointer;
            line-height: 22px;
            border-radius: 5px;
            padding-left: 5px;
            svg {
              color: #565656;
            }
              &:hover {
                background: #7f82da;
              }
          }
          div.link-github {
            margin: 6px 0 4px 15px;
          }
          p {
            font-size: 93%;
            margin: 0 0 0 15px;
            line-height: 22px;
          }
          a {
            color: #0006b5;
            outline: none;
            text-decoration: none;
            white-space: nowrap;
            position: relative;
            &::before {
              content: "";
              position: absolute;
              width: calc(100% - 22px);
              height: 1px;
              bottom: 0;
              left: 20px;
              background-color: #23007e;
              visibility: hidden;
              transform: scaleX(0);
              transition: all 0.3s ease-in-out 0s;
            }
            svg {
              transition: all .15s ease-in-out;
              position: relative;
              top: -2px;
              margin-right: 1px;
            }
            &:hover {
              color: #23007e;
              &::before {
                visibility: visible;
                transform: scaleX(1);
              }
              svg {
                transform: scale(1.5);
                transition: all .15s ease-in-out;
              }
            }
          }
        }
      }
    }
  }
`;

export default ExperienceDiv;
